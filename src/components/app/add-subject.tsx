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
import { BookPlus, Loader2 } from 'lucide-react';

const FormSchema = z.object({
  name: z.string().min(2, 'Subject name must be at least 2 characters.'),
  code: z.string().min(2, 'Subject code must be at least 2 characters.'),
});

type FormValues = z.infer<typeof FormSchema>;

export function AddSubject() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      code: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    console.log('New subject data:', data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setOpen(false);
    toast({
      title: 'Subject Added',
      description: `${data.name} has been successfully added. (This is a simulation)`,
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
            className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center transition-all hover:shadow-md hover:-translate-y-1"
          >
            <BookPlus className="h-8 w-8 text-chart-2" />
            <span className="mt-2 text-sm font-medium text-muted-foreground">Add Subject</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new subject.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Data Structures" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., CS-201" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Subject
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
