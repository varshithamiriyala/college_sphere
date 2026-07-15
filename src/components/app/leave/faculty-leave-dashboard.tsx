
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarCheck, CalendarPlus, Check, Clock, X } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { initialLeaveRequests } from '@/lib/leave-data';
import { LeaveRequest } from '@/lib/types';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

const LeaveRequestSchema = z.object({
  reason: z.string().min(10, 'Please provide a reason for your leave (min. 10 characters).'),
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).refine(data => data.from, 'Please select a start and end date for your leave.'),
});

type LeaveRequestFormValues = z.infer<typeof LeaveRequestSchema>;

const statusConfig = {
    pending: { label: 'Pending', icon: Clock, className: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' },
    approved: { label: 'Approved', icon: Check, className: 'bg-green-500/20 text-green-700 border-green-500/30' },
    rejected: { label: 'Rejected', icon: X, className: 'bg-destructive/20 text-destructive border-destructive/30' },
};

export default function FacultyLeaveDashboard() {
  const { user } = useUser();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() =>
    initialLeaveRequests.filter(req => req.facultyId === user?.id || req.facultyId === '1' ) // default to user 1 for demo
  );
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const { toast } = useToast();

  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(LeaveRequestSchema),
    defaultValues: { reason: '' },
  });

  const onSubmit = (data: LeaveRequestFormValues) => {
    if (!data.dateRange.from || !user) return;
    
    const newRequest: LeaveRequest = {
      id: String(Date.now()),
      facultyId: user.id,
      facultyName: user.name,
      facultyAvatar: user.avatarUrl,
      startDate: data.dateRange.from,
      endDate: data.dateRange.to || data.dateRange.from,
      reason: data.reason,
      status: 'pending',
    };
    
    setLeaveRequests(prev => [newRequest, ...prev]);
    toast({
      title: 'Leave Request Submitted',
      description: 'Your request has been sent for admin approval.',
    });
    form.reset();
    setDate(undefined);
  };
  
  const handleDateChange = (newDate: DateRange | undefined) => {
      setDate(newDate);
      form.setValue('dateRange', { from: newDate?.from, to: newDate?.to });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
          <CalendarCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">Request leave and track the status of your requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Request New Leave</CardTitle>
                <CardDescription>Select a date or date range and provide a reason for your absence.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <FormLabel>Leave Dates</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="dateRange"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                     <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !date && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarPlus className="mr-2 h-4 w-4" />
                                                            {date?.from ? (
                                                                date.to ? (
                                                                    <>
                                                                        {format(date.from, "LLL dd, y")} -{" "}
                                                                        {format(date.to, "LLL dd, y")}
                                                                    </>
                                                                ) : (
                                                                    format(date.from, "LLL dd, y")
                                                                )
                                                            ) : (
                                                                <span>Pick a date range</span>
                                                            )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        initialFocus
                                                        mode="range"
                                                        defaultMonth={date?.from}
                                                        selected={date}
                                                        onSelect={handleDateChange}
                                                        numberOfMonths={2}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                             </div>
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                <FormItem className="h-full flex flex-col">
                                    <FormLabel>Reason for Leave</FormLabel>
                                    <FormControl className="flex-1">
                                        <Textarea placeholder="e.g., Attending a family function, personal appointment..." className="h-full resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Submit Request</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>My Requests</CardTitle>
                <CardDescription>A history of your leave requests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {leaveRequests.length > 0 ? leaveRequests.map(request => {
                    const StatusIcon = statusConfig[request.status].icon;
                    return(
                        <div key={request.id} className="p-3 rounded-md border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-semibold">
                                        {format(request.startDate, 'MMM dd, yyyy')} - {format(request.endDate, 'MMM dd, yyyy')}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{request.reason}</p>
                                </div>
                                <Badge className={statusConfig[request.status].className}>
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {statusConfig[request.status].label}
                                </Badge>
                            </div>
                        </div>
                    )
                }) : (
                    <p className="text-sm text-muted-foreground italic text-center py-4">You have not made any leave requests.</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
