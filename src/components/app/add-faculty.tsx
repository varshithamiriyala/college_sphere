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
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const FormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  department: z.string().min(2, 'Department must be at least 2 characters.'),
  avatar: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function AddFaculty() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      title: '',
      department: '',
      avatar: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        form.setValue('avatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    // Here you would typically send the data to your backend/API
    console.log('New faculty data:', data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setOpen(false);
    toast({
      title: 'Faculty Added',
      description: `${data.name} has been successfully added. (This is a simulation)`,
    });
    form.reset();
    setPreview(null);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        form.reset();
        setPreview(null);
      }
      setOpen(isOpen);
    }}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Faculty
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Faculty</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new faculty member.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center relative">
                {preview ? (
                  <Image src={preview} alt="Avatar preview" layout="fill" className="rounded-full object-cover" />
                ) : (
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                Upload Image
              </Button>
              <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/gif"
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dr. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Professor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Faculty Member
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
