import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, BarChart3, Users, GanttChart, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    title: 'AI Timetable Generator',
    description: 'Generate multiple, conflict-free timetable options in seconds based on your specific data and constraints.',
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    imageId: 'feature-timetable',
  },
  {
    title: 'Dashboards',
    description: 'Get a comprehensive overview with summary cards, trend graphs, and quick access to all essential management tools.',
    icon: <GanttChart className="h-10 w-10 text-primary" />,
    imageId: 'feature-dashboard',
  },
  {
    title: 'Detailed Analytics',
    description: 'Visualize faculty workload, leave trends, and submission compliance with insightful charts and graphs.',
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    imageId: 'feature-analytics',
  },
  {
    title: 'Faculty Management',
    description: 'Easily manage faculty profiles, working hours, leave schedules, and submission statuses all in one place.',
    icon: <Users className="h-10 w-10 text-primary" />,
    imageId: 'feature-faculty',
  },
];


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold">TechTrack</span>
          </Link>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center md:px-6 md:py-32">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Intelligent Timetable Management
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Harness the power of AI to create flawless, conflict-free academic schedules. Save time, reduce stress, and optimize resource allocation effortlessly.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full bg-muted py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why TechTrack?</h2>
                <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
                    Discover the features that make scheduling simple and intelligent.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {features.map((feature) => {
                const image = PlaceHolderImages.find(img => img.id === feature.imageId);
                return (
                    <Card key={feature.title} className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-6">
                        <div className="mb-4 flex items-center gap-4">
                            {feature.icon}
                            <CardTitle className="text-xl capitalize">{feature.title}</CardTitle>
                        </div>
                        <CardContent className="p-0">
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                        </div>
                        {image && (
                            <div className="h-full min-h-[200px] w-full">
                                <Image
                                    src={image.imageUrl}
                                    alt={feature.title}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-full"
                                    data-ai-hint={image.imageHint}
                                />
                            </div>
                        )}
                    </div>
                    </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TechTrack. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
