'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import * as React from 'react';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
}

interface ChatUserListProps {
  users: User[];
  selectedUser: User;
  onSelectUser: (user: User) => void;
}

export function ChatUserList({ users, selectedUser, onSelectUser }: ChatUserListProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search faculty..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors',
                selectedUser.id === user.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person portrait"/>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                {user.online && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                )}
              </Avatar>
              <div className="flex-1 truncate">
                <p className="font-semibold">{user.name}</p>
                <p className={cn("text-xs truncate", selectedUser.id === user.id ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                    {user.role}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
