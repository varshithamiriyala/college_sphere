
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
    Key, HelpCircle
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
    { href: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin'] },
    { href: '/chat', label: 'Chat', icon: MessageSquare, roles: ['admin', 'faculty'] },
    
    // Student
    { href: '/dashboard', label: 'Student Hub', icon: GraduationCap, roles: ['student'] },
    { href: '/ai-tools/doubt-assistant', label: 'Doubt Assistant', icon: LifeBuoy, roles: ['student'] },
    { href: '/ai-tools/summarizer', label: 'Summarizer', icon: FileText, roles: ['student'] },
    { href: '/ai-tools/diagram-generator', label: 'Diagram Generator', icon: GitGraph, roles: ['student'] },
    { href: '/ai-tools/question-generator', label: 'Question Bank', icon: HelpCircle, roles: ['student'] },
    { href: '/career/advisor', label: 'Career Advisor', icon: Briefcase, roles: ['student'] },
    { href: '/career/interview-prep', label: 'Interview Prep', icon: Key, roles: ['student'] },
    { href: '/subjects', label: 'Subject Organizer', icon: BookCopy, roles: ['student'] },
    { href: '/roadmap', label: 'Roadmap Builder', icon: PenSquare, roles: ['student'] },
    { href: '/pomodoro', label: 'Pomodoro Timer', icon: Timer, roles: ['student'] },


    // Common
    { href: '/profile', label: 'Profile', icon: User, roles: ['admin', 'faculty', 'student'] },
    { href: '/features', label: 'Features', icon: ListTree, roles: ['admin', 'faculty', 'student'] },
    { href: '/settings', label: 'Settings', icon: Settings, roles: ['admin', 'faculty', 'student'] },
];

export function SidebarNav() {
    const pathname = usePathname();
    const { user, isLoading } = useUser();
    const { open, isMobile, setOpenMobile } = useSidebar();

    const handleLinkClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };
    
    const menuItems = useMemo(() => {
        if (isLoading || !user) return [];
        // A simple grouping logic
        const studentTools = ['/ai-tools/doubt-assistant', '/ai-tools/summarizer', '/ai-tools/diagram-generator', '/ai-tools/question-generator'];
        const studentCareer = ['/career/advisor', '/career/interview-prep'];

        return allMenuItems.filter(item => item.roles.includes(user.role)).map(item => {
             if (studentTools.some(tool => item.href.startsWith(tool))) {
                return {...item, group: 'AI Tools'};
             }
             if (studentCareer.some(tool => item.href.startsWith(tool))) {
                return {...item, group: 'Career Prep'};
             }
             return item;
        });

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
                    {menuItems.map((item, index) => (
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
                </SidebarMenu>
            </SidebarContent>
        </>
    );
}
