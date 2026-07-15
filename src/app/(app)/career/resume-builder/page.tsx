
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateResume, ResumeData } from '@/ai/flows/student/resume-builder-flow';
import ReactMarkdown from 'react-markdown';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FormSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.string().email(),
  phone: z.string().min(1, "Phone number is required."),
  linkedIn: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  education: z.string().min(1, "Education details are required."),
  experience: z.string().optional(),
  projects: z.string().min(1, "Project details are required."),
  skills: z.string().min(1, "Skills are required."),
  template: z.enum(['modern', 'professional', 'creative']),
});

export default function ResumeBuilderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        github: '',
        education: 'B.Tech in Computer Science, Tech University, 2020-2024, CGPA: 8.5',
        experience: '',
        projects: 'AI Timetable Generator: Developed a React-based application using Next.js and Genkit AI.',
        skills: 'JavaScript, React, Next.js, Python, Genkit, Firebase',
        template: 'professional',
    },
  });

  async function onSubmit(data: ResumeData) {
    setIsLoading(true);
    setAiResponse('');
    try {
      const response = await generateResume(data);
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
            <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Resume Builder</h1>
            <p className="text-muted-foreground">
                Generates professional resumes with customizable templates.
            </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card>
            <CardHeader>
                <CardTitle>Enter Your Details</CardTitle>
                <CardDescription>Fill out the form to generate your resume.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <FormField name="fullName" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                         )}/>
                         <div className="grid grid-cols-2 gap-4">
                            <FormField name="email" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="john.doe@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField name="phone" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <FormField name="linkedIn" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField name="github" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                         </div>
                         <FormField name="education" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Education</FormLabel><FormControl><Textarea placeholder="Your degree, university, and dates..." {...field} /></FormControl><FormMessage /></FormItem>
                         )}/>
                         <FormField name="experience" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Work Experience (Optional)</FormLabel><FormControl><Textarea placeholder="Your job title, company, and responsibilities..." {...field} /></FormControl><FormMessage /></FormItem>
                         )}/>
                         <FormField name="projects" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Projects</FormLabel><FormControl><Textarea placeholder="Describe your most relevant projects..." {...field} /></FormControl><FormMessage /></FormItem>
                         )}/>
                         <FormField name="skills" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Skills</FormLabel><FormControl><Textarea placeholder="Comma-separated skills, e.g., JavaScript, Python, React..." {...field} /></FormControl><FormMessage /></FormItem>
                         )}/>
                         <FormField name="template" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Template</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="professional">Professional</SelectItem>
                                        <SelectItem value="modern">Modern</SelectItem>
                                        <SelectItem value="creative">Creative</SelectItem>
                                    </SelectContent>
                                </Select>
                            <FormMessage /></FormItem>
                         )}/>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>) : (<><Wand2 className="mr-2 h-4 w-4" /> Generate Resume</>)}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Generated Resume
                </CardTitle>
                <CardDescription>
                    Your AI-generated resume will appear here in Markdown format.
                </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px]">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    </div>
                ) : aiResponse ? (
                    <div className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown>{aiResponse}</ReactMarkdown>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground italic">Your resume will be displayed here once generated.</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
