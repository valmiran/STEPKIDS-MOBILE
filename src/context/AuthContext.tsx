import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../config/firebaseConfig';
import { authService } from '../services/api/authService';
import { LoginPayload, RegisterPayload, User } from '../types/auth';

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  userName: string;
  signIn: (payload: LoginPayload) => Promise<void>;
  signUp: (payload: RegisterPayload) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userName =
    user?.full_name ||
    user?.email?.split('@')[0] ||
    'usuário';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          return;
        }

        const profile = await authService.me();

        if (profile) {
          setUser(profile);
          return;
        }

        setUser({
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          full_name:
            firebaseUser.displayName ||
            firebaseUser.email?.split('@')[0] ||
            'Usuário Pé de Herói',
          email: firebaseUser.email || '',
          role: 'parent',
        });
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  async function signIn(payload: LoginPayload): Promise<void> {
    const profile = await authService.login(payload);
    setUser(profile);
  }

  async function signUp(payload: RegisterPayload): Promise<void> {
    const profile = await authService.register(payload);
    setUser(profile);
  }

  async function signOut(): Promise<void> {
    await authService.logout();
    setUser(null);
  }

  async function refreshUser(): Promise<void> {
    const profile = await authService.me();
    setUser(profile);
  }

  async function recoverPassword(email: string): Promise<void> {
    await authService.recoverPassword(email);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        userName,
        signIn,
        signUp,
        signOut,
        refreshUser,
        recoverPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}