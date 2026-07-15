
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
  TrendingUp,
  Activity,
  ArrowUpRight
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
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type UpcomingEvent = {
    type: 'class' | 'deadline' | 'event';
    title: string;
    time: string;
    batch?: string;
    subject?: string;
    location?: string;
    date: Date;
};

const chartData = [
  { name: 'CS-A', attendance: 85, performance: 78 },
  { name: 'CS-B', attendance: 88, performance: 82 },
  { name: 'EE-A', attendance: 76, performance: 70 },
  { name: 'ME-A', attendance: 92, performance: 88 },
  { name: 'EC-A', attendance: 81, performance: 75 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
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
      icon: <Users className="h-6 w-6 text-blue-500" />,
      items: facultyData.map(f => f.name),
      description: 'A list of all faculty members.',
      bg: 'from-blue-500/10 to-indigo-500/10',
      border: 'border-blue-500/20',
      percentage: '+4.2%'
    },
    {
      title: 'Total Subjects',
      value: uniqueSubjects.length,
      icon: <Book className="h-6 w-6 text-purple-500" />,
      items: uniqueSubjects,
      description: 'A list of all subjects offered.',
      bg: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-500/20',
      percentage: '+8.7%'
    },
    {
      title: 'Total Classrooms',
      value: uniqueClassrooms.length,
      icon: <Building className="h-6 w-6 text-emerald-500" />,
      items: uniqueClassrooms,
      description: 'A list of all available classrooms.',
      bg: 'from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-500/20',
      percentage: '+2.1%'
    },
  ];
  
  const allQuickActions = useMemo(() => [
    {
      label: 'Add Faculty',
      icon: PlusCircle,
      component: (
        <Button
          variant="ghost"
          className="flex w-full h-full flex-col items-center justify-center gap-2 p-6 transition-all hover:bg-[#E2A73E] hover:text-[#1B2A4A] rounded-none group"
          asChild
        >
          <Link href="/faculty">
            <PlusCircle className="h-6 w-6 text-[#1B2A4A] dark:text-[#E2A73E] group-hover:text-[#1B2A4A]" />
            <span className="mt-2 text-center text-xs font-bold font-mono uppercase text-[#1B2A4A] dark:text-foreground group-hover:text-[#1B2A4A]">Add Officer</span>
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
          variant="ghost"
          className="flex w-full h-full flex-col items-center justify-center gap-2 p-6 transition-all hover:bg-[#1B2A4A] hover:text-white rounded-none group"
          asChild
        >
          <Link href="/generate-timetable">
            <CalendarPlus className="h-6 w-6 text-[#E2A73E] group-hover:text-white" />
            <span className="mt-2 text-center text-xs font-bold font-mono uppercase text-[#1B2A4A] dark:text-foreground group-hover:text-white">Run Generator</span>
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
    <motion.div 
      className="space-y-8 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Title Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1B2A4A]/20 dark:border-border/30 pb-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-[#E2A73E] font-bold uppercase tracking-wider">[DIR.ADMIN.01]</span>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-[#1B2A4A] dark:text-foreground">Central Directory Hub</h1>
          <p className="text-xs text-[#5B6B82] tracking-wide font-mono">
            // Administrative overview of active academic configuration.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold px-2 py-1 rounded-[2px] bg-[#E2A73E]/10 text-[#E2A73E] border border-[#E2A73E]/30 w-fit uppercase">
          <Activity className="h-3 w-3 animate-pulse" /> System Active
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card, idx) => (
            <EntityListSheet 
                key={card.title}
                title={card.title}
                description={card.description}
                items={card.items}
            >
                <Card className="campus-card cursor-pointer group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-border/20">
                      <span className="text-[9px] font-mono font-bold text-muted-foreground uppercase">[SUM.{idx + 1}]</span>
                      <CardTitle className="text-sm font-bold font-display text-[#1B2A4A] dark:text-foreground">{card.title}</CardTitle>
                      <div className="text-[#1B2A4A] dark:text-muted-foreground">
                        {card.icon}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1 pt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold font-mono text-[#1B2A4A] dark:text-foreground">{card.value}</span>
                        <span className="text-[10px] font-mono text-[#E2A73E] font-bold flex items-center">{card.percentage} <ArrowUpRight className="h-3 w-3" /></span>
                      </div>
                      <p className="text-[10px] font-mono text-[#5B6B82] flex items-center gap-1 uppercase tracking-widest mt-2 group-hover:text-[#E2A73E] transition-colors">
                        &gt; Click to view details
                      </p>
                    </CardContent>
                </Card>
            </EntityListSheet>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2-Column: Quick Shortcuts + Chart */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Actions Shortcuts */}
          <motion.div variants={itemVariants}>
            <Card className="campus-card">
                <CardHeader className="border-b border-border/20 pb-4 relative">
                    <span className="absolute top-4 right-4 text-[9px] font-mono font-bold text-muted-foreground uppercase">[ACT.01]</span>
                    <CardTitle className="text-xl font-bold font-display">Actions Ledger</CardTitle>
                    <CardDescription className="text-xs font-mono">Configure schedules, faculties, and broadcast parameters.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-0 p-0 divide-x divide-y divide-border/20 border-b border-border/20">
                    {quickActions.map((action) => (
                        <div key={action.label} className="w-full h-full flex leading-normal">
                          {action.component}
                        </div>
                    ))}
                </CardContent>
            </Card>
          </motion.div>

          {/* Analytics Chart */}
          <motion.div variants={itemVariants}>
            <Card className="campus-card">
              <CardHeader className="border-b border-border/20 pb-4 relative">
                <span className="absolute top-4 right-4 text-[9px] font-mono font-bold text-muted-foreground uppercase">[STATS.02]</span>
                <CardTitle className="text-xl font-bold font-display flex items-center gap-2">
                  <TrendingUp className="text-[#1B2A4A] h-5 w-5 dark:text-foreground" />
                  Department Analytics
                </CardTitle>
                <CardDescription className="text-xs font-mono">Academic attendance and performance rating comparison.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[280px] w-full bg-[#FFFFFF]/50 dark:bg-[#10192B]/20 p-4 border border-border/10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="rgba(27, 42, 74, 0.08)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#5B6B82', fontSize: 10, fontFamily: 'monospace'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#5B6B82', fontSize: 10, fontFamily: 'monospace'}} />
                      <Tooltip contentStyle={{ borderRadius: '2px', border: '1px solid rgba(27, 42, 74, 0.2)', backgroundColor: '#fff', color: '#1B2A4A', fontFamily: 'monospace', fontSize: '12px' }} />
                      <Bar dataKey="attendance" fill="hsl(221, 46%, 20%)" radius={0} name="Attendance %" />
                      <Bar dataKey="performance" fill="hsl(38, 75%, 56%)" radius={0} name="Performance %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* Right 1-Column: Upcoming Events */}
        <motion.div variants={itemVariants} className="space-y-8">
          <Card className="campus-card h-full">
            <CardHeader className="border-b border-border/20 pb-4 relative">
              <span className="absolute top-4 right-4 text-[9px] font-mono font-bold text-[#E2A73E] uppercase">[SCHED.IDX]</span>
              <CardTitle className="text-xl font-bold font-display flex items-center gap-2">
                Upcoming Briefings
              </CardTitle>
              <CardDescription className="text-xs font-mono">A look at week's schedule & deadlines.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex gap-4 group items-start border-l-2 border-transparent hover:border-[#E2A73E] pl-2 transition-colors">
                    <div className="flex flex-col items-center justify-center rounded-[2px] bg-[#EEF2F6] dark:bg-[#10192B] border border-[#1B2A4A]/10 dark:border-border/30 p-2 text-center w-12 h-12 shrink-0">
                      <span className="text-[9px] font-bold font-mono text-[#5B6B82] uppercase tracking-widest leading-none">{format(event.date, 'MMM')}</span>
                      <span className="text-md font-black font-mono text-[#1B2A4A] dark:text-foreground leading-tight mt-0.5">{format(event.date, 'dd')}</span>
                    </div>
                    <div className="flex-1 space-y-1.5 pb-2 border-b border-border/20 last:border-0 group-hover:border-[#E2A73E]/20 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-bold text-sm font-sans leading-snug group-hover:text-[#E2A73E] transition-colors">{event.title}</p>
                        <span className="text-[10px] font-mono text-[#5B6B82] shrink-0 font-bold">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                          {event.type === 'class' && event.batch && (
                              <Badge className="bg-[#1B2A4A]/5 text-[#1B2A4A] dark:text-white border border-[#1B2A4A]/20 dark:border-border rounded-[2px] px-1.5 py-0 font-mono text-[9px]">[B:{event.batch}]</Badge>
                          )}
                          {event.type === 'deadline' && event.subject && (
                              <Badge className="bg-[#C1442E]/10 text-[#C1442E] border border-[#C1442E]/20 rounded-[2px] px-1.5 py-0 font-mono text-[9px] uppercase">[DUE:{event.subject}]</Badge>
                          )}
                          {event.type === 'event' && event.location && (
                              <Badge variant="outline" className="text-[#5B6B82] border-border rounded-[2px] px-1.5 py-0 font-mono text-[9px] uppercase">[LOC:{event.location}]</Badge>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  );
}
