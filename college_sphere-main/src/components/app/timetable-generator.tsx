

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
      {/* Signage Title */}
      <div className="border-b border-[#1B2A4A]/20 dark:border-border/30 pb-4">
        <span className="text-[10px] font-mono text-[#E2A73E] font-bold uppercase tracking-wider">[GEN.SCHED-10]</span>
        <h2 className="text-2xl font-bold font-display text-[#1B2A4A] dark:text-foreground">Schedule Configuration Desk</h2>
        <p className="text-xs text-[#5B6B82] tracking-wide">Specify metrics, constraints, and resources to trigger automated schedule compiling.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="classrooms"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-mono font-bold text-[#1B2A4A] dark:text-neutral-300">[FACIL.01] Available Classrooms</FormLabel>
                  <MultiSelect
                    options={options.classrooms}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select classrooms..."
                  />
                  <FormMessage className="text-xs text-[#C1442E]" />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-mono font-bold text-[#1B2A4A] dark:text-neutral-300">[BATCH.02] Target Cohort</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-mono text-xs">
                              <SelectValue placeholder="Select target cohort..." />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-[4px] border-[#1B2A4A]/30 font-mono text-xs">
                          {options.batches.map((option) => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-[#C1442E]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjects"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-mono font-bold text-[#1B2A4A] dark:text-neutral-300">[CURRIC.03] Subjects Index</FormLabel>
                   <MultiSelect
                    options={options.subjects}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select syllabus subjects..."
                  />
                  <FormMessage className="text-xs text-[#C1442E]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-mono font-bold text-[#1B2A4A] dark:text-neutral-300">[STAFF.04] Active Faculty Officers</FormLabel>
                   <MultiSelect
                    options={options.faculty}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select lecturers..."
                  />
                  <FormMessage className="text-xs text-[#C1442E]" />
                </FormItem>
              )}
            />
            </div>
            
            <Card className="campus-card">
                <CardHeader className="border-b border-border/20 pb-4">
                    <span className="text-[10px] font-mono text-[#E2A73E] font-bold">[T-INTERVALS]</span>
                    <CardTitle className="text-md font-bold font-display">Signage & Duration Parameters</CardTitle>
                    <CardDescription className="text-xs">Define timing structure for academic index schedules.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-5">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                         <FormField
                            control={form.control}
                            name="collegeStartTime"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-mono text-muted-foreground uppercase">[t_start] Hours Start</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-mono text-xs" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="collegeEndTime"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-mono text-muted-foreground uppercase">[t_end] Hours End</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-mono text-xs" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="periodDuration"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-mono text-muted-foreground uppercase">[t_dur] Period Duration (mins)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="60" {...field} className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-mono text-xs" />
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
                            <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-mono text-muted-foreground uppercase">[t_break] Rules Break Intervals</FormLabel>
                            <FormControl>
                                <Input placeholder="13:00-14:00" {...field} className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-mono text-xs" />
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
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-mono font-bold text-[#1B2A4A] dark:text-neutral-300">[CONSTR.05] Max Deliveries per Day</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5" {...field} className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-mono text-xs" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="classesPerSubject"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-mono font-bold text-[#1B2A4A] dark:text-neutral-300">[CONSTR.06] Load per Subject (per week)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Data Structures: 4 per week" {...field} className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-sans text-xs" rows={2} />
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
                <FormItem className="md:col-span-2 space-y-1.5">
                  <FormLabel className="text-xs font-mono font-bold text-[#1B2A4A] dark:text-neutral-300">[CONSTR.07] Lab &amp; Practical Extensions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Data Structures Lab: 3 hours" {...field} className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-sans text-xs" rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card className="campus-card">
                <CardHeader className="border-b border-border/20 pb-4">
                    <span className="text-[10px] font-mono text-[#E2A73E] font-bold">[MAPPED.STAFF]</span>
                    <CardTitle className="text-md font-bold font-display">Faculty Competency Indexes</CardTitle>
                    <CardDescription className="text-xs">Map academic subjects to assigned professors.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-5">
                    {selectedFaculty.map((facultyName) => (
                        <div key={facultyName} className="space-y-1.5">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6B82]">- Competencies: {facultyName}</label>
                          <MultiSelect
                              options={allSubjectsOptions}
                              selected={facultySubjectMapping[facultyName] || []}
                              onChange={(selectedSubjects) => {
                                  setFacultySubjectMapping(prev => ({ ...prev, [facultyName]: selectedSubjects }))
                              }}
                              placeholder="Assign subjects..."
                          />
                        </div>
                    ))}
                    {selectedFaculty.length === 0 && (
                        <p className="text-xs font-mono text-muted-foreground uppercase">[SYS.WARN] Select faculty officials to initialize competency assignments.</p>
                    )}
                </CardContent>
            </Card>
             <FormField
              control={form.control}
              name="specialConstraints"
              render={({ field }) => (
                <FormItem className="md:col-span-2 space-y-1.5">
                  <FormLabel className="text-xs font-mono font-bold text-[#1B2A4A] dark:text-neutral-300">[CONSTR.08] Adhoc Exceptions & Rule Adjustments</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Lab session on Wednesday 11:00-13:00. No classes after 4 PM on Fridays." {...field} className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-sans text-xs" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="numTimetables"
            render={({ field }) => (
              <FormItem className="w-full max-w-xs space-y-1.5">
                <FormLabel className="text-xs font-mono font-bold text-[#1B2A4A] dark:text-neutral-300">[COMPILE] Batch Generation Limit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-[4px] border-[#1B2A4A]/30 dark:border-border/40 font-mono text-xs">
                      <SelectValue placeholder="Select output options limit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-mono text-xs">
                    <SelectItem value="3">3 Configurations</SelectItem>
                    <SelectItem value="4">4 Configurations</SelectItem>
                    <SelectItem value="5">5 Configurations</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="rounded-[4px] bg-[#1B2A4A] dark:bg-card border border-border text-white dark:text-foreground font-mono text-xs font-bold px-6 h-10 hover:bg-[#1B2A4A]/90 transition-all">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#E2A73E]" /> : null}
            EXECUTE_COMPILATION
          </Button>
        </form>
      </Form>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-none border-2 border-dashed border-[#1B2A4A]/25 p-12 bg-white dark:bg-card/20">
            <Loader2 className="h-8 w-8 animate-spin text-[#E2A73E]" />
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">[SYSTEM ENGINE] RUNNING INTELLECTUAL HEURISTIC COMPILER...</p>
        </div>
      )}

      {generatedTimetables.length > 0 && (
        <Card className="campus-card">
            <CardHeader className="border-b border-border/20 pb-4">
                <span className="text-[10px] font-mono text-[#E2A73E] font-bold">[OUTPUT.LEDG]</span>
                <CardTitle className="text-lg font-bold font-display">Generated Schedule Ledgers</CardTitle>
                <CardDescription className="text-xs">Compile options rendered below. Click to test structural compatibility.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <Tabs defaultValue="option-1" className="space-y-4">
                    <TabsList className="flex rounded-none border border-border bg-[#EEF2F6] dark:bg-[#10192B] p-0.5 w-max">
                        {generatedTimetables.map((_, index) => (
                            <TabsTrigger key={`trigger-${index + 1}`} value={`option-${index + 1}`} className="rounded-none font-mono text-xs px-4 py-1.5 data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white dark:data-[state=active]:bg-card dark:data-[state=active]:text-white transition-all">
                              CFG-{index + 1}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {generatedTimetables.map((generated, index) => (
                        <TabsContent key={`content-${index + 1}`} value={`option-${index + 1}`} className="border border-border/50 p-1 bg-white dark:bg-card/20 select-text">
                            <div className="overflow-x-auto">
                                <Table className="border-collapse">
                                    <TableHeader className="bg-[#EEF2F6] dark:bg-[#10192B]/80 font-mono text-[11px]">
                                        <TableRow className="border-b border-border/50">
                                            <TableHead className="font-bold text-[#1B2A4A] dark:text-white pb-2.5 pt-2.5">DAY</TableHead>
                                            <TableHead className="font-bold text-[#1B2A4A] dark:text-white pb-2.5 pt-2.5">INTERVAL</TableHead>
                                            <TableHead className="font-bold text-[#1B2A4A] dark:text-white pb-2.5 pt-2.5">ROOM.ID</TableHead>
                                            <TableHead className="font-bold text-[#1B2A4A] dark:text-white pb-2.5 pt-2.5">COHORT</TableHead>
                                            <TableHead className="font-bold text-[#1B2A4A] dark:text-white pb-2.5 pt-2.5">SUBJECT</TableHead>
                                            <TableHead className="font-bold text-[#1B2A4A] dark:text-white pb-2.5 pt-2.5">OFFICER</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="font-mono text-xs">
                                        {generated.timetable.map((entry: TimetableEntry, entryIndex: number) => (
                                            <TableRow key={entryIndex} className="hover:bg-muted/10 border-b border-border/10 last:border-b-0">
                                                <TableCell className="font-bold pb-2 pt-2">{entry.day}</TableCell>
                                                <TableCell className="pb-2 pt-2 text-[#5B6B82] dark:text-neutral-400">{entry.time}</TableCell>
                                                <TableCell className="pb-2 pt-2">{entry.room}</TableCell>
                                                <TableCell className="pb-2 pt-2 text-[#E2A73E] font-bold">{entry.batch}</TableCell>
                                                <TableCell className="pb-2 pt-2 text-[#1B2A4A] dark:text-neutral-100 font-sans font-bold">{entry.subject}</TableCell>
                                                <TableCell className="pb-2 pt-2 text-[#5B6B82] dark:text-neutral-400">{entry.faculty}</TableCell>
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