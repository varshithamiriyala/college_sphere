"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  CalendarDays, 
  MessageSquareText, 
  FileCheck2, 
  Users, 
  NotebookPen, 
  MessageCircleQuestion,
  GanttChartSquare,
  BarChart4,
  Building2,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

/** --- DATA & TYPES --- */
type Role = 'Student' | 'Faculty' | 'Admin';

const ROLES: Role[] = ['Student', 'Faculty', 'Admin'];

const HERO_CONTENT = {
  Student: {
    headline: "See your week before it starts.",
    subtext: "Navigate classes, manage assignments, and clear doubts with your AI assistant instantly.",
    cta: "Get Started"
  },
  Faculty: {
    headline: "Take attendance in one tap.",
    subtext: "Focus purely on teaching. Leave roster management, scheduling, and student metrics to the hub.",
    cta: "Get Started"
  },
  Admin: {
    headline: "Generate conflict-free schedules instantly.",
    subtext: "Say goodbye to scheduling headaches. Harness AI to organize timetables and monitor campus health securely.",
    cta: "Get Started"
  }
};

const FEATURES = {
  Student: [
    { title: "Timetable", desc: "Live view of all upcoming lectures", icon: CalendarDays },
    { title: "AI Doubt Assistant", desc: "24/7 answers to academic questions", icon: MessageSquareText },
    { title: "Resume Builder", desc: "Craft professional profiles", icon: FileCheck2 },
  ],
  Faculty: [
    { title: "Attendance", desc: "One-tap digital roll call", icon: Users },
    { title: "Lecture Notes", desc: "Centralized file sharing and uploads", icon: NotebookPen },
    { title: "Feedback", desc: "Gather direct student insights", icon: MessageCircleQuestion },
  ],
  Admin: [
    { title: "Timetable Generator", desc: "Automated, conflict-free scheduling", icon: GanttChartSquare },
    { title: "Analytics Dashboard", desc: "High-level campus and workload insights", icon: BarChart4 },
    { title: "Admissions/Financials", desc: "Oversee operational health", icon: Building2 },
  ]
};

/** --- COMPONENTS --- */

function ScrollHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-background/80 backdrop-blur-md ${
        scrolled ? 'border-b border-border shadow-sm' : 'border-b border-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary" />
          <span className="text-xl font-display font-semibold tracking-tight">College Sphere</span>
        </Link>
        <Button asChild variant="outline" className="font-medium hover:scale-105 transition-transform">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </header>
  );
}

function RoleSwitcher({ activeRole, setActiveRole }: { activeRole: Role, setActiveRole: (r: Role) => void }) {
  return (
    <div className="inline-flex items-center p-1 bg-muted/50 rounded-full border border-border/50 backdrop-blur-sm shadow-inner mb-8">
      {ROLES.map((role) => (
        <button
          key={role}
          onClick={() => setActiveRole(role)}
          className={`relative px-6 py-2 text-sm font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            activeRole === role ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {activeRole === role && (
            <motion.div
              layoutId="activeRolePill"
              className="absolute inset-0 bg-primary rounded-full shadow-md"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{role}</span>
        </button>
      ))}
    </div>
  );
}

function HeroPreviewWidget({ role }: { role: Role }) {
  // Renders different widgets depending on the role
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col justify-center items-center p-6 bg-gradient-to-br from-background to-muted/20">
      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex flex-col gap-4"
        >
          {role === 'Student' && (
            <div className="flex-1 w-full flex flex-col gap-2">
              <div className="h-6 w-32 bg-muted rounded-md mb-2 animate-pulse" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-2 w-full items-center p-3 rounded-lg border border-border/50 bg-background hover:bg-muted/30 cursor-pointer transition-colors group relative">
                  <div className="h-10 w-2 bg-accent rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-foreground/80 rounded mb-1" />
                    <div className="h-3 w-16 bg-muted-foreground/50 rounded" />
                  </div>
                  {/* Fake popover on hover */}
                  <div className="absolute opacity-0 group-hover:opacity-100 right-4 top-0 -translate-y-[80%] bg-popover border text-popover-foreground text-xs p-2 rounded shadow-lg pointer-events-none transition-all duration-200 z-10 w-32">
                    Room 404 • Dr. Smith
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {role === 'Faculty' && (
            <div className="flex-1 w-full flex flex-col gap-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">CS101 Roster</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">46/50 Present</span>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between items-center p-2 border-b border-border/50 last:border-0 hover:bg-muted/10 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted overflow-hidden flex items-center justify-center">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="h-4 w-20 bg-muted-foreground/30 rounded" />
                  </div>
                  <div className="flex gap-1 group-active:scale-95 transition-transform">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500/80 group-hover:text-emerald-500" />
                    <XCircle className="h-5 w-5 text-muted-foreground/30 group-hover:text-destructive/50" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {role === 'Admin' && (
            <div className="flex-1 w-full flex flex-col gap-4">
              <div className="flex justify-between items-end h-32 gap-2 pb-4 border-b border-border/50">
                {[40, 70, 45, 90, 65, 80].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.1 * i, type: 'spring' }}
                    className="flex-1 bg-primary/80 rounded-t-sm"
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 p-3 bg-accent/10 text-accent-foreground rounded-lg border border-accent/20">
                <GanttChartSquare className="h-5 w-5 text-accent animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider">Status</span>
                  <span className="text-sm">7 Conflicts Resolved Automatically</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FeatureCard({ feature }: { feature: typeof FEATURES['Student'][0] }) {
  const Icon = feature.icon;
  return (
    <div className="group relative p-6 rounded-xl border border-border/60 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-1 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 flex flex-col gap-3">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-lg">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
        
        {/* Fake interactive mini-preview on hover */}
        <div className="h-0 opacity-0 group-hover:h-12 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300 pointer-events-none flex items-center">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: 0 }}
              whileInView={{ width: '70%' }}
              transition={{ delay: 0.1, duration: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TryItDemo({ role }: { role: Role }) {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-border/80 bg-background shadow-2xl overflow-hidden shadow-primary/5">
      <div className="h-10 bg-muted/30 border-b border-border flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-accent/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        </div>
      </div>
      <div className="p-6 md:p-8 min-h-[300px] flex items-center justify-center bg-grid-pattern">
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center"
          >
            {role === 'Student' && (
              <div className="w-full max-w-sm flex flex-col gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none self-end max-w-[80%] text-sm shadow-sm relative overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-primary/20 z-0"
                  />
                  <span className="relative z-10">When is my next Database Systems lab?</span>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-muted text-foreground p-3 rounded-2xl rounded-tl-none self-start max-w-[80%] text-sm shadow-sm"
                >
                  <Bot className="inline-block h-4 w-4 mr-2 text-primary" />
                  Your next DB Lab is tomorrow at 2:00 PM in Room 404 (Block B). 
                </motion.div>
              </div>
            )}
            
            {role === 'Faculty' && (
              <div className="w-full max-w-sm flex flex-col gap-4 bg-card border border-border p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-sm">ENG204 Roster</span>
                  <div className="flex px-2 py-1 bg-muted rounded-full">
                    <span className="text-xs font-mono">Present: <motion.span key={Date.now()} initial={{opacity:0}} animate={{opacity:1}}>42</motion.span></span>
                  </div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center bg-background border border-border/50 p-2 rounded-lg pointer-events-none relative overflow-hidden">
                    <span className="text-sm ml-2">Student 00{i}</span>
                    <motion.div 
                      key={`fac-${i}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.4 }}
                      className="bg-emerald-500/20 text-emerald-600 p-1.5 rounded-md"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
            
            {role === 'Admin' && (
              <div className="w-full flex-col flex items-center justify-center gap-6">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-primary">AI</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-mono text-muted-foreground mb-2">Analyzing 320 constraints...</p>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="px-4 py-2 bg-accent/20 text-accent-foreground font-medium rounded-full border border-accent/30 text-sm"
                  >
                    Resolved 14 Conflicts ✓
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** --- MAIN PAGE COMPONENT --- */

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState<Role>('Student');

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary/20">
      <ScrollHeader />

      <main className="flex-1 w-full flex flex-col pt-16">
        
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 md:px-6">
          {/* Subtle bg gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

          <div className="container mx-auto flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center"
            >
              <RoleSwitcher activeRole={activeRole} setActiveRole={setActiveRole} />
            </motion.div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
              >
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeRole}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
                      {HERO_CONTENT[activeRole].headline}
                    </h1>
                    <p className="max-w-[600px] text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      {HERO_CONTENT[activeRole].subtext}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                <Button size="lg" className="rounded-full px-8 py-6 text-lg font-medium shadow-xl shadow-primary/20 hover:scale-105 transition-transform" asChild>
                  <Link href="/signup">{HERO_CONTENT[activeRole].cta}</Link>
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="w-full max-w-lg mx-auto lg:mx-0"
              >
                <HeroPreviewWidget role={activeRole} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY COLLEGE SPHERE? */}
        <section className="relative w-full py-24 md:py-32 bg-muted/30 border-t border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-display mb-4"
              >
                Why College Sphere?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground md:text-lg leading-relaxed"
              >
                Tools purpose-built for everyone on campus. Seamlessly connected, elegantly designed.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(['Student', 'Faculty', 'Admin'] as Role[]).map((colRole, colIdx) => (
                <motion.div 
                  key={colRole}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: colIdx * 0.15 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
                    <div className={`w-2 h-2 rounded-full ${colRole === 'Student' ? 'bg-primary' : colRole === 'Faculty' ? 'bg-accent' : 'bg-secondary'}`} />
                    <h3 className="font-semibold text-lg uppercase tracking-wider text-muted-foreground">{colRole}</h3>
                  </div>
                  {FEATURES[colRole].map((feature, i) => (
                    <FeatureCard key={i} feature={feature} />
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TRY IT DEMO */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-2xl font-bold tracking-tighter sm:text-3xl font-display text-foreground"
              >
                See it in action
              </motion.h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
               {/* The Try It demo relies on the activeRole pushed from the Hero switcher */}
              <TryItDemo role={activeRole} />
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-6 py-10 md:py-12 text-center md:text-left">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bot className="h-5 w-5" />
            <span className="font-semibold tracking-tight">College Sphere</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} College Sphere. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
