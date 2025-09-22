
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Loader2, Search, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeResume, ResumeAnalysisOutput } from '@/ai/flows/student/resume-analyzer-flow';
import ReactMarkdown from 'react-markdown';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  resume: z.any().refine(file => file?.length > 0, 'A resume file is required.'),
});

export default function ResumeAnalyzerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<ResumeAnalysisOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setAiResponse(null);
    try {
        const file = data.resume[0];
        if (!file) {
            toast({ variant: 'destructive', title: 'No file selected' });
            setIsLoading(false);
            return;
        }
        
        const resumeDataUri = await fileToBase64(file);

        const response = await analyzeResume({ resumeDataUri });
        setAiResponse(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'The AI model could not be reached or the file could not be read. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Search className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Resume Analyzer</h1>
            <p className="text-muted-foreground">
                Upload your resume for AI-powered feedback and suggestions.
            </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
          <CardDescription>
            Upload a file (e.g., PDF) to get instant analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel>Resume File</FormLabel>
                            <FormControl>
                                <Input type="file" accept="application/pdf" onChange={(e) => onChange(e.target.files)} {...rest} />
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
                    <FileUp className="mr-2 h-4 w-4" />
                    Analyze Resume
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
                AI Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
            ) : (
                aiResponse && (
                    <div className="prose dark:prose-invert max-w-none space-y-4">
                        <div>
                            <h3 className="font-semibold">Overall Score: {aiResponse.overallScore}/100</h3>
                            <p>{aiResponse.overallFeedback}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Suggestions for Improvement</h3>
                            <ReactMarkdown>{aiResponse.suggestions}</ReactMarkdown>
                        </div>
                    </div>
                )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
