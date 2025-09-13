'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { User } from './chat-user-list';
import * as React from 'react';

export interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  selectedUser: User;
  messages: Message[];
  currentUser: User;
}

export function ChatMessages({ selectedUser, messages, currentUser }: ChatMessagesProps) {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (scrollAreaRef.current) {
            // A bit of a hack to get the viewport element from the Radix ScrollArea
            const viewport = scrollAreaRef.current.querySelector<HTMLDivElement>('div[style*="overflow: scroll"]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages]);


  return (
    <div className="flex h-full flex-col">
      <CardHeader className="flex-row items-center border-b">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} data-ai-hint="person portrait" />
          <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <CardTitle className="text-lg">{selectedUser.name}</CardTitle>
          <CardDescription className="text-xs">{selectedUser.role}</CardDescription>
        </div>
      </CardHeader>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isCurrentUser = message.sender.id === currentUser.id;
            return (
              <div
                key={message.id}
                className={cn(
                  'flex items-end gap-2',
                  isCurrentUser ? 'justify-end' : 'justify-start'
                )}
              >
                {!isCurrentUser && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg p-3 md:max-w-md',
                    isCurrentUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={cn(
                      'mt-1 text-right text-xs',
                      isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}
                  >
                    {message.timestamp}
                  </p>
                </div>
                {isCurrentUser && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
