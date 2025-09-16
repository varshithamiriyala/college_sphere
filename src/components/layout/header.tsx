
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Settings, Bell } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import Link from 'next/link';
import { useSidebar } from '../ui/sidebar';
import { ModeToggle } from './mode-toggle';
import { useRouter } from 'next/navigation';

// In a real application, this would come from an auth context or API
const loggedInUser = {
    name: 'Admin',
    email: 'admin@techtrack.edu',
    avatarUrl: 'https://picsum.photos/seed/AdminUser/100/100',
};

export function Header() {
  const { isMobile, open } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd clear session/token here
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className={`flex items-center gap-2 ${!isMobile && open ? 'md:hidden': ''}`}>
            <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">New Timetable Generated</p>
                    <p className="text-xs text-muted-foreground">
                      A new timetable option for CS-A is available.
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Deadline Reminder</p>
                    <p className="text-xs text-muted-foreground">
                      Assignment 1 for Algorithms is due tomorrow.
                    </p>
                  </div>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Faculty Meeting</p>
                    <p className="text-xs text-muted-foreground">
                      A faculty meeting is scheduled for 4 PM today.
                    </p>
                  </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={loggedInUser.avatarUrl} alt={loggedInUser.name} data-ai-hint="person portrait"/>
                  <AvatarFallback>{loggedInUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{loggedInUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {loggedInUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </header>
  );
}
