'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

const FormSchema = z.object({
  classrooms: z.string().min(1, 'Please provide at least one classroom.'),
  batches: z.string().min(1, 'Please provide at least one batch.'),
  subjects: z.string().min(1, 'Please provide at least one subject.'),
  faculty: z.string().min(1, 'Please provide at least one faculty member.'),
  timings: z.string().min(1, 'Please provide at least one time slot.'),
  numTimetables: z.string(),
  maxClassesPerDay: z.string().optional(),
  classesPerSubject: z.string().optional(),
  facultySubjectMapping: z.string().optional(),
  specialConstraints: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

// Helper to get unique values from an array of objects
const getUniqueValues = (data: any[], key: string) => {
    return Array.from(new Set(data.map(item => item[key])));
};

// Auto-populate data from existing sources
const availableClassrooms = getUniqueValues(sampleTimetable, 'room').join(', ');
const availableBatches = getUniqueValues(sampleTimetable, 'batch').join(', ');
const availableSubjects = getUniqueValues(sampleTimetable, 'subject').join(', ');
const availableFaculty = facultyData.map(f => f.name).join(', ');
const availableTimings = getUniqueValues(sampleTimetable, 'time').join(', ');

// Create a mapping of faculty to the subjects they teach from the sample timetable
const facultySubjectMap = facultyData.reduce((acc, faculty) => {
    const subjectsTaught = getUniqueValues(sampleTimetable.filter(entry => entry.faculty === faculty.name), 'subject');
    if (subjectsTaught.length > 0) {
        acc[faculty.name] = subjectsTaught;
    }
    return acc;
}, {} as Record<string, string[]>);

const facultySubjectMappingString = Object.entries(facultySubjectMap)
    .map(([faculty, subjects]) => `${faculty}: ${subjects.join(', ')}`)
    .join('; ');


export default function TimetableGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTimetables, setGeneratedTimetables] = useState<GeneratedTimetable[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      classrooms: availableClassrooms,
      batches: availableBatches,
      subjects: availableSubjects,
      faculty: availableFaculty,
      timings: availableTimings,
      numTimetables: '3',
      maxClassesPerDay: '5',
      classesPerSubject: 'Data Structures: 3 per week, Algorithms: 3 per week',
      facultySubjectMapping: facultySubjectMappingString,
      specialConstraints: 'No classes on Friday after 3 PM.',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setGeneratedTimetables([]);

    try {
      const input = {
        classrooms: data.classrooms.split(',').map(s => s.trim()),
        batches: data.batches.split(',').map(s => s.trim()),
        subjects: data.subjects.split(',').map(s => s.trim()),
        faculty: data.faculty.split(',').map(s => s.trim()),
        timings: data.timings.split(',').map(s => s.trim()),
        numTimetables: parseInt(data.numTimetables, 10),
        maxClassesPerDay: data.maxClassesPerDay,
        classesPerSubject: data.classesPerSubject,
        facultySubjectMapping: data.facultySubjectMapping,
        specialConstraints: data.specialConstraints,
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
                  <FormLabel>Classrooms (Comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., CR-101, CR-102" {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="batches"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batches (Comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., CS-A, EE-A" {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjects (Comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Data Structures, Algorithms" {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty (Comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Dr. Evelyn Reed, Dr. Samuel Green" {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="timings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timings (Comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 09:00-10:00, 10:00-11:00" {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                <FormItem className="md:col-span-2">
                  <FormLabel>Number of Classes per Subject (per week/day)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Data Structures: 4 per week, Algorithms: 3 per week" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facultySubjectMapping"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Faculty-to-Subject Mapping (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Dr. Evelyn Reed: Data Structures, Algorithms; Dr. Samuel Green: Circuit Theory" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="specialConstraints"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Special Constraints & Fixed Slots</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Lab session for CS-A on Wednesday 11:00-13:00 in LB-301. No classes after 4 PM on Fridays." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
