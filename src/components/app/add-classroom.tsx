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
import { Home, Loader2 } from 'lucide-react';
import Link from 'next/link';

const FormSchema = z.object({
  roomNumber: z.string().min(1, 'Room number is required.'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1.'),
});

type FormValues = z.infer<typeof FormSchema>;

export function AddClassroom() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roomNumber: '',
      capacity: 30,
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    console.log('New classroom data:', data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setOpen(false);
    toast({
      title: 'Classroom Added',
      description: `Classroom ${data.roomNumber} has been successfully added. (This is a simulation)`,
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
          className="flex h-auto flex-col items-center justify-center gap-2 p-4"
        >
            <Home className="h-6 w-6" />
            <span className="text-center text-sm">Add Classroom</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Classroom</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new classroom.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Number / Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., CR-101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 60" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Classroom
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
