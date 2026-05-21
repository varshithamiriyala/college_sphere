
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const USER_STORAGE_KEY = 'collegesphere.user';
const ALL_USERS_STORAGE_KEY = 'collegesphere.users';

type UserRole = 'admin' | 'faculty' | 'student';

type User = {
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  collegeName: string;
  collegeCode: string;
  id: string;
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, pass: string, role: string, collegeName: string, collegeCode: string) => void;
  setUser: (user: User) => void; 
  switchRole: (newRole: UserRole) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: User = {
    name: 'Admin',
    email: 'admin@collegesphere.edu',
    avatarUrl: 'https://picsum.photos/seed/AdminUser/100/100',
    role: 'admin',
    collegeName: 'College Sphere University',
    collegeCode: 'CSU',
    id: '1',
};

const getStoredUsers = (): Record<string, any> => {
    if (typeof window === 'undefined') return {};
    const users = localStorage.getItem(ALL_USERS_STORAGE_KEY);
    if (users) {
        return JSON.parse(users);
    }
    const defaultUsers = { [defaultUser.email]: { password: 'password', ...defaultUser } };
    localStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
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
    }
  }, [isMounted]);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (typeof window !== 'undefined') {
        if (newUser) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
            const allUsers = getStoredUsers();
            if (allUsers[newUser.email]) {
                const { password, ...userToStore } = allUsers[newUser.email];
                allUsers[newUser.email] = { password, ...newUser };
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

  const signup = useCallback((name: string, email: string, pass: string, role: string, collegeName: string, collegeCode: string) => {
    const allUsers = getStoredUsers();
    if (allUsers[email]) {
        throw new Error('An account with this email already exists.');
    }
    
    const newUser: User = {
        name,
        email,
        role: role as UserRole,
        collegeName,
        collegeCode,
        avatarUrl: `https://picsum.photos/seed/${name.replace(/\s/g, '')}/100/100`,
        id: Math.random().toString(36).substr(2, 9),
    };
    
    allUsers[email] = { password: pass, ...newUser };
    localStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(allUsers));

  }, []);

  const switchRole = useCallback((newRole: UserRole) => {
    if (user) {
        const updatedUser = { ...user, role: newRole };
        setUser(updatedUser);
    }
  }, [user]);

  const value = { user, isLoading, login, logout, signup, setUser: setUser as (u: User) => void, switchRole };

  return (
    <UserContext.Provider value={value}>
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
