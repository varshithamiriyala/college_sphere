
'use client';

import ChatLayout from '@/components/app/chat-layout';
import { facultyData } from '@/lib/data';
import { useState, useEffect } from 'react';
import { User } from '@/components/app/chat-user-list';

export default function ChatPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [defaultUser, setDefaultUser] = useState<User | null>(null);

  useEffect(() => {
    // Moved logic that uses Math.random() into useEffect to prevent hydration errors.
    // This ensures it only runs on the client side.
    const usersWithStatus = facultyData.map(f => ({
      id: f.id,
      name: f.name,
      avatar: f.avatar,
      role: f.title,
      online: Math.random() > 0.5, // Simulate online status
    }));
    setUsers(usersWithStatus);

    // Find a default user to display in the chat, for demo purposes.
    // In a real app, this might be the first user, a welcome bot, or based on routing.
    const defaultChatUser = usersWithStatus.find(u => u.id === '1') ?? usersWithStatus[0];
    setDefaultUser(defaultChatUser);
  }, []);


  if (!defaultUser) {
    return null; // or a loading state
  }

  const initialMessages = [
    {
      id: '1',
      sender: defaultUser,
      content: 'Hey! How is the syllabus planning for next semester coming along?',
      timestamp: '10:00 AM',
    },
    {
      id: '2',
      sender: {
        id: 'currentUser',
        name: 'Admin',
        avatar: 'https://picsum.photos/seed/AdminUser/200/200',
        role: 'Professor',
        online: true,
      },
      content: 'I was just about to message you. I have a draft ready. Can we sync up this afternoon?',
      timestamp: '10:01 AM',
    },
    {
      id: '3',
      sender: defaultUser,
      content: 'Perfect. Does 3 PM work for you in the faculty lounge?',
      timestamp: '10:02 AM',
    },
  ];

  return (
    <ChatLayout
      users={users}
      defaultUser={defaultUser}
      initialMessages={initialMessages}
    />
  );
}
