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
  ClipboardList,
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

export default function DashboardPage() {
  const totalFaculty = facultyData.length;
  const totalSubjects = new Set(sampleTimetable.map(item => item.subject)).size;
  const totalClassrooms = new Set(sampleTimetable.map(item => item.room)).size;
  const todaysClasses = sampleTimetable.filter(
    item => item.day === 'Monday'
  ).length; // Simulating 'Today' is Monday

  const summaryCards = [
    {
      title: 'Total Faculty',
      value: totalFaculty,
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: 'Total Subjects',
      value: totalSubjects,
      icon: <Book className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: 'Total Classrooms',
      value: totalClassrooms,
      icon: <Building className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Today's Classes",
      value: todaysClasses,
      icon: <ClipboardList className="h-6 w-6 text-muted-foreground" />,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      description: 'Dr. Evelyn Reed updated her profile.',
      time: '2 hours ago',
    },
    {
      id: 2,
      description: 'New timetable generated for CS department.',
      time: '5 hours ago',
    },
    {
      id: 3,
      description: 'Dr. Samuel Green is on leave today.',
      time: '1 day ago',
    },
    {
      id: 4,
      description:
        'Maintenance scheduled for LB-301 on Wednesday morning.',
      time: '2 days ago',
    },
  ];

  const quickActions = [
    {
      label: 'Add Faculty',
      icon: PlusCircle,
      href: '/faculty',
      component: (
        <Button
          variant="outline"
          className="flex h-auto flex-col items-center justify-center gap-2 p-4"
          asChild
        >
          <Link href="/faculty">
            <PlusCircle className="h-6 w-6" />
            <span className="text-center text-sm">Add Faculty</span>
          </Link>
        </Button>
      ),
    },
    {
      label: 'Add Subject',
      icon: BookPlus,
      href: '#',
      component: <AddSubject />,
    },
    {
      label: 'Add Classroom',
      icon: Home,
      href: '#',
      component: <AddClassroom />,
    },
    {
      label: 'Add Batch',
      icon: Users2,
      href: '#',
      component: <AddBatch />,
    },
    {
      label: 'Upload Data',
      icon: Upload,
      href: '#',
      component: (
         <Button
          variant="outline"
          className="flex h-auto flex-col items-center justify-center gap-2 p-4"
          asChild
        >
          <Link href="#">
            <Upload className="h-6 w-6" />
            <span className="text-center text-sm">Upload Data</span>
          </Link>
        </Button>
      ),
    },
    {
      label: 'Generate Timetable',
      icon: CalendarPlus,
      href: '/generate-timetable',
       component: (
         <Button
          variant="outline"
          className="flex h-auto flex-col items-center justify-center gap-2 p-4"
          asChild
        >
          <Link href="/generate-timetable">
            <CalendarPlus className="h-6 w-6" />
            <span className="text-center text-sm">Generate Timetable</span>
          </Link>
        </Button>
      ),
    },
    {
      label: 'Schedule Fixed Class',
      icon: CalendarClock,
      href: '#',
       component: (
         <Button
          variant="outline"
          className="flex h-auto flex-col items-center justify-center gap-2 p-4"
          asChild
        >
          <Link href="#">
            <CalendarClock className="h-6 w-6" />
            <span className="text-center text-sm">Schedule Fixed Class</span>
          </Link>
        </Button>
      ),
    },
    {
      label: 'Send Notification',
      icon: Bell,
      href: '#',
       component: (
         <Button
          variant="outline"
          className="flex h-auto flex-col items-center justify-center gap-2 p-4"
          asChild
        >
          <Link href="#">
            <Bell className="h-6 w-6" />
            <span className="text-center text-sm">Send Notification</span>
          </Link>
        </Button>
      ),
    },
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
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Shortcuts for common tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2">
             {quickActions.map((action) => (
              <div key={action.label}>
                {action.component}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and changes in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map(activity => (
                <li key={activity.id} className="flex items-start gap-4">
                  <div className="mt-1.5 flex h-2 w-2 items-center">
                    <span className="relative flex h-2 w-2 rounded-full bg-primary"></span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
