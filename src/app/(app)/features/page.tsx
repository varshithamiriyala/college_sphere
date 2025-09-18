
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, GanttChart, BarChart3, Users, MessageSquare, Settings } from 'lucide-react';

const features = [
  {
    title: 'AI-Powered Timetable Generation',
    description: 'Leverages AI to automatically generate multiple, conflict-free timetable options based on your unique constraints, saving time and optimizing resources.',
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Comprehensive Dashboard',
    description: 'Get an at-a-glance overview of key metrics, access shortcuts for common tasks, and stay informed with a summary of upcoming events.',
    icon: <GanttChart className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Master Timetable Grid',
    description: 'View the complete, interactive master timetable for all classes. Use the integrated AI tool to receive intelligent suggestions for resolving conflicts.',
    icon: <GanttChart className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Detailed Analytics',
    description: 'Visualize faculty workload, leave trends, and submission compliance rates with a suite of charts and graphs for data-driven decision-making.',
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Faculty & Profile Management',
    description: 'Browse faculty directories, manage detailed profiles, and allow users to update their own qualifications and submit documents through a personal portal.',
    icon: <Users className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Interactive Chat',
    description: 'Facilitates real-time communication between faculty and administrators, making it easy to coordinate and collaborate on academic matters instantly.',
    icon: <MessageSquare className="h-10 w-10 text-primary" />
  },
  {
    title: 'Customization and Settings',
    description: 'Personalize the application\'s appearance with a theme customizer, manage your profile, and set preferences for email notifications.',
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
