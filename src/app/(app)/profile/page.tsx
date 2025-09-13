
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const qualificationSchema = z.object({
  degree: z.string().min(2, 'Degree is required.'),
  institution: z.string().min(2, 'Institution is required.'),
  year: z.coerce.number().min(1950).max(new Date().getFullYear(), 'Invalid year.'),
});

type Qualification = z.infer<typeof qualificationSchema>;

const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
});

const submissionFormSchema = z.object({
    type: z.string(),
    file: z.any(),
    description: z.string().optional(),
});

export default function ProfilePage() {
    const { toast } = useToast();
    const [qualifications, setQualifications] = useState<Qualification[]>([
        { degree: 'Ph.D. in Computer Science', institution: 'Stanford University', year: 2010 },
        { degree: 'M.S. in Computer Science', institution: 'MIT', year: 2006 },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingSubmission, setIsSubmittingSubmission] = useState(false);

    const qualificationForm = useForm<Qualification>({
        resolver: zodResolver(qualificationSchema),
        defaultValues: {
        degree: '',
        institution: '',
        year: undefined,
        },
    });

    const submissionForm = useForm<z.infer<typeof submissionFormSchema>>({
        resolver: zodResolver(submissionFormSchema),
        defaultValues: {
            type: 'assignment',
            description: '',
        }
    });

    function onAddQualification(data: Qualification) {
        setIsSubmitting(true);
        setTimeout(() => {
            setQualifications((prev) => [...prev, data]);
            toast({ title: 'Qualification Added', description: 'Your new qualification has been saved.' });
            qualificationForm.reset();
            setIsSubmitting(false);
        }, 500);
    }
    
    function onRemoveQualification(index: number) {
        setQualifications((prev) => prev.filter((_, i) => i !== index));
        toast({ title: 'Qualification Removed', description: 'The qualification has been removed.' });
    }

    function onSubmissionSubmit(data: z.infer<typeof submissionFormSchema>) {
        setIsSubmittingSubmission(true);
        console.log("Submission Data:", data);
        setTimeout(() => {
            toast({ title: 'Submission Successful', description: `Your ${data.type} has been submitted.` });
            submissionForm.reset();
            setIsSubmittingSubmission(false);
        }, 1000);
    }


  return (
    <div className="space-y-6">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Faculty Profile</h1>
            <p className="text-muted-foreground">Manage your personal information, qualifications, and submissions.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
                {/* Profile Card */}
                <Card>
                    <CardHeader className="text-center">
                        <Avatar className="w-24 h-24 mx-auto border-2 border-primary mb-4">
                            <AvatarImage src="https://picsum.photos/seed/AdminUser/200/200" alt="Admin" data-ai-hint="person portrait" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <CardTitle>Admin</CardTitle>
                        <CardDescription>Professor, Computer Science</CardDescription>
                    </CardHeader>
                </Card>

                 {/* Qualifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Qualifications</CardTitle>
                        <CardDescription>Your academic and professional qualifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-4">
                            {qualifications.map((q, index) => (
                                <div key={index} className="flex items-start justify-between p-3 rounded-md border text-sm">
                                    <div>
                                        <p className="font-semibold">{q.degree}</p>
                                        <p className="text-muted-foreground">{q.institution} - {q.year}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onRemoveQualification(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <Form {...qualificationForm}>
                            <form onSubmit={qualificationForm.handleSubmit(onAddQualification)} className="space-y-4">
                                <FormField control={qualificationForm.control} name="degree" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Degree</FormLabel>
                                        <FormControl><Input placeholder="e.g., Ph.D. in AI" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={qualificationForm.control} name="institution" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Institution</FormLabel>
                                        <FormControl><Input placeholder="e.g., Tech University" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                 <FormField control={qualificationForm.control} name="year" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year of Completion</FormLabel>
                                        <FormControl><Input type="number" placeholder="e.g., 2024" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                                    Add Qualification
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:col-span-2">
                 {/* Submissions Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Submit Documents</CardTitle>
                        <CardDescription>Upload attendance records, assignment marks, or other documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Form {...submissionForm}>
                            <form onSubmit={submissionForm.handleSubmit(onSubmissionSubmit)} className="space-y-4">
                                <FormField control={submissionForm.control} name="type" render={({ field }) => (
                                     <FormItem>
                                        <FormLabel>Submission Type</FormLabel>
                                        <select {...field} className="w-full p-2 border rounded-md">
                                            <option value="assignment">Assignment Marks</option>
                                            <option value="attendance">Attendance Record</option>
                                            <option value="exam">Exam Scores</option>
                                            <option value="other">Other Document</option>
                                        </select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={submissionForm.control} name="file" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>File</FormLabel>
                                        <FormControl>
                                            <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={submissionForm.control} name="description" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Add any relevant notes here..." {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <Button type="submit" className="w-full" disabled={isSubmittingSubmission}>
                                    {isSubmittingSubmission && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Submit Document
                                </Button>
                            </form>
                         </Form>
                    </CardContent>
                </Card>
            </div>

        </div>
    </div>
  );
}
