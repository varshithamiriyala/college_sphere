
'use client';

import {
    SidebarClose,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import { BarChart3, CalendarDays, GanttChart, Users, Bot, CalendarPlus, User, MessageSquare, ListTree, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function SidebarNav() {
    const pathname = usePathname();
    const { open, isMobile, setOpenMobile } = useSidebar();

    const menuItems = [
        { href: '/dashboard', label: 'Dashboard', icon: GanttChart },
        { href: '/features', label: 'Features', icon: ListTree },
        { href: '/timetable', label: 'Timetable', icon: CalendarDays },
        { href: '/generate-timetable', label: 'Generator', icon: CalendarPlus },
        { href: '/faculty', label: 'Faculty', icon: Users },
        { href: '/chat', label: 'Chat', icon: MessageSquare },
        { href: '/analytics', label: 'Analytics', icon: BarChart3 },
        { href: '/profile', label: 'Profile', icon: User },
        { href: '/settings', label: 'Settings', icon: Settings },
    ];

    const handleLinkClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };
    
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
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname.startsWith(item.href)}
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
