
'use client';

import {
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import { 
    BarChart3, CalendarDays, GanttChart, Users, Bot, CalendarPlus, User, 
    MessageSquare, ListTree, Settings, GraduationCap, Lightbulb, BookCopy, 
    FileText, BrainCircuit, PenSquare, LifeBuoy, Timer, GitGraph, Briefcase,
    Key, HelpCircle, Trophy, Users2, Code2, Search, BriefcaseBusiness, Repeat, 
    SearchX, Group, Star, CalendarCheck, CheckSquare, LineChart, NotebookText, Edit, MessageCircle, Share2, CalendarSync, QrCode,
    CreditCard, Building2, Megaphone, UserPlus, Presentation, Bell
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

const allMenuItems = [
    // Admin & Faculty - Core
    { href: '/dashboard', label: 'Dashboard', icon: GanttChart, roles: ['admin', 'faculty'], group: 'main' },
    { href: '/timetable', label: 'Timetable', icon: CalendarDays, roles: ['admin', 'faculty'], group: 'main' },
    { href: '/generate-timetable', label: 'Generator', icon: CalendarPlus, roles: ['admin'], group: 'main' },
    { href: '/faculty', label: 'Faculty Directory', icon: Users, roles: ['admin', 'faculty'], group: 'main' },
    { href: '/leave', label: 'Leave Management', icon: CalendarCheck, roles: ['admin', 'faculty'], group: 'main' },
    { href: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin'], group: 'main' },
    { href: '/chat', label: 'Chat', icon: MessageSquare, roles: ['admin', 'faculty'], group: 'main' },

    // Admin Tools
    { href: '/admin/admissions', label: 'Admissions', icon: UserPlus, roles: ['admin'], group: 'admin' },
    { href: '/admin/financials', label: 'Financials', icon: CreditCard, roles: ['admin'], group: 'admin' },
    { href: '/admin/resources', label: 'Resources', icon: Building2, roles: ['admin'], group: 'admin' },
    { href: '/admin/events', label: 'Events', icon: Presentation, roles: ['admin'], group: 'admin' },
    { href: '/admin/notifications', label: 'Notifications', icon: Bell, roles: ['admin'], group: 'admin' },
    
    // Faculty Tools
    { href: '/faculty-tools/assignments', label: 'Assignments', icon: Edit, roles: ['faculty'], group: 'faculty' },
    { href: '/faculty-tools/attendance', label: 'Attendance', icon: CheckSquare, roles: ['faculty'], group: 'faculty' },
    { href: '/faculty-tools/performance', label: 'Performance', icon: LineChart, roles: ['faculty'], group: 'faculty' },
    { href: '/faculty-tools/notes', label: 'Lecture Notes', icon: NotebookText, roles: ['faculty'], group: 'faculty' },
    { href: '/faculty-tools/feedback', label: 'Student Feedback', icon: MessageCircle, roles: ['faculty'], group: 'faculty' },
    { href: '/faculty-tools/collaboration', label: 'Collaboration', icon: Share2, roles: ['faculty'], group: 'faculty' },
    { href: '/faculty-tools/calendar', label: 'Calendar Sync', icon: CalendarSync, roles: ['faculty'], group: 'faculty' },

    // Student - Main
    { href: '/dashboard', label: 'Student Hub', icon: GraduationCap, roles: ['student'], group: 'main' },
    
    // Student - Study Tools
    { href: '/subjects', label: 'Subject Organizer', icon: BookCopy, roles: ['student'], group: 'study' },
    { href: '/roadmap', label: 'Roadmap Builder', icon: PenSquare, roles: ['student'], group: 'study' },
    { href: '/pomodoro', label: 'Pomodoro Timer', icon: Timer, roles: ['student'], group: 'study' },
    { href: '/attendance/scan', label: 'Scan Attendance', icon: QrCode, roles: ['student'], group: 'study' },
    { href: '/ai-tools/doubt-assistant', label: 'Doubt Assistant', icon: LifeBuoy, roles: ['student'], group: 'study' },
    { href: '/ai-tools/summarizer', label: 'Summarizer', icon: FileText, roles: ['student'], group: 'study' },
    { href: '/ai-tools/diagram-generator', label: 'Diagram Generator', icon: GitGraph, roles: ['student'], group: 'study' },
    { href: '/ai-tools/question-generator', label: 'Question Bank', icon: HelpCircle, roles: ['student'], group: 'study' },
    { href: '/ai-tools/exam-coach', label: 'Exam Coach', icon: BrainCircuit, roles: ['student'], group: 'study' },
    
    // Student - Placement Tools
    { href: '/career/advisor', label: 'Career Advisor', icon: Briefcase, roles: ['student'], group: 'placement' },
    { href: '/career/resume-builder', label: 'Resume Builder', icon: FileText, roles: ['student'], group: 'placement' },
    { href: '/career/resume-analyzer', label: 'Resume Analyzer', icon: Search, roles: ['student'], group: 'placement' },
    { href: '/career/interview-prep', label: 'Interview Prep', icon: Key, roles: ['student'], group: 'placement' },
    { href: '/career/aptitude-tests', label: 'Aptitude Tests', icon: Trophy, roles: ['student'], group: 'placement' },
    { href: '/career/soft-skills-trainer', label: 'Soft Skills Trainer', icon: Users2, roles: ['student'], group: 'placement' },
    { href: '/career/coding-practice', label: 'Coding Practice', icon: Code2, roles: ['student'], group: 'placement' },
    { href: '/career/job-finder', label: 'Job Finder', icon: BriefcaseBusiness, roles: ['student'], group: 'placement' },
    { href: '/career/project-hub', label: 'Project Hub', icon: Lightbulb, roles: ['student'], group: 'placement' },
    
    // Student - Community
    { href: '/community/events', label: 'Events', icon: Presentation, roles: ['student'], group: 'community' },
    { href: '/community/barter', label: 'Barter System', icon: Repeat, roles: ['student'], group: 'community' },
    { href: '/community/lost-and-found', label: 'Lost & Found', icon: SearchX, roles: ['student'], group: 'community' },
    { href: '/community/study-groups', label: 'Study Groups', icon: Group, roles: ['student'], group: 'community' },
    { href: '/community/mentorship', label: 'Mentorship', icon: Star, roles: ['student'], group: 'community' },

    // Common
    { href: '/profile', label: 'Profile', icon: User, roles: ['admin', 'faculty', 'student'], group: 'common' },
    { href: '/features', label: 'Features', icon: ListTree, roles: ['admin', 'faculty', 'student'], group: 'common' },
    { href: '/settings', label: 'Settings', icon: Settings, roles: ['admin', 'faculty', 'student'], group: 'common' },
];

const menuGroups = {
    'main': { label: 'Main', order: 1 },
    'admin': { label: 'Admin Tools', order: 2 },
    'faculty': { label: 'Faculty Tools', order: 3 },
    'study': { label: 'Study Tools', order: 4 },
    'placement': { label: 'Placement Tools', order: 5 },
    'community': { label: 'Community', order: 6 },
    'common': { label: 'Common', order: 99 },
};


const groupCodes: Record<string, string> = {
    'main': 'DIR.01',
    'admin': 'ADM.02',
    'faculty': 'FAC.03',
    'study': 'STD.04',
    'placement': 'PLC.05',
    'community': 'COM.06',
    'common': 'GEN.99',
};

export function SidebarNav() {
    const pathname = usePathname();
    const { user, isLoading } = useUser();
    const { open, isMobile, setOpenMobile } = useSidebar();

    const handleLinkClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };
    
    const groupedMenuItems = useMemo(() => {
        if (isLoading || !user) return [];

        const filteredItems = allMenuItems.filter(item => item.roles.includes(user.role));
        
        const groups = filteredItems.reduce((acc, item) => {
            const groupName = item.group || 'other';
            if (!acc[groupName]) {
                acc[groupName] = [];
            }
            acc[groupName].push(item);
            return acc;
        }, {} as Record<string, typeof filteredItems>);

        return Object.entries(groups)
          .sort(([groupA], [groupB]) => {
              const orderA = menuGroups[groupA as keyof typeof menuGroups]?.order || 99;
              const orderB = menuGroups[groupB as keyof typeof menuGroups]?.order || 99;
              return orderA - orderB;
          })
          .map(([group, items]) => ({
              ...menuGroups[group as keyof typeof menuGroups],
              groupKey: group,
              items
          }));

    }, [user, isLoading]);

    return (
        <>
            <SidebarHeader className="border-b border-border/80 px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#E2A73E] p-1.5 rounded-[4px] text-[#1B2A4A] font-bold font-mono text-xs">
                        CS.X
                    </div>
                    <span className={`text-lg font-bold tracking-tight font-display text-primary transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
                        COLLEGE SPHERE
                    </span>
                </div>
                <div className={`${open ? '' : 'md:hidden'}`}>
                    <SidebarTrigger className="hover:bg-primary/10 rounded-[4px]" />
                </div>
            </SidebarHeader>
            <SidebarContent className="px-2 py-4 space-y-4">
                <SidebarMenu className="space-y-4">
                    {groupedMenuItems.map((group, groupIndex) => {
                        const code = groupCodes[group.groupKey] || 'DIR.00';
                        return (
                            <div key={groupIndex} className="space-y-1.5 border-t border-border/20 pt-3 first:border-0 first:pt-0">
                                {("label" in group && group.label) && open && (
                                    <h2 className="px-3 pb-1 text-[11px] font-mono tracking-wider text-muted-foreground flex items-center gap-2">
                                        <span className="text-[#E2A73E] font-bold">[{code}]</span> 
                                        <span className="font-semibold uppercase">{group.label as string}</span>
                                    </h2>
                                )}
                                <div className="space-y-1">
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                                        return (
                                            <SidebarMenuItem key={`${item.href}-${item.label}`}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isActive}
                                                    tooltip={item.label}
                                                    onClick={handleLinkClick}
                                                    className={cn(
                                                        "rounded-none font-sans text-sm py-2 px-3 transition-all flex items-center gap-3 h-9",
                                                        isActive 
                                                            ? "bg-transparent data-[active=true]:bg-transparent border-l-[4px] border-l-[#E2A73E] text-[#1B2A4A] dark:text-[#EEF2F6] font-bold" 
                                                            : "hover:bg-muted/10 text-muted-foreground hover:text-foreground border-l-[4px] border-l-transparent"
                                                    )}
                                                >
                                                    <Link href={item.href} className="flex items-center w-full">
                                                        <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#E2A73E]" : "text-muted-foreground")} />
                                                        <span className="truncate">{item.label}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
        </>
    );
}
