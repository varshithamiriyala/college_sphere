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

const FormSchema = z.object({
  classrooms: z.string().min(1, 'Please provide at least one classroom.'),
  batches: z.string().min(1, 'Please provide at least one batch.'),
  subjects: z.string().min(1, 'Please provide at least one subject.'),
  faculty: z.string().min(1, 'Please provide at least one faculty member.'),
  numTimetables: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function TimetableGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTimetables, setGeneratedTimetables] = useState<GeneratedTimetable[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      classrooms: 'CR-101, CR-102, CR-103, LH-201, LB-301',
      batches: 'CS-A, CS-B, EE-A, ME-A',
      subjects: 'Data Structures, Algorithms, Circuit Theory, Thermodynamics, Quantum Mechanics',
      faculty: 'Dr. Evelyn Reed, Dr. Samuel Green, Dr. Clara Bennett, Dr. Marcus Hayes, Dr. Olivia Chen',
      numTimetables: '3',
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
                  <FormLabel>Classrooms</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., CR-101, CR-102" {...field} rows={3} />
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
                  <FormLabel>Batches</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., CS-A, EE-A" {...field} rows={3} />
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
                  <FormLabel>Subjects</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Data Structures, Algorithms" {...field} rows={3} />
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
                  <FormLabel>Faculty</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Dr. Evelyn Reed, Dr. Samuel Green" {...field} rows={3} />
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
                <FormLabel>Number of Timetables</FormLabel>
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
