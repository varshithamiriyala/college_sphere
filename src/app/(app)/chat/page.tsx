import ChatLayout from '@/components/app/chat-layout';
import { facultyData } from '@/lib/data';

export default function ChatPage() {
  const users = facultyData.map(f => ({
    id: f.id,
    name: f.name,
    avatar: f.avatar,
    role: f.title,
    online: Math.random() > 0.5, // Simulate online status
  }));

  // Find a default user to display in the chat, for demo purposes.
  // In a real app, this might be the first user, a welcome bot, or based on routing.
  const defaultUser = users.find(u => u.id === '1') ?? users[0];

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
