'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { ChatUserList, User } from './chat-user-list';
import { ChatMessages, Message } from './chat-messages';
import { ChatInput } from './chat-input';

interface ChatLayoutProps {
  users: User[];
  defaultUser: User;
  initialMessages: Message[];
}

export default function ChatLayout({ users, defaultUser, initialMessages }: ChatLayoutProps) {
  const [selectedUser, setSelectedUser] = React.useState<User>(defaultUser);
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  
  const currentUser = {
      id: 'currentUser',
      name: 'Admin',
      avatar: 'https://picsum.photos/seed/AdminUser/200/200',
      role: 'Professor',
      online: true,
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: currentUser,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);

    // Simulate a reply from the selected user
    setTimeout(() => {
        const replyMessage: Message = {
            id: String(messages.length + 2),
            sender: selectedUser,
            content: "This is a simulated reply. Real-time chat requires a database.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prevMessages => [...prevMessages, replyMessage]);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      <Card className="h-full w-1/3 min-w-[250px] max-w-[350px] border-r">
        <ChatUserList
          users={users}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
      </Card>
      <div className="flex h-full flex-1 flex-col">
        <Card className="flex-1 overflow-y-auto">
          <ChatMessages
            selectedUser={selectedUser}
            messages={messages}
            currentUser={currentUser}
          />
        </Card>
        <div className="border-t p-4">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
