
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateRevisionPlan, ExamCoachOutput } from '@/ai/flows/student/exam-coach-flow';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FormSchema = z.object({
  subject: z.string().min(3, 'Please enter a subject name.'),
});

export default function ExamCoachPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<ExamCoachOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subject: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setAiResponse(null);
    try {
      const response = await generateRevisionPlan(data.subject);
      setAiResponse(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'The AI model could not be reached. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <BrainCircuit className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Exam Coach</h1>
            <p className="text-muted-foreground">
                Generates a focused revision plan with key topics and definitions.
            </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Subject for Revision</CardTitle>
          <CardDescription>
            Specify the subject you want to prepare for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Subject Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Data Structures, Thermodynamics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Plan
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || aiResponse) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Your AI-Generated Revision Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
            ) : (
              <div className="space-y-6">
                 <div>
                    <h3 className="text-xl font-semibold mb-2">Key Topics</h3>
                     <Accordion type="single" collapsible className="w-full">
                        {aiResponse?.keyTopics.map((item, index) => (
                           <AccordionItem value={`topic-${index}`} key={index}>
                                <AccordionTrigger>{item.topic}</AccordionTrigger>
                                <AccordionContent className="prose dark:prose-invert max-w-none text-sm">
                                    <p>{item.explanation}</p>
                                </AccordionContent>
                           </AccordionItem>
                        ))}
                    </Accordion>
                  </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
