
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Users, UserCheck, UserPlus, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

type Event = {
  id: number;
  name: string;
};

type ApplicationStatus = 'pending' | 'approved' | 'rejected';

type CoordinatorApplication = {
    id: number;
    studentName: string;
    studentAvatar: string;
    reason: string;
    status: ApplicationStatus;
};

const interestedStudents = [
    { id: 1, name: 'Student A', avatar: 'https://picsum.photos/seed/studentA/100' },
    { id: 2, name: 'Student B', avatar: 'https://picsum.photos/seed/studentB/100' },
    { id: 3, name: 'Student C', avatar: 'https://picsum.photos/seed/studentC/100' },
];

const initialCoordinatorApps: CoordinatorApplication[] = [
    { id: 1, studentName: 'Coordinator One', studentAvatar: 'https://picsum.photos/seed/coord1/100', reason: 'I have prior experience managing fests.', status: 'pending' },
    { id: 2, studentName: 'Coordinator Two', studentAvatar: 'https://picsum.photos/seed/coord2/100', reason: 'I am passionate about this topic and very organized.', status: 'pending' },
    { id: 3, studentName: 'Coordinator Three', studentAvatar: 'https://picsum.photos/seed/coord3/100', reason: 'I led a similar event last year successfully.', status: 'approved' },
];

export function ManageParticipantsDialog({ event }: { event: Event }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [applications, setApplications] = useState<CoordinatorApplication[]>(initialCoordinatorApps);

  const handleApplication = (appId: number, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(app => 
        app.id === appId ? { ...app, status: newStatus } : app
    ));
    toast({
        title: `Application ${newStatus}`,
        description: 'The student has been notified.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Manage Participants
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Participants for "{event.name}"</DialogTitle>
          <DialogDescription>
            Review coordinator applications and see interested students.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-h-[60vh] overflow-y-auto">
            {/* Coordinator Applications */}
            <div className='space-y-4'>
                <h3 className="font-semibold flex items-center gap-2"><UserCheck className="h-5 w-5 text-primary"/> Coordinator Applications</h3>
                <div className='space-y-3'>
                    {applications.map(app => (
                        <div key={app.id} className="p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={app.studentAvatar} />
                                    <AvatarFallback>{app.studentName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{app.studentName}</p>
                                    <p className="text-xs text-muted-foreground italic">"{app.reason}"</p>
                                </div>
                            </div>
                             {app.status === 'pending' ? (
                                <div className="flex gap-2 justify-end mt-2">
                                    <Button size="xs" variant="outline" className="text-green-600 border-green-500 hover:bg-green-100" onClick={() => handleApplication(app.id, 'approved')}>
                                        <ThumbsUp className="mr-1 h-3 w-3" /> Approve
                                    </Button>
                                    <Button size="xs" variant="outline" className="text-red-600 border-red-500 hover:bg-red-100" onClick={() => handleApplication(app.id, 'rejected')}>
                                        <ThumbsDown className="mr-1 h-3 w-3" /> Reject
                                    </Button>
                                </div>
                            ) : (
                                <p className={`mt-2 text-xs font-semibold text-right ${app.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Interested Students */}
            <div className='space-y-4'>
                 <h3 className="font-semibold flex items-center gap-2"><UserPlus className="h-5 w-5 text-primary"/> Interested Students</h3>
                  <div className='space-y-2'>
                    {interestedStudents.map(student => (
                        <div key={student.id} className="flex items-center gap-3 p-2 border rounded-md">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                             <p className="font-medium text-sm">{student.name}</p>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
