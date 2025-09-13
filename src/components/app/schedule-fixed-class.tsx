
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CalendarClock, Loader2, CalendarPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const FormSchema = z.object({
  day: z.string().min(1, 'Please select a day.'),
  time: z.string().min(1, 'Please enter a time.'),
  subject: z.string().min(1, 'Please select a subject.'),
  faculty: z.string().min(1, 'Please select a faculty member.'),
  batch: z.string().min(1, 'Please select a batch.'),
  room: z.string().min(1, 'Please select a classroom.'),
});

type FormValues = z.infer<typeof FormSchema>;

// Dummy data for dropdowns - in a real app, this would come from a database
const dummyData = {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    subjects: ['Data Structures', 'Algorithms', 'Operating Systems', 'Database Management'],
    faculty: ['Dr. Evelyn Reed', 'Dr. Samuel Green', 'Dr. Marcus Hayes'],
    batches: ['CS-A', 'CS-B', 'EE-A'],
    rooms: ['CR-101', 'CR-102', 'LH-201'],
};

export function ScheduleFixedClass() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    console.log('Fixed class data:', data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setOpen(false);
    toast({
      title: 'Class Scheduled',
      description: `${data.subject} has been scheduled for ${data.day} at ${data.time}. (This is a simulation)`,
    });
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        form.reset();
      }
      setOpen(isOpen);
    }}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-full flex-col items-center justify-center gap-2 p-4 transition-all hover:shadow-md hover:-translate-y-1"
        >
          <CalendarClock className="h-8 w-8" />
          <span className="mt-2 text-center text-sm font-medium">Schedule Fixed Class</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule a Fixed Class</DialogTitle>
          <DialogDescription>
            Add a permanent, recurring class to the timetable. The AI generator will work around this slot.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="day" render={({ field }) => (
                    <FormItem>
                    <FormLabel>Day</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select day" /></SelectTrigger></FormControl>
                        <SelectContent>{dummyData.days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}/>
                 <FormField control={form.control} name="time" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl><Input type="time" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
            <FormField control={form.control} name="subject" render={({ field }) => (
                <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger></FormControl>
                    <SelectContent>{dummyData.subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}/>
            <FormField control={form.control} name="faculty" render={({ field }) => (
                <FormItem>
                <FormLabel>Faculty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select faculty" /></SelectTrigger></FormControl>
                    <SelectContent>{dummyData.faculty.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}/>
            <FormField control={form.control} name="batch" render={({ field }) => (
                <FormItem>
                <FormLabel>Batch</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger></FormControl>
                    <SelectContent>{dummyData.batches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}/>
             <FormField control={form.control} name="room" render={({ field }) => (
                <FormItem>
                <FormLabel>Classroom</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select room" /></SelectTrigger></FormControl>
                    <SelectContent>{dummyData.rooms.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}/>

            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="mr-2 h-4 w-4" />}
                Schedule Class
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
