
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
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Flame,
  Star,
  Target,
  Timer,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const roadmapTasks = [
  { id: 1, text: 'Complete "Variables & Data Types" in Python Basics', completed: true },
  { id: 2, text: 'Watch video on "Functions and Scope"', completed: true },
  { id: 3, text: 'Solve 5 practice problems on conditional logic', completed: false },
  { id: 4, text: 'Build a simple calculator application', completed: false },
];

export default function StudentDashboard() {
  const { user } = useUser();
  const nextTask = roadmapTasks.find(task => !task.completed);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">
          Here's your personalized hub to track progress and stay motivated.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
            {/* Today's Focus */}
            <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-6 w-6" />
                        Today's Focus
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                        Your next step on the path to success.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {nextTask ? (
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-medium">{nextTask.text}</p>
                            <Button variant="secondary" asChild>
                                <Link href="/roadmap">
                                    Start Task <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </div>
                    ) : (
                         <p className="text-lg font-medium">You've completed all tasks! Great job!</p>
                    )}
                </CardContent>
            </Card>

             {/* Progress Meters */}
            <Card>
                <CardHeader>
                    <CardTitle>My Progress</CardTitle>
                    <CardDescription>Track your completion percentage across key areas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Study Roadmap</span>
                            <span className="text-muted-foreground">35%</span>
                        </div>
                        <Progress value={35} />
                    </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Resume Strength</span>
                            <span className="text-muted-foreground">60%</span>
                        </div>
                        <Progress value={60} />
                    </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Interview Prep</span>
                            <span className="text-muted-foreground">15%</span>
                        </div>
                        <Progress value={15} />
                    </div>
                </CardContent>
            </Card>

             {/* Roadmap */}
            <Card>
                <CardHeader>
                    <CardTitle>Daily Roadmap</CardTitle>
                    <CardDescription>Your adaptive, day-by-day study plan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {roadmapTasks.map((task) => (
                             <li key={task.id} className="flex items-center gap-3">
                                {task.completed ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground" />
                                )}
                                <span className={cn("flex-1", task.completed && "text-muted-foreground line-through")}>
                                    {task.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
            {/* Gamification */}
            <Card>
                <CardHeader>
                    <CardTitle>Gamification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                            <Flame className="h-6 w-6 text-orange-500" />
                            <span className="font-semibold">Aptitude Streak</span>
                        </div>
                        <span className="text-lg font-bold">5 Days</span>
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                            <Flame className="h-6 w-6 text-sky-500" />
                            <span className="font-semibold">Coding Streak</span>
                        </div>
                        <span className="text-lg font-bold">12 Days</span>
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                            <Star className="h-6 w-6 text-yellow-500" />
                            <span className="font-semibold">Total Solved</span>
                        </div>
                        <span className="text-lg font-bold">128</span>
                    </div>
                </CardContent>
            </Card>
            
            {/* Pomodoro Timer */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Timer /> Pomodoro Timer</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="text-6xl font-bold font-mono tracking-tighter">25:00</div>
                    <div className="mt-4 flex gap-2 justify-center">
                        <Button>Start Focus</Button>
                        <Button variant="outline">Short Break</Button>
                        <Button variant="outline">Long Break</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
