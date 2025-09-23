
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
    SearchX, Group, Star, CalendarCheck
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import { useMemo } from 'react';

const allMenuItems = [
    // Admin & Faculty
    { href: '/dashboard', label: 'Dashboard', icon: GanttChart, roles: ['admin', 'faculty'] },
    { href: '/timetable', label: 'Timetable', icon: CalendarDays, roles: ['admin', 'faculty'] },
    { href: '/generate-timetable', label: 'Generator', icon: CalendarPlus, roles: ['admin'] },
    { href: '/faculty', label: 'Faculty', icon: Users, roles: ['admin', 'faculty'] },
    { href: '/leave', label: 'Leave Management', icon: CalendarCheck, roles: ['admin', 'faculty'] },
    { href: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin'] },
    { href: '/chat', label: 'Chat', icon: MessageSquare, roles: ['admin', 'faculty'] },
    
    // Student - Main
    { href: '/dashboard', label: 'Student Hub', icon: GraduationCap, roles: ['student'], group: 'main' },
    
    // Student - Study Tools
    { href: '/subjects', label: 'Subject Organizer', icon: BookCopy, roles: ['student'], group: 'study' },
    { href: '/roadmap', label: 'Roadmap Builder', icon: PenSquare, roles: ['student'], group: 'study' },
    { href: '/pomodoro', label: 'Pomodoro Timer', icon: Timer, roles: ['student'], group: 'study' },
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
    { href: '/community/barter', label: 'Barter System', icon: Repeat, roles: ['student'], group: 'community' },
    { href: '/community/lost-and-found', label: 'Lost & Found', icon: SearchX, roles: ['student'], group: 'community' },
    { href: '/community/study-groups', label: 'Study Groups', icon: Group, roles: ['student'], group: 'community' },
    { href: '/community/mentorship', label: 'Mentorship', icon: Star, roles: ['student'], group: 'community' },

    // Common
    { href: '/profile', label: 'Profile', icon: User, roles: ['admin', 'faculty', 'student'] },
    { href: '/features', label: 'Features', icon: ListTree, roles: ['admin', 'faculty', 'student'] },
    { href: '/settings', label: 'Settings', icon: Settings, roles: ['admin', 'faculty', 'student'] },
];

const menuGroups = {
    'main': { order: 1 },
    'study': { label: 'Study Tools', order: 2 },
    'placement': { label: 'Placement Tools', order: 3 },
    'community': { label: 'Community Tools', order: 4 },
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
              items
          }));

    }, [user, isLoading]);

    return (
        <>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Bot className="h-7 w-7 text-primary" />
                    <span className={`text-xl font-semibold transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>TechTrack</span>
                </div>
                <div className={`${open ? '' : 'md:hidden'}`}>
                    <SidebarTrigger/>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {groupedMenuItems.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-1">
                            {group.label && open && (
                                <h2 className="px-4 pt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {group.label}
                                </h2>
                            )}
                            {group.items.map((item) => (
                                <SidebarMenuItem key={`${item.href}-${item.label}`}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                                        tooltip={item.label}
                                        onClick={handleLinkClick}
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </div>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </>
    );
}
