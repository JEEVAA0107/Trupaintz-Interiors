import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginAsDemoClient: () => void;
  loginAsDemoManager: () => void;
  loginWithCredentials: (email: string, role: 'client' | 'manager', name?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CLIENT: UserProfile = {
  id: 'usr-client-88',
  name: 'Rajesh Sharma',
  email: 'rajesh.sharma@gmail.com',
  role: 'client',
  projectAssigned: 'PRJ-2026-88',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
};

const DEMO_MANAGER: UserProfile = {
  id: 'usr-mgr-01',
  name: 'Arun Kumar',
  email: 'arun.architect@trupaintz.com',
  role: 'manager',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('trupaintz_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('trupaintz_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('trupaintz_user');
    }
  }, [user]);

  const loginAsDemoClient = () => {
    setUser(DEMO_CLIENT);
    setIsAuthModalOpen(false);
  };

  const loginAsDemoManager = () => {
    setUser(DEMO_MANAGER);
    setIsAuthModalOpen(false);
  };

  const loginWithCredentials = (email: string, role: 'client' | 'manager', name?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || (role === 'client' ? 'Valued Homeowner' : 'Site Lead Engineer'),
      email,
      role,
      projectAssigned: role === 'client' ? 'PRJ-2026-88' : undefined,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAsDemoClient,
        loginAsDemoManager,
        loginWithCredentials,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
