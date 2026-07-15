
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
  Flame,
  Star,
  Target,
  Timer,
  Trophy,
  Play,
  RotateCcw
} from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const roadmapTasks = [
  { id: 1, text: 'Complete "Variables & Data Types" in Python Basics', completed: true },
  { id: 2, text: 'Watch video on "Functions and Scope"', completed: true },
  { id: 3, text: 'Solve 5 practice problems on conditional logic', completed: false },
  { id: 4, text: 'Build a simple calculator application', completed: false },
];

const performanceData = [
  { name: 'Mon', score: 40 },
  { name: 'Tue', score: 60 },
  { name: 'Wed', score: 55 },
  { name: 'Thu', score: 80 },
  { name: 'Fri', score: 95 },
  { name: 'Sat', score: 85 },
  { name: 'Sun', score: 100 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 350, damping: 25 } }
};

export default function StudentDashboard() {
  const { user } = useUser();
  const nextTask = roadmapTasks.find(task => !task.completed);

  return (
    <motion.div 
      className="space-y-8 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Directory Title / Welcome Signage */}
      <motion.div variants={itemVariants} className="border-b border-[#1B2A4A]/20 dark:border-border/30 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#E2A73E] font-bold uppercase tracking-wider mb-1">
            [SR.N-089] STUDENT DESK
          </div>
          <h1 className="text-4xl font-bold font-display tracking-tight text-[#1B2A4A] dark:text-[#EEF2F6]">
            Welcome Back, {user?.name.split(' ')[0] || 'Varshi'}
          </h1>
          <p className="text-sm font-sans text-[#5B6B82] max-w-xl mt-1">
            Signage reference logs show your progress is on track for this term.
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="rounded-[4px] bg-[#1B2A4A] dark:bg-card border border-border text-[#EEF2F6] dark:text-foreground hover:bg-[#1B2A4A]/90 font-mono text-xs font-medium h-9 px-4">
            <Play className="mr-2 h-3.5 w-3.5 fill-current text-[#E2A73E]" /> CONT_LEARN
          </Button>
          <Button variant="outline" className="rounded-[4px] border-[#1B2A4A] dark:border-border text-[#1B2A4A] dark:text-foreground font-mono text-xs font-medium h-9 px-4 bg-transparent hover:bg-muted/10">
            VIEW_TIMETABLE
          </Button>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Tabular Performance Ledger metrics */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 md:grid-cols-4">
               {[
                 { code: 'MET-01', label: 'Study Hours', value: '12.5h', icon: Timer, color: 'text-[#1B2A4A] dark:text-blue-400' },
                 { code: 'MET-02', label: 'Assignments', value: '4/5', icon: BookOpen, color: 'text-[#E2A73E]' },
                 { code: 'MET-03', label: 'Resume Score', value: '85%', icon: Target, color: 'text-emerald-600 dark:text-emerald-400' },
                 { code: 'MET-04', label: 'XP Points', value: '2,450', icon: Star, color: 'text-violet-600 dark:text-violet-400' },
               ].map((stat, i) => (
                 <Card key={i} className="campus-card hover:border-[#E2A73E] transition-colors relative">
                   <div className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground uppercase font-bold">
                     [{stat.code}]
                   </div>
                   <CardContent className="p-5 flex flex-col justify-between h-28">
                     <stat.icon className={cn("h-5 w-5", stat.color)} />
                     <div className="space-y-0.5">
                       <div className="text-2xl font-bold font-mono tracking-tight text-[#1B2A4A] dark:text-white">{stat.value}</div>
                       <div className="text-[10px] text-muted-foreground font-sans uppercase font-bold tracking-wider">{stat.label}</div>
                     </div>
                   </CardContent>
                 </Card>
               ))}
            </motion.div>

            {/* Performance Ledger Line/Area Chart */}
            <motion.div variants={itemVariants}>
              <Card className="campus-card">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/20">
                      <div className="space-y-0.5">
                          <div className="text-[10px] font-mono text-[#E2A73E] font-bold">[LEDG.ANL]</div>
                          <CardTitle className="text-lg font-bold font-display">Performance Tracking</CardTitle>
                          <CardDescription className="text-xs">Consolidated daily performance indicators.</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent className="p-6">
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="0" stroke="rgba(27, 42, 74, 0.05)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#5B6B82', fontSize: 11, fontFamily: 'monospace'}} dy={8} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#5B6B82', fontSize: 11, fontFamily: 'monospace'}} />
                            <Tooltip contentStyle={{ borderRadius: '4px', border: '1px solid #1B2A4A', backgroundColor: 'rgba(27, 42, 74, 0.95)', color: '#fff', fontSize: 12, fontFamily: 'monospace' }} />
                            <Area type="monotone" dataKey="score" stroke="#1B2A4A" strokeWidth={2.5} fill="#E2A73E" fillOpacity={0.06} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                  </CardContent>
              </Card>
            </motion.div>

             {/* Study Roadmap */}
             <motion.div variants={itemVariants}>
                <Card className="campus-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/20">
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-mono text-[#E2A73E] font-bold">[SEQ.MAP]</div>
                          <CardTitle className="text-lg font-bold font-display">Study Index</CardTitle>
                          <CardDescription className="text-xs">Scheduled curriculum deliverables.</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="font-mono text-xs text-[#1B2A4A] dark:text-[#E2A73E] hover:underline" asChild>
                          <Link href="/roadmap">MANAGE_INDEX</Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-6">
                        <ul className="space-y-3.5">
                            {roadmapTasks.map((task) => (
                                <li key={task.id} className="flex items-center gap-4 group">
                                    <div className={cn("flex items-center justify-center h-6 w-6 rounded-[2px] border text-xs font-mono font-bold", task.completed ? "border-emerald-600 bg-emerald-500/10 text-emerald-600" : "border-[#1B2A4A]/20 dark:border-border/30 text-muted-foreground")}>
                                      {task.completed ? "Y" : "N"}
                                    </div>
                                    <span className={cn("flex-1 text-sm font-sans tracking-wide", task.completed ? "text-muted-foreground/60 line-through" : "text-[#1B2A4A] dark:text-white font-medium")}>
                                        {task.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
            {/* Target Goal Panel */}
            <motion.div variants={itemVariants}>
              <Card className="campus-card border-2 border-[#E2A73E] relative overflow-hidden bg-card">
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-[#E2A73E] font-bold uppercase">
                    [ACT.OBJ]
                  </div>
                  <CardHeader>
                      <CardTitle className="text-md font-bold font-display flex items-center gap-2">
                          <Target className="h-4.5 w-4.5 text-[#E2A73E]" />
                          Current Directive
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-1">
                      {nextTask ? (
                          <>
                            <p className="text-sm font-sans tracking-wide text-muted-foreground leading-snug">{nextTask.text}</p>
                            <Button className="w-full rounded-[4px] bg-[#E2A73E] hover:bg-[#E2A73E]/90 text-[#1B2A4A] font-mono text-xs font-bold h-9" asChild>
                                <Link href="/roadmap">
                                    EXE_TASK <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                          </>
                      ) : (
                          <p className="text-sm font-sans font-medium text-muted-foreground">All targets successfully synchronized.</p>
                      )}
                  </CardContent>
              </Card>
            </motion.div>

            {/* Pomodoro Timer */}
            <motion.div variants={itemVariants}>
              <Card className="campus-card relative">
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground uppercase font-bold">
                    [CLK.TMR]
                  </div>
                  <CardHeader className="border-b border-border/20">
                      <CardTitle className="flex items-center gap-2 text-md font-bold font-display">
                        <Timer className="text-[#1B2A4A] dark:text-[#E2A73E] h-4 w-4" /> Focus Countdown
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-center space-y-6">
                      <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-none border-2 border-dashed border-[#1B2A4A]/20 dark:border-border/30">
                        <div className="text-4xl font-bold font-mono tracking-tight text-[#1B2A4A] dark:text-white">25:00</div>
                      </div>
                      <div className="flex gap-2 justify-center">
                          <Button className="rounded-[4px] h-9 px-4 bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 dark:bg-card border border-border text-white font-mono text-xs">
                            <Play className="h-4 w-4 mr-2 fill-current text-[#E2A73E]" /> START
                          </Button>
                          <Button variant="outline" className="rounded-[4px] h-9 w-9 p-0 border-[#1B2A4A]/20 dark:border-border/30">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                      </div>
                  </CardContent>
              </Card>
            </motion.div>

            {/* Gamification Achievements */}
            <motion.div variants={itemVariants}>
              <Card className="campus-card relative">
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground uppercase font-bold">
                    [ACH.07]
                  </div>
                  <CardHeader className="border-b border-border/20">
                      <CardTitle className="text-md font-bold font-display flex items-center gap-2">
                        <Trophy className="h-4.5 w-4.5 text-[#E2A73E]" /> Achievements Ledger
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-[2px] border border-border/20 bg-muted/10">
                          <div className="flex items-center gap-2.5">
                              <Flame className="h-4.5 w-4.5 text-[#E2A73E]" />
                              <span className="text-xs font-semibold font-sans">Streak Log</span>
                          </div>
                          <span className="text-xs font-bold font-mono text-[#1B2A4A] dark:text-white">05 days</span>
                      </div>
                       <div className="flex items-center justify-between p-3 rounded-[2px] border border-border/20 bg-muted/10">
                          <div className="flex items-center gap-2.5">
                              <Trophy className="h-4.5 w-4.5 text-[#E2A73E]" />
                              <span className="text-xs font-semibold font-sans">Rank Index</span>
                          </div>
                          <span className="text-xs font-bold font-mono text-[#E2A73E]">Top 10%</span>
                      </div>
                  </CardContent>
              </Card>
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
