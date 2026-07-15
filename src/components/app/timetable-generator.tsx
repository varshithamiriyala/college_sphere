

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateTimetableAction } from '@/app/actions';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GeneratedTimetable, TimetableEntry } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { facultyData, sampleTimetable } from '@/lib/data';
import { MultiSelect } from '../ui/multi-select';
import { parse, format, addMinutes } from 'date-fns';

const FormSchema = z.object({
  classrooms: z.array(z.string()).min(1, 'Please select at least one classroom.'),
  batch: z.string().min(1, 'Please select a batch.'),
  subjects: z.array(z.string()).min(1, 'Please select at least one subject.'),
  faculty: z.array(z.string()).min(1, 'Please select at least one faculty member.'),
  collegeStartTime: z.string().min(1, 'Start time is required.'),
  collegeEndTime: z.string().min(1, 'End time is required.'),
  periodDuration: z.coerce.number().min(15, 'Duration must be at least 15 minutes.'),
  breakTimings: z.string().optional(),
  numTimetables: z.string(),
  maxClassesPerDay: z.string().optional(),
  classesPerSubject: z.string().optional(),
  labConstraints: z.string().optional(),
  specialConstraints: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

// Helper to get unique values from an array of objects
const getUniqueValues = (data: any[], key: string) => {
    return Array.from(new Set(data.map(item => item[key])));
};

// Auto-populate data from existing sources
const availableClassrooms = getUniqueValues(sampleTimetable, 'room');
const availableBatches = getUniqueValues(sampleTimetable, 'batch');
const availableSubjects = getUniqueValues(sampleTimetable, 'subject');
const availableFaculty = facultyData.map(f => f.name);

// Create a mapping of faculty to the subjects they teach from the sample timetable
const facultySubjectMap = facultyData.reduce((acc, faculty) => {
    const subjectsTaught = getUniqueValues(sampleTimetable.filter(entry => entry.faculty === faculty.name), 'subject');
    if (subjectsTaught.length > 0) {
        acc[faculty.name] = subjectsTaught;
    }
    return acc;
}, {} as Record<string, string[]>);


// Helper function to generate time slots
const generateTimeSlots = (start: string, end: string, duration: number, breaks: string) => {
    const timeSlots = [];
    if (!start || !end || !duration) return [];
    const today = new Date();
    
    let currentTime = parse(start, 'HH:mm', today);
    const endTime = parse(end, 'HH:mm', today);

    const breakIntervals = (breaks || '').split(',')
        .map(b => b.trim())
        .filter(b => b.includes('-'))
        .map(b => {
            const [breakStart, breakEnd] = b.split('-');
            return {
                start: parse(breakStart, 'HH:mm', today),
                end: parse(breakEnd, 'HH:mm', today),
            };
        });

    while (currentTime < endTime) {
        const nextTime = addMinutes(currentTime, duration);
        if (nextTime > endTime) break;

        const isBreak = breakIntervals.some(interval => 
            (currentTime >= interval.start && currentTime < interval.end) ||
            (nextTime > interval.start && nextTime <= interval.end)
        );

        if (!isBreak) {
            timeSlots.push(`${format(currentTime, 'hh:mm a')}-${format(nextTime, 'hh:mm a')}`);
        }
        
        currentTime = nextTime;
    }

    return timeSlots;
};


export default function TimetableGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTimetables, setGeneratedTimetables] = useState<GeneratedTimetable[]>([]);
  const [facultySubjectMapping, setFacultySubjectMapping] = useState<Record<string, string[]>>({});

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      classrooms: [],
      batch: '',
      subjects: [],
      faculty: [],
      collegeStartTime: '09:00',
      collegeEndTime: '17:00',
      periodDuration: 60,
      breakTimings: '13:00-14:00',
      numTimetables: '3',
      maxClassesPerDay: '',
      classesPerSubject: '',
      labConstraints: '',
      specialConstraints: '',
    },
  });

  const selectedFaculty = useWatch({
    control: form.control,
    name: 'faculty',
  });

  const allSubjectsOptions = availableSubjects.map(v => ({ value: v, label: v }));


  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setGeneratedTimetables([]);

    try {
      const timeSlots = generateTimeSlots(
          data.collegeStartTime,
          data.collegeEndTime,
          data.periodDuration,
          data.breakTimings || ''
      );

      if (timeSlots.length === 0) {
        toast({
          variant: 'destructive',
          title: 'No Time Slots Generated',
          description: 'Please check your college timings, duration, and breaks. No valid time slots could be created.',
        });
        setIsLoading(false);
        return;
      }

      const facultySubjectMappingString = Object.entries(facultySubjectMapping)
            .filter(([faculty, subjects]) => data.faculty.includes(faculty) && subjects.length > 0)
            .map(([faculty, subjects]) => `${faculty}: ${subjects.join(', ')}`)
            .join('; ');

      const input = {
        ...data,
        batches: [data.batch], // Wrap single batch in an array for the API
        facultySubjectMapping: facultySubjectMappingString,
        timings: timeSlots,
        numTimetables: parseInt(data.numTimetables, 10),
      };
      
      const result = await generateTimetableAction(input);

      if (result.timetables && result.timetables.length > 0) {
        const parsedTimetables = result.timetables.map(t => {
            try {
                // The AI returns a string that should be a JSON array of TimetableEntry
                const timetableData = JSON.parse(t.timetable);
                return { timetable: Array.isArray(timetableData) ? timetableData : [] };
            } catch (e) {
                console.error("Failed to parse timetable string:", t.timetable);
                toast({
                    variant: 'destructive',
                    title: 'Parsing Error',
                    description: 'Could not parse one of the generated timetables. Displaying raw output might be necessary.',
                });
                // Return a single entry with the raw string for debugging
                return { timetable: [{ day: 'Error', time: '', room: '', batch: '', subject: 'Could not parse AI output', faculty: '' }] };
            }
        });
        setGeneratedTimetables(parsedTimetables);
        toast({
            title: 'Success!',
            description: `Successfully generated ${result.timetables.length} timetable options.`,
        });
      } else {
        throw new Error('AI returned no timetables.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const options = {
    classrooms: availableClassrooms.map(v => ({ value: v, label: v })),
    batches: availableBatches.map(v => ({ value: v, label: v })),
    subjects: availableSubjects.map(v => ({ value: v, label: v })),
    faculty: availableFaculty.map(v => ({ value: v, label: v })),
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="classrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Classrooms</FormLabel>
                  <MultiSelect
                    options={options.classrooms}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select classrooms..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger>
                              <SelectValue placeholder="Select a batch to generate timetable for" />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          {options.batches.map((option) => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjects for this Batch</FormLabel>
                   <MultiSelect
                    options={options.subjects}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select subjects..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Faculty</FormLabel>
                   <MultiSelect
                    options={options.faculty}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select faculty..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Timings & Duration</CardTitle>
                    <CardDescription>Define the schedule structure for the timetable.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                         <FormField
                            control={form.control}
                            name="collegeStartTime"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>College Start Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="collegeEndTime"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>College End Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="periodDuration"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Period Duration (mins)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 60" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                     <FormField
                        control={form.control}
                        name="breakTimings"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Break Times (comma-separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 13:00-14:00" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </CardContent>
            </Card>

           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="maxClassesPerDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Classes per Day</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="classesPerSubject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Classes per Subject (per week/day)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Data Structures: 4 per week, Algorithms: 3 per week" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <FormField
              control={form.control}
              name="labConstraints"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Lab &amp; Special Durations</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Data Structures Lab: 3 hours, Workshop Practice: 2 hours" {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card>
                <CardHeader>
                    <CardTitle>Faculty-to-Subject Mapping</CardTitle>
                    <CardDescription>Assign subjects that each selected faculty member can teach.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    {selectedFaculty.map((facultyName) => (
                        <div key={facultyName}>
                          <FormLabel>{facultyName}</FormLabel>
                          <MultiSelect
                              options={allSubjectsOptions}
                              selected={facultySubjectMapping[facultyName] || []}
                              onChange={(selectedSubjects) => {
                                  setFacultySubjectMapping(prev => ({ ...prev, [facultyName]: selectedSubjects }))
                              }}
                              placeholder="Select subjects..."
                          />
                        </div>
                    ))}
                    {selectedFaculty.length === 0 && (
                        <p className="text-sm text-muted-foreground">Select faculty members above to assign subjects.</p>
                    )}
                </CardContent>
            </Card>
             <FormField
              control={form.control}
              name="specialConstraints"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Other Constraints & Fixed Slots</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Lab session for CS-A on Wednesday 11:00-13:00 in LB-301. No classes after 4 PM on Fridays." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="numTimetables"
            render={({ field }) => (
              <FormItem className="w-full max-w-xs">
                <FormLabel>Number of Timetable Options</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of timetables" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Timetables
          </Button>
        </form>
      </Form>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">AI is thinking... Generating timetables now.</p>
        </div>
      )}

      {generatedTimetables.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle>Generated Timetables</CardTitle>
                <CardDescription>Review the generated options below. You can refine these on the Timetable page.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="option-1">
                    <TabsList className="grid w-full grid-cols-3">
                        {generatedTimetables.map((_, index) => (
                            <TabsTrigger key={`trigger-${index + 1}`} value={`option-${index + 1}`}>Option {index + 1}</TabsTrigger>
                        ))}
                    </TabsList>
                    {generatedTimetables.map((generated, index) => (
                        <TabsContent key={`content-${index + 1}`} value={`option-${index + 1}`}>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Day</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Room</TableHead>
                                            <TableHead>Batch</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Faculty</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {generated.timetable.map((entry: TimetableEntry, entryIndex: number) => (
                                            <TableRow key={entryIndex}>
                                                <TableCell>{entry.day}</TableCell>
                                                <TableCell>{entry.time}</TableCell>
                                                <TableCell>{entry.room}</TableCell>
                                                <TableCell>{entry.batch}</TableCell>
                                                <TableCell>{entry.subject}</TableCell>
                                                <TableCell>{entry.faculty}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

    

    