'use client';

import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import { BarChart3, CalendarDays, GanttChart, Users, Bot, CalendarPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function SidebarNav() {
    const pathname = usePathname();

    const menuItems = [
        { href: '/dashboard', label: 'Dashboard', icon: GanttChart },
        { href: '/timetable', label: 'Timetable', icon: CalendarDays },
        { href: '/generate-timetable', label: 'Generator', icon: CalendarPlus },
        { href: '/faculty', label: 'Faculty', icon: Users },
        { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    ];
    
    return (
        <>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Bot className="h-7 w-7 text-primary" />
                    <span className="text-xl font-semibold">TechTrack</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(item.href)}
                                    tooltip={item.label}
                                >
                                    <Link href={item.href}>
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </>
    );
}
