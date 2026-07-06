
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { summarizeText } from '@/ai/flows/student/summarize-text-flow';

const FormSchema = z.object({
  text: z.string().min(100, {
    message: 'Please enter at least 100 characters to summarize.',
  }),
});

export default function SummarizerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { text: '' },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setSummary('');
    try {
      const response = await summarizeText(data.text);
      setSummary(response);
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
            <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Summarizer</h1>
            <p className="text-muted-foreground">
                Generate concise summaries of long notes or articles instantly.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Text to Summarize</CardTitle>
            <CardDescription>
              Paste the text you want to summarize below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your long article, notes, or any text here..."
                          className="resize-y"
                          rows={15}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Generated Summary
            </CardTitle>
            <CardDescription>
                The AI-generated summary will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {isLoading ? (
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                </div>
            ) : summary ? (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summary}</p>
            ) : (
                <p className="text-sm text-muted-foreground italic">Your summary will be displayed here once generated.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
