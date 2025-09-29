
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    BrainCircuit, GanttChart, BarChart3, Users, MessageSquare, Settings, 
    GraduationCap, BookCopy, PenSquare, Timer, GitGraph, Briefcase, Key, 
    HelpCircle, Trophy, Code2, Search, BriefcaseBusiness, Repeat, SearchX, 
    Group, Star, CalendarCheck, CheckSquare, LineChart, NotebookText, Edit, 
    Share2, CalendarSync, QrCode, CreditCard, Building2, Bell, UserPlus, 
    Presentation, FileText, LifeBuoy, Lightbulb 
} from 'lucide-react';

const adminFeatures = [
  {
    title: 'AI-Powered Timetable Generation',
    description: 'Leverages AI to automatically generate multiple, conflict-free timetable options based on your unique constraints.',
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Central Hub Dashboard',
    description: 'Get an at-a-glance overview of key metrics, access shortcuts for common tasks, and see upcoming events.',
    icon: <GanttChart className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Workload & Leave Analytics',
    description: 'Visualize faculty workload, leave trends, and submission compliance rates for data-driven decision-making.',
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Faculty & Student Management',
    description: 'Browse directories, manage detailed profiles, and oversee user roles and information.',
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Admission & Enrollment',
    description: 'Manage new student admissions, batch allocations, and course enrollments from a centralized interface.',
    icon: <UserPlus className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Financial Tracking',
    description: 'Record and monitor student fee payments, track due dates, and generate financial reports.',
    icon: <CreditCard className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Resource Management',
    description: 'Track the availability and status of classrooms, labs, and equipment across the institution.',
    icon: <Building2 className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Event & Workshop Management',
    description: 'Schedule, announce, and manage participants for institutional events, including coordinator approvals.',
    icon: <Presentation className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Notifications & Alerts',
    description: 'Send targeted announcements and alerts to specific departments or all users.',
    icon: <Bell className="h-8 w-8 text-primary" />,
  },
];

const facultyFeatures = [
    {
        title: 'Assignment & Grading Management',
        description: 'Create, assign, and grade assignments with automatic tracking of submission deadlines.',
        icon: <Edit className="h-8 w-8 text-primary" />
    },
    {
        title: 'Digital Attendance Tracker',
        description: 'Mark attendance digitally using a unique, time-sensitive QR code for each class session.',
        icon: <CheckSquare className="h-8 w-8 text-primary" />
    },
    {
        title: 'Student Performance Analytics',
        description: 'View visual dashboards showing student performance, subject mastery, and topic-specific weak areas.',
        icon: <LineChart className="h-8 w-8 text-primary" />
    },
    {
        title: 'Lecture Notes & Materials',
        description: 'Upload PDFs, slides, and other course materials for students to access anytime.',
        icon: <NotebookText className="h-8 w-8 text-primary" />
    },
    {
        title: 'Anonymous Student Feedback',
        description: 'Receive and review anonymous feedback from students on lecture clarity and teaching quality.',
        icon: <MessageSquare className="h-8 w-8 text-primary" />
    },
    {
        title: 'Peer Collaboration',
        description: 'Initiate and collaborate with other faculty members on course content, research, and events.',
        icon: <Share2 className="h-8 w-8 text-primary" />
    },
    {
        title: 'Personal Calendar Integration',
        description: 'Sync your teaching schedule, deadlines, and events with your personal Google or Outlook calendar.',
        icon: <CalendarSync className="h-8 w-8 text-primary" />
    },
     {
        title: 'Real-time Chat',
        description: 'Communicate instantly with other faculty members and administrators to coordinate academic matters.',
        icon: <MessageSquare className="h-8 w-8 text-primary" />
    },
];

const studentFeatures = [
    {
        title: 'AI-Powered Study Suite',
        description: 'Includes a Doubt Assistant, Text Summarizer, Diagram Generator, and Question Bank Creator to enhance learning.',
        icon: <BrainCircuit className="h-8 w-8 text-primary" />
    },
    {
        title: 'Personalized Student Hub',
        description: 'Your dashboard to track study progress, view your daily roadmap, and see gamified learning streaks.',
        icon: <GraduationCap className="h-8 w-8 text-primary" />
    },
    {
        title: 'Career & Placement Toolkit',
        description: 'AI-driven tools including a Career Advisor, Resume Builder, Resume Analyzer, and Interview Prep coach.',
        icon: <BriefcaseBusiness className="h-8 w-8 text-primary" />
    },
    {
        title: 'Aptitude & Coding Practice',
        description: 'Sharpen your skills with practice aptitude tests and a curated set of coding challenges.',
        icon: <Code2 className="h-8 w-8 text-primary" />
    },
    {
        title: 'Digital Attendance Scanning',
        description: 'Use your device\'s camera to scan a QR code from your faculty to mark your attendance in real-time.',
        icon: <QrCode className="h-8 w-8 text-primary" />
    },
    {
        title: 'Community & Mentorship',
        description: 'Connect with peers through study groups, a barter system, and a mentorship program with alumni.',
        icon: <Users className="h-8 w-8 text-primary" />
    },
    {
        title: 'Subject & Roadmap Organizer',
        description: 'Create digital notebooks for your subjects and build a day-by-day study plan to stay on track.',
        icon: <BookCopy className="h-8 w-8 text-primary" />
    },
    {
        title: 'Productivity Tools',
        description: 'Includes a Pomodoro Timer to help you focus during study sessions and manage your time effectively.',
        icon: <Timer className="h-8 w-8 text-primary" />
    },
];

const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => (
    <Card className="flex flex-col">
        <CardHeader>
            <div className="flex items-center gap-4">
                {icon}
                <CardTitle className="text-xl capitalize">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex-1">
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);


export default function FeaturesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Application Features</h1>
        <p className="text-muted-foreground">A detailed look at the capabilities of College Sphere, tailored for each role.</p>
      </div>

      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
        </TabsList>
        <TabsContent value="admin" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Administrator Features</CardTitle>
                    <CardDescription>Tools designed to streamline institutional management and oversight.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {adminFeatures.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="faculty" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Faculty Features</CardTitle>
                    <CardDescription>Tools to enhance teaching, collaboration, and administrative efficiency.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {facultyFeatures.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="student" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle>Student Features</CardTitle>
                    <CardDescription>A suite of AI-powered tools for learning, career prep, and community engagement.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {studentFeatures.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
