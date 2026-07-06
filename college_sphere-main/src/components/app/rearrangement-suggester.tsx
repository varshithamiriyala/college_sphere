'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bot, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { suggestRearrangementsAction } from '@/app/actions';
import { SuggestTimetableRearrangementsOutput } from '@/ai/flows/suggest-timetable-rearrangements';
import { Separator } from '../ui/separator';

const FormSchema = z.object({
  constraints: z.string().min(10, 'Please describe your constraints in more detail.'),
  currentTimetable: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function RearrangementSuggester() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestTimetableRearrangementsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      constraints: '',
      currentTimetable: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const input = {
        classrooms: ['CR-101', 'CR-102', 'CR-103', 'LH-201', 'LB-301'],
        batches: ['CS-A', 'CS-B', 'EE-A', 'ME-A'],
        subjects: ['Data Structures', 'Algorithms', 'Circuit Theory', 'Thermodynamics'],
        faculty: ['Dr. Evelyn Reed', 'Dr. Samuel Green', 'Dr. Marcus Hayes'],
        timetableConstraints: data.constraints,
        currentTimetable: data.currentTimetable,
      };

      const aiResult = await suggestRearrangementsAction(input);
      setResult(aiResult);
      toast({
        title: 'Suggestions Received',
        description: 'AI has provided feedback on your timetable constraints.',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Bot className="mr-2 h-4 w-4" />
          AI Suggestion Tool
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>AI Rearrangement Suggester</SheetTitle>
          <SheetDescription>
            Describe your constraints or conflicts, and the AI will suggest optimal rearrangements.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="constraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Constraints & Conflicts</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., A faculty member is unavailable..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentTimetable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Timetable (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your current timetable data here..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Get Suggestions
              </Button>
            </form>
          </Form>

          {isLoading && (
            <div className="mt-8 flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-center text-muted-foreground">AI is analyzing your constraints...</p>
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-6">
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Feasibility Report</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.feasibilityReport}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Suggested Rearrangements</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.suggestedRearrangements}</p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
