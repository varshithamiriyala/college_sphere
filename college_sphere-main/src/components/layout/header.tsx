
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Settings, Bell, Check, Users } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import Link from 'next/link';
import { useSidebar } from '../ui/sidebar';
import { ModeToggle } from './mode-toggle';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '../ui/skeleton';

export function Header() {
  const { isMobile, open } = useSidebar();
  const router = useRouter();
  const { user, logout, isLoading, switchRole } = useUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleRoleSwitch = (newRole: 'admin' | 'faculty' | 'student') => {
    if (user) {
      switchRole(newRole);
      // Optional: force a reload or redirect to ensure all components re-evaluate the new role
      router.push('/dashboard'); 
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/5 bg-background/30 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className={`flex items-center gap-2 ${!isMobile && open ? 'md:hidden': ''}`}>
            <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-white/5 text-muted-foreground hover:text-white rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-zinc-955/90 backdrop-blur-xl border-white/5 rounded-2xl" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">New Timetable Generated</p>
                    <p className="text-xs text-muted-foreground">
                      A new timetable option for CS-A is available.
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Deadline Reminder</p>
                    <p className="text-xs text-muted-foreground">
                      Assignment 1 for Algorithms is due tomorrow.
                    </p>
                  </div>
                </DropdownMenuItem>
                 <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Faculty Meeting</p>
                    <p className="text-xs text-muted-foreground">
                      A faculty meeting is scheduled for 4 PM today.
                    </p>
                  </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all font-medium py-1.5 px-4 h-9">
                  <Users className="mr-2 h-4 w-4 text-blue-400" />
                  Switch Role
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-955/90 backdrop-blur-xl border-white/5 rounded-2xl">
                <DropdownMenuLabel>Select a role to view as</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem onClick={() => handleRoleSwitch('admin')} className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                  <Check className={`mr-2 h-4 w-4 ${user.role === 'admin' ? 'opacity-100' : 'opacity-0'}`} />
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('faculty')} className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                  <Check className={`mr-2 h-4 w-4 ${user.role === 'faculty' ? 'opacity-100' : 'opacity-0'}`} />
                  Faculty
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('student')} className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                  <Check className={`mr-2 h-4 w-4 ${user.role === 'student' ? 'opacity-100' : 'opacity-0'}`} />
                  Student
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <ModeToggle />

          {isLoading ? (
             <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait"/>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
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
          ) : null}

        </div>
    </header>
  );
}
