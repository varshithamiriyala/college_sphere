
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, GanttChart, BarChart3, Users, MessageSquare, Settings } from 'lucide-react';

const features = [
  {
    title: 'AI-Powered Timetable Generation',
    description: 'At its core, the application uses a powerful AI to automatically generate multiple, conflict-free timetable options. Users can input a wide range of data—including classrooms, student batches, subjects, and faculty—along with specific constraints like college hours, break times, and faculty-subject mappings. The AI processes this information to produce several complete, optimized schedules, which are presented in easy-to-compare tabs.',
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Comprehensive Dashboard',
    description: 'The dashboard serves as the central hub, providing an at-a-glance overview of the institution\'s key metrics. It features summary cards for tracking the total number of faculty, subjects, and classrooms. A "Quick Actions" section offers shortcuts to common tasks like adding new faculty or generating a timetable, while an "Upcoming Events" panel keeps administrators informed of the day\'s and week\'s schedule.',
    icon: <GanttChart className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Master Timetable Grid',
    description: 'This feature offers a complete, interactive view of the master timetable. The grid is organized by days (including Saturday) and time slots, with each class session displayed as a distinct card containing all relevant details. It also includes an "AI Suggestion Tool" that allows users to describe scheduling conflicts and receive intelligent, actionable recommendations for resolving them.',
    icon: <GanttChart className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Detailed Analytics',
    description: 'The analytics page provides deep insights into institutional efficiency. It features a suite of charts and graphs that visualize key data points, such as faculty workload distribution, leave trends over time, and submission compliance rates for assignments and attendance, allowing for data-driven decision-making.',
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Faculty & Profile Management',
    description: 'The app includes dedicated sections for managing faculty information. You can browse a directory of all faculty members, view their detailed profiles—including working hours and submission statuses—and add new members. The user profile page allows individuals to manage their own qualifications and submit documents like attendance records or exam scores.',
    icon: <Users className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Interactive Chat',
    description: 'A built-in chat feature facilitates real-time communication between faculty and administrators. Users can select a colleague from a list, view their online status, and engage in conversations, making it easy to coordinate and collaborate on academic matters.',
    icon: <MessageSquare className="h-10 w-10 text-primary" />
  },
  {
    title: 'Customization and Settings',
    description: 'The application is highly customizable. The settings page includes a theme customizer that allows users to switch between different color palettes to personalize the application\'s appearance. It also provides options for managing profile information and setting preferences for email notifications.',
    icon: <Settings className="h-10 w-10 text-primary" />
  }
];

export default function FeaturesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Application Features</h1>
        <p className="text-muted-foreground">A detailed look at the capabilities of TechTrack.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                {feature.icon}
                <CardTitle className="text-xl capitalize">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
