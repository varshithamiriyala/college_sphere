
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { suggestCareers, CareerAdviceInput, CareerAdviceOutput } from '@/ai/flows/student/career-advisor-flow';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { z } from 'zod';

const CareerAdviceFormSchema = z.object({
  skills: z.string().min(1, 'Please enter at least one skill.'),
  interests: z.string().min(1, 'Please enter at least one interest.'),
});


export default function CareerAdvisorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<CareerAdviceOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<CareerAdviceInput>({
    resolver: zodResolver(CareerAdviceFormSchema),
    defaultValues: {
      skills: '',
      interests: '',
    },
  });

  async function onSubmit(data: CareerAdviceInput) {
    setIsLoading(true);
    setAiResponse(null);
    try {
      const response = await suggestCareers(data);
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
            <Briefcase className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Career Advisor</h1>
            <p className="text-muted-foreground">
                Get personalized career suggestions based on your skills and interests.
            </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tell Us About Yourself</CardTitle>
          <CardDescription>
            The more detail you provide, the better the AI's suggestions will be.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Python, React, Public Speaking, Project Management"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Building mobile apps, analyzing data, renewable energy, creative writing"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Suggest Careers
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
                Suggested Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
            ) : (
                <Accordion type="single" collapsible className="w-full">
                    {aiResponse?.careers.map((career, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-lg">{career.jobTitle}</AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-2">
                                <p className="text-muted-foreground">{career.description}</p>
                                
                                <div>
                                    <h4 className="font-semibold mb-2">Key Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {career.requiredSkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Market Trends</h4>
                                    <p className="text-sm text-muted-foreground">{career.marketTrends}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
