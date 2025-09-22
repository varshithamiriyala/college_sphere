
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitGraph, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateDiagram } from '@/ai/flows/student/generate-diagram-flow';
import mermaid from 'mermaid';

const FormSchema = z.object({
  topic: z.string().min(5, 'Please describe the topic in at least 5 characters.'),
});

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  themeVariables: {
    fontFamily: 'Inter, sans-serif',
  }
});

export default function DiagramGeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [diagramCode, setDiagramCode] = useState('');
  const [renderKey, setRenderKey] = useState(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { topic: '' },
  });
  
  useEffect(() => {
    if (diagramCode) {
      try {
        const element = document.querySelector('.mermaid');
        if (element) {
          element.removeAttribute('data-processed');
          mermaid.run({ nodes: [element as HTMLElement] });
        }
      } catch (e) {
        console.error("Mermaid rendering error:", e);
        toast({
            variant: "destructive",
            title: "Diagram Error",
            description: "Could not render the generated diagram."
        });
      }
    }
  }, [diagramCode, renderKey, toast]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setDiagramCode('');
    try {
      const response = await generateDiagram(data.topic);
      // Clean the response to get only the Mermaid code block
      const mermaidCode = response.replace(/```mermaid\n/g, '').replace(/```/g, '').trim();
      setDiagramCode(mermaidCode);
      setRenderKey(prev => prev + 1); // Force re-render
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
            <GitGraph className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Diagram Generator</h1>
            <p className="text-muted-foreground">
                Convert complex topics into clear flowcharts or mind maps.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Topic</CardTitle>
          <CardDescription>
            Describe the process, concept, or system you want to visualize.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'The process of photosynthesis' or 'A simple client-server architecture'"
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
                    Generating Diagram...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Diagram
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || diagramCode) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Generated Diagram
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center bg-muted/30 rounded-lg p-4">
            {isLoading ? (
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
            ) : (
              <div key={renderKey} className="mermaid w-full">
                {diagramCode}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
