
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
  ClipboardCheck,
  AlertTriangle,
  UsersRound,
} from 'lucide-react';
import { facultyData, sampleTimetable } from '@/lib/data';
import Link from 'next/link';
import { AddSubject } from '@/components/app/add-subject';
import { AddClassroom } from '@/components/app/add-classroom';
import { AddBatch } from '@/components/app/add-batch';
import { UploadData } from '@/components/app/upload-data';
import { ScheduleFixedClass } from '@/components/app/schedule-fixed-class';
import { SendNotification } from '@/components/app/send-notification';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { addDays, format, getDay } from 'date-fns';
import { EntityListSheet } from '@/components/app/entity-list-sheet';

const studentData = [
    { name: 'CS-A', count: 60 },
    { name: 'CS-B', count: 62 },
    { name: 'EE-A', count: 55 },
    { name: 'ME-A', count: 65 },
];
const totalStudents = studentData.reduce((sum, batch) => sum + batch.count, 0);

const generateTrendData = (base: number) => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      value: base + Math.floor(Math.random() * (base * 0.1)) - (base * 0.05),
    }));
};

const upcomingEvents = [
    { type: 'class', title: 'Data Structures', time: '10:00 AM', batch: 'CS-A', date: new Date() },
    { type: 'deadline', title: 'Assignment 1 Submission', time: '11:59 PM', subject: 'Algorithms', date: addDays(new Date(), 2) },
    { type: 'event', title: 'Faculty Meeting', time: '04:00 PM', location: 'Conference Hall', date: addDays(new Date(), 3) },
    { type: 'class', title: 'Circuit Theory', time: '02:00 PM', batch: 'EE-A', date: new Date() },
    { type: 'deadline', title: 'Lab Report Submission', time: '11:59 PM', subject: 'Data Structures', date: addDays(new Date(), 5) },
];


export default function DashboardPage() {
  const totalFaculty = facultyData.length;
  const uniqueSubjects = [...new Set(sampleTimetable.map(item => item.subject))];
  const uniqueClassrooms = [...new Set(sampleTimetable.map(item => item.room))];
  const classesToday = sampleTimetable.filter(item => getDay(new Date()) === (['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(item.day))).length;

  const summaryCards = [
    {
      title: 'Total Faculty',
      value: totalFaculty,
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
      data: generateTrendData(totalFaculty),
      items: facultyData.map(f => f.name)
    },
    {
      title: 'Total Subjects',
      value: uniqueSubjects.length,
      icon: <Book className="h-6 w-6 text-muted-foreground" />,
      data: generateTrendData(uniqueSubjects.length),
      items: uniqueSubjects
    },
    {
      title: 'Total Classrooms',
      value: uniqueClassrooms.length,
      icon: <Building className="h-6 w-6 text-muted-foreground" />,
      data: generateTrendData(uniqueClassrooms.length),
      items: uniqueClassrooms
    },
    {
      title: 'Total Students',
      value: totalStudents,
      icon: <UsersRound className="h-6 w-6 text-muted-foreground" />,
      data: generateTrendData(totalStudents),
      items: studentData.map(s => `${s.name} (${s.count})`)
    },
  ];

  const quickActions = [
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
            <PlusCircle className="h-8 w-8" />
            <span className="mt-2 text-center text-sm font-medium">Add Faculty</span>
          </Link>
        </Button>
      ),
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
            <CalendarPlus className="h-8 w-8" />
            <span className="mt-2 text-center text-sm font-medium">Generate Timetable</span>
          </Link>
        </Button>
      ),
    },
    { label: 'Schedule Fixed Class', icon: CalendarClock, component: <ScheduleFixedClass /> },
    { label: 'Send Notification', icon: Bell, component: <SendNotification /> },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a summary of your institution.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map(card => (
          <EntityListSheet
            key={card.title}
            title={card.title}
            description={`A list of all ${card.title.toLowerCase()} in the system.`}
            items={card.items}
          >
            <Card className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                {card.icon}
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={card.data}
                            margin={{ top: 15, right: 0, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id={`color-${card.title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Tooltip
                                cursor={false}
                                contentStyle={{ display: 'none' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill={`url(#color-${card.title.replace(/\s+/g, '')})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                </CardContent>
            </Card>
          </EntityListSheet>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Stats & Actions */}
        <div className="space-y-6 lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Card className="flex flex-col items-center justify-center p-4">
                        <AlertTriangle className="h-8 w-8 text-yellow-500" />
                        <p className="mt-2 text-2xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">Conflicts</p>
                    </Card>
                    <Card className="flex flex-col items-center justify-center p-4">
                        <CalendarClock className="h-8 w-8 text-blue-500" />
                        <p className="mt-2 text-2xl font-bold">{classesToday}</p>
                        <p className="text-sm text-muted-foreground">Classes Today</p>
                    </Card>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Shortcuts for common tasks.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    {quickActions.map((action) => (
                        <div key={action.label}>{action.component}</div>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
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
                        {event.type === 'class' && (
                            <>
                                <Badge variant="secondary">{event.batch}</Badge>
                            </>
                        )}
                        {event.type === 'deadline' && <Badge variant="destructive">{event.subject}</Badge>}
                        {event.type === 'event' && <Badge variant="outline">{event.location}</Badge>}
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
