
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
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Bell, Loader2, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const FormSchema = z.object({
  recipient: z.string().min(1, 'Please select a recipient group.'),
  subject: z.string().min(3, 'Subject must be at least 3 characters long.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

type FormValues = z.infer<typeof FormSchema>;

export function SendNotification() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recipient: 'all',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    console.log('Notification data:', data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setOpen(false);
    toast({
      title: 'Notification Sent',
      description: `Your message has been sent to ${data.recipient}. (This is a simulation)`,
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
          <Bell className="h-8 w-8 text-yellow-500" />
          <span className="mt-2 text-sm font-medium text-muted-foreground">Send Notification</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send a Notification</DialogTitle>
          <DialogDescription>
            Compose and send a notification to faculty members.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Faculty</SelectItem>
                      <SelectItem value="cs-dept">Computer Science Dept</SelectItem>
                      <SelectItem value="ee-dept">Electrical Dept</SelectItem>
                      <SelectItem value="me-dept">Mechanical Dept</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Upcoming Holiday" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Compose your message here..." {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Send Notification
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
