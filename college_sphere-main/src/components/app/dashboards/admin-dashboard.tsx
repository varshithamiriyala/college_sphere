
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Book,
  Building,
  PlusCircle,
  Upload,
  CalendarPlus,
  Bell,
  BookPlus,
  Home,
  Users2,
  CalendarClock,
} from 'lucide-react';
import { facultyData, sampleTimetable } from '@/lib/data';
import Link from 'next/link';
import { AddSubject } from '@/components/app/add-subject';
import { AddClassroom } from '@/components/app/add-classroom';
import { AddBatch } from '@/components/app/add-batch';
import { UploadData } from '@/components/app/upload-data';
import { ScheduleFixedClass } from '@/components/app/schedule-fixed-class';
import { SendNotification } from '@/components/app/send-notification';
import { Badge } from '@/components/ui/badge';
import { addDays, format } from 'date-fns';
import { EntityListSheet } from '@/components/app/entity-list-sheet';
import { useUser } from '@/hooks/use-user';
import { useMemo, useState, useEffect } from 'react';

type UpcomingEvent = {
    type: 'class' | 'deadline' | 'event';
    title: string;
    time: string;
    batch?: string;
    subject?: string;
    location?: string;
    date: Date;
};

export default function AdminDashboard() {
  const { user } = useUser();
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);

  useEffect(() => {
    // Moved data that uses `new Date()` into useEffect to avoid hydration mismatches.
    const events: UpcomingEvent[] = [
        { type: 'class', title: 'Data Structures', time: '10:00 AM', batch: 'CS-A', date: new Date() },
        { type: 'deadline', title: 'Assignment 1 Submission', time: '11:59 PM', subject: 'Algorithms', date: addDays(new Date(), 2) },
        { type: 'event', title: 'Faculty Meeting', time: '04:00 PM', location: 'Conference Hall', date: addDays(new Date(), 3) },
        { type: 'class', title: 'Circuit Theory', time: '02:00 PM', batch: 'EE-A', date: new Date() },
        { type: 'deadline', title: 'Lab Report Submission', time: '11:59 PM', subject: 'Data Structures', date: addDays(new Date(), 5) },
    ];
    setUpcomingEvents(events);
  }, []);

  const totalFaculty = facultyData.length;
  const uniqueSubjects = [...new Set(sampleTimetable.map(item => item.subject))];
  const uniqueClassrooms = [...new Set(sampleTimetable.map(item => item.room))];

  const summaryCards = [
    {
      title: 'Total Faculty',
      value: totalFaculty,
      icon: <Users className="h-6 w-6 text-chart-1" />,
      items: facultyData.map(f => f.name),
      description: 'A list of all faculty members.',
    },
    {
      title: 'Total Subjects',
      value: uniqueSubjects.length,
      icon: <Book className="h-6 w-6 text-chart-2" />,
      items: uniqueSubjects,
      description: 'A list of all subjects offered.',
    },
    {
      title: 'Total Classrooms',
      value: uniqueClassrooms.length,
      icon: <Building className="h-6 w-6 text-chart-3" />,
      items: uniqueClassrooms,
      description: 'A list of all available classrooms.',
    },
  ];
  
  const allQuickActions = useMemo(() => [
    {
      label: 'Add Faculty',
      icon: PlusCircle,
      component: (
        <Button
          variant="outline"
          className="flex h-full flex-col items-center justify-center gap-2 p-4 transition-all hover:shadow-md hover:-translate-y-1"
          asChild
        >
          <Link href="/faculty">
            <PlusCircle className="h-8 w-8 text-primary" />
            <span className="mt-2 text-center text-sm font-medium text-primary">Add Faculty</span>
          </Link>
        </Button>
      ),
      adminOnly: true,
    },
    { label: 'Add Subject', icon: BookPlus, component: <AddSubject /> },
    { label: 'Add Classroom', icon: Home, component: <AddClassroom /> },
    { label: 'Add Batch', icon: Users2, component: <AddBatch /> },
    { label: 'Upload Data', icon: Upload, component: <UploadData /> },
    {
      label: 'Generate Timetable',
      icon: CalendarPlus,
      component: (
         <Button
          variant="outline"
          className="flex h-full flex-col items-center justify-center gap-2 p-4 transition-all hover:shadow-md hover:-translate-y-1"
          asChild
        >
          <Link href="/generate-timetable">
            <CalendarPlus className="h-8 w-8 text-accent" />
            <span className="mt-2 text-center text-sm font-medium text-accent">Generate Timetable</span>
          </Link>
        </Button>
      ),
    },
    { label: 'Schedule Fixed Class', icon: CalendarClock, component: <ScheduleFixedClass /> },
    { label: 'Send Notification', icon: Bell, component: <SendNotification />, adminOnly: true },
  ], []);

  const quickActions = useMemo(() => {
    if (user?.role === 'admin') {
      return allQuickActions;
    }
    return allQuickActions.filter(action => !action.adminOnly);
  }, [user, allQuickActions]);


  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Central Hub</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a high-level overview of your institution.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map(card => (
            <EntityListSheet 
                key={card.title}
                title={card.title}
                description={card.description}
                items={card.items}
            >
                <Card className="transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    {card.icon}
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">
                        Click to view details
                    </p>
                    </CardContent>
                </Card>
            </EntityListSheet>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6">
        {/* Quick Actions */}
        <Card>
            <CardHeader>
                <CardTitle>Admin Shortcuts</CardTitle>
                <CardDescription>Shortcuts for common tasks.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {quickActions.map((action) => (
                    <div key={action.label}>{action.component}</div>
                ))}
            </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>A look at the week ahead.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center rounded-md bg-muted p-2 text-center w-14">
                    <span className="text-xs font-semibold uppercase">{format(event.date, 'MMM')}</span>
                    <span className="text-lg font-bold">{format(event.date, 'dd')}</span>
                  </div>
                  <div className="flex-1 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                        {event.type === 'class' && event.batch && (
                            <>
                                <Badge variant="secondary">{event.batch}</Badge>
                            </>
                        )}
                        {event.type === 'deadline' && event.subject && <Badge variant="destructive">{event.subject}</Badge>}
                        {event.type === 'event' && event.location && <Badge variant="outline">{event.location}</Badge>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
