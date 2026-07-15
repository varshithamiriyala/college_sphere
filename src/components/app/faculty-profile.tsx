'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { Faculty } from '@/lib/types';
import { Separator } from '../ui/separator';
import { parse, format } from 'date-fns';

interface FacultyProfileProps {
  faculty: Faculty;
  children: React.ReactNode;
}

const formatTime = (time: string) => {
  try {
    const parsedTime = parse(time, 'HH:mm', new Date());
    return format(parsedTime, 'hh:mm a');
  } catch (error) {
    return time; // Fallback to original string if parsing fails
  }
};


export function FacultyProfile({ faculty, children }: FacultyProfileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border">
              <AvatarImage src={faculty.avatar} alt={faculty.name} data-ai-hint="person portrait" />
              <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-2xl">{faculty.name}</SheetTitle>
              <SheetDescription>
                {faculty.title}, {faculty.department}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <Separator />
          
          <div>
            <h4 className="mb-2 font-semibold">Working Hours</h4>
            <p className="text-sm text-muted-foreground">
              {formatTime(faculty.workingHours.start)} - {formatTime(faculty.workingHours.end)}
            </p>
          </div>
          
          <div>
            <h4 className="mb-2 font-semibold">Leave Calendar</h4>
            <div className="rounded-md border">
              <Calendar
                mode="multiple"
                selected={faculty.leaveDates}
                classNames={{
                    month: "space-y-4 p-3",
                }}
                disabled
              />
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Submission Status</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Marks</span>
                  <span className="font-mono">{faculty.submissions.marks}%</span>
                </div>
                <Progress value={faculty.submissions.marks} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Assignments</span>
                  <span className="font-mono">{faculty.submissions.assignments}%</span>
                </div>
                <Progress value={faculty.submissions.assignments} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Attendance</span>
                  <span className="font-mono">{faculty.submissions.attendance}%</span>
                </div>
                <Progress value={faculty.submissions.attendance} />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
