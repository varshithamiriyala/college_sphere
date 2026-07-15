
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateInterviewQuestions, InterviewPrepOutput } from '@/ai/flows/student/interview-prep-flow';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const FormSchema = z.object({
  jobRole: z.string().min(3, 'Please enter a job role.'),
});

export default function InterviewPrepPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<InterviewPrepOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jobRole: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setAiResponse(null);
    try {
      const response = await generateInterviewQuestions(data.jobRole);
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
            <Key className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Interview Prep</h1>
            <p className="text-muted-foreground">
                Generate technical, behavioral, and situational questions for any job role.
            </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Job Role</CardTitle>
          <CardDescription>
            Specify the role you're preparing for to get tailored questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="jobRole"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Job Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineer, Product Manager" {...field} />
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
                    Generate Questions
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
                Generated Interview Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
            ) : (
              <div className="space-y-6">
                
                {aiResponse?.technical && aiResponse.technical.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Technical Questions</h3>
                     <Accordion type="single" collapsible className="w-full">
                        {aiResponse.technical.map((item, index) => (
                           <AccordionItem value={`tech-${index}`} key={index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent className="prose dark:prose-invert max-w-none text-sm">
                                    <p>{item.answer}</p>
                                </AccordionContent>
                           </AccordionItem>
                        ))}
                    </Accordion>
                  </div>
                )}
                
                <Separator />

                {aiResponse?.behavioral && aiResponse.behavioral.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Behavioral Questions</h3>
                     <Accordion type="single" collapsible className="w-full">
                        {aiResponse.behavioral.map((item, index) => (
                           <AccordionItem value={`behav-${index}`} key={index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent className="prose dark:prose-invert max-w-none text-sm">
                                    <p>{item.answer}</p>
                                </AccordionContent>
                           </AccordionItem>
                        ))}
                    </Accordion>
                  </div>
                )}

                <Separator />

                 {aiResponse?.situational && aiResponse.situational.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Situational Questions</h3>
                     <Accordion type="single" collapsible className="w-full">
                        {aiResponse.situational.map((item, index) => (
                           <AccordionItem value={`sit-${index}`} key={index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent className="prose dark:prose-invert max-w-none text-sm">
                                    <p>{item.answer}</p>
                                </AccordionContent>
                           </AccordionItem>
                        ))}
                    </Accordion>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
