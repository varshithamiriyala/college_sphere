
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LifeBuoy, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { askDoubt } from '@/ai/flows/student/ask-doubt-flow';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';

const FormSchema = z.object({
  doubt: z.string().min(10, {
    message: 'Please describe your doubt in at least 10 characters.',
  }),
});

export default function DoubtAssistantPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      doubt: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setAiResponse('');
    try {
      const response = await askDoubt(data.doubt);
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
            <LifeBuoy className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Doubt Assistant</h1>
            <p className="text-muted-foreground">
                Stuck on a concept? Ask the AI for a detailed explanation.
            </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ask Your Question</CardTitle>
          <CardDescription>
            Enter your question about any subject, and the AI will provide an explanation, including key definitions and worked examples where relevant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="doubt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Can you explain the difference between pass-by-value and pass-by-reference in C++ with an example?'"
                        className="resize-none"
                        rows={5}
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
                    Generating Answer...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Get Explanation
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
                AI Generated Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                </div>
            ) : (
                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
