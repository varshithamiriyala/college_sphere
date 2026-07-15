
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Check, Clock, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { initialLeaveRequests } from '@/lib/leave-data';
import { LeaveRequest, LeaveRequestStatus } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const statusConfig = {
    pending: { label: 'Pending', icon: Clock, className: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' },
    approved: { label: 'Approved', icon: Check, className: 'bg-green-500/20 text-green-700 border-green-500/30' },
    rejected: { label: 'Rejected', icon: X, className: 'bg-destructive/20 text-destructive border-destructive/30' },
};


export default function AdminLeaveDashboard() {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
    const { toast } = useToast();
    
    const handleUpdateRequest = (requestId: string, newStatus: LeaveRequestStatus) => {
        setLeaveRequests(prev => prev.map(req => 
            req.id === requestId ? { ...req, status: newStatus } : req
        ));
        toast({
            title: `Request ${newStatus}`,
            description: `The leave request has been successfully ${newStatus}.`
        })
    };
    
    const pendingRequests = leaveRequests.filter(r => r.status === 'pending');
    const processedRequests = leaveRequests.filter(r => r.status !== 'pending');
    

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
          <CalendarCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">Review and approve/reject leave requests from faculty.</p>
        </div>
      </div>

        <Card>
            <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>These requests are awaiting your review.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pendingRequests.length > 0 ? pendingRequests.map(request => (
                    <Card key={request.id} className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border">
                                    <AvatarImage src={request.facultyAvatar} alt={request.facultyName} />
                                    <AvatarFallback>{request.facultyName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{request.facultyName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {format(request.startDate, 'PPP')} - {format(request.endDate, 'PPP')}
                                    </p>
                                </div>
                            </div>
                             <div className="flex-1 max-w-lg">
                                <p className="text-sm text-muted-foreground italic">"{request.reason}"</p>
                            </div>
                            <div className="flex gap-2 self-end sm:self-center">
                                <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700" onClick={() => handleUpdateRequest(request.id, 'approved')}>
                                    <ThumbsUp className="mr-2 h-4 w-4" /> Approve
                                </Button>
                                 <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-100 hover:text-red-700" onClick={() => handleUpdateRequest(request.id, 'rejected')}>
                                    <ThumbsDown className="mr-2 h-4 w-4" /> Reject
                                </Button>
                            </div>
                        </div>
                    </Card>
                )) : (
                    <p className="text-center text-muted-foreground py-4">No pending leave requests.</p>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Processed Requests</CardTitle>
                <CardDescription>History of all approved and rejected requests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 {processedRequests.length > 0 ? processedRequests.map(request => {
                    const StatusIcon = statusConfig[request.status].icon;
                    return (
                        <Card key={request.id} className="p-4 bg-muted/50">
                             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarImage src={request.facultyAvatar} alt={request.facultyName} />
                                        <AvatarFallback>{request.facultyName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{request.facultyName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {format(request.startDate, 'PPP')} - {format(request.endDate, 'PPP')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-1 max-w-lg">
                                    <p className="text-sm text-muted-foreground italic">"{request.reason}"</p>
                                </div>
                                <Badge className={cn("self-end sm:self-center", statusConfig[request.status].className)}>
                                    <StatusIcon className="mr-2 h-4 w-4" />
                                    {statusConfig[request.status].label}
                                </Badge>
                            </div>
                        </Card>
                    )
                 }) : (
                     <p className="text-center text-muted-foreground py-4">No processed leave requests yet.</p>
                 )}
            </CardContent>
        </Card>

    </div>
  );
}
