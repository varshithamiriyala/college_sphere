
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const USER_STORAGE_KEY = 'techtrack.user';
const ALL_USERS_STORAGE_KEY = 'techtrack.users';

type User = {
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, pass: string, role: string) => void;
  setUser: (user: User) => void; // Allow components to update user state
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: User = {
    name: 'Admin',
    email: 'admin@techtrack.edu',
    avatarUrl: 'https://picsum.photos/seed/AdminUser/100/100',
    role: 'admin',
};

// In a real app, this would be a database call. We simulate it with localStorage.
const getStoredUsers = (): Record<string, any> => {
    if (typeof window === 'undefined') return {};
    const users = localStorage.getItem(ALL_USERS_STORAGE_KEY);
    if (users) {
        return JSON.parse(users);
    }
    // If no users, add the default admin
    const defaultUsers = { [defaultUser.email]: { password: 'password', ...defaultUser } };
    localStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client, after hydration.
    // This prevents a mismatch between server and client initial render.
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setUserState(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (typeof window !== 'undefined') {
        if (newUser) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
            // Also update the user in the "all users" list
            const allUsers = getStoredUsers();
            if (allUsers[newUser.email]) {
                allUsers[newUser.email] = { ...allUsers[newUser.email], ...newUser };
                localStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(allUsers));
            }
        } else {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    }
  };

  const login = useCallback((email: string, pass: string): boolean => {
    const allUsers = getStoredUsers();
    const foundUser = allUsers[email];
    
    // In a real app, you'd compare hashed passwords
    if (foundUser && foundUser.password === pass) {
      const { password, ...userToSet } = foundUser;
      setUser(userToSet);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const signup = useCallback((name: string, email: string, pass: string, role: string) => {
    const allUsers = getStoredUsers();
    if (allUsers[email]) {
        throw new Error('An account with this email already exists.');
    }
    
    const newUser: User = {
        name,
        email,
        role,
        avatarUrl: `https://picsum.photos/seed/${name.replace(/\s/g, '')}/100/100`,
    };
    
    allUsers[email] = { password: pass, ...newUser };
    localStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(allUsers));

  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, signup, setUser: setUser as (u: User) => void }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
