import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { authService } from '../services/api/authService';
import { authStorage } from '../services/storage/authStorage';
import { LoginPayload, RegisterPayload, User } from '../types/auth';

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (payload: LoginPayload) => Promise<void>;
  signUp: (payload: RegisterPayload) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
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

  async function loadSession() {
    try {
      const storedUser = await authStorage.getUser();
      const token = await authStorage.getAccessToken();

      if (storedUser && token) {
        setUser(storedUser);
      }
    } catch (error) {
      console.log('Erro ao carregar sessão:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSession();
  }, []);

  async function signIn(payload: LoginPayload): Promise<void> {
    const response = await authService.login(payload);

    await authStorage.saveTokens(response.tokens);
    await authStorage.saveUser(response.user);

    setUser(response.user);
  }

  async function signUp(payload: RegisterPayload): Promise<void> {
    await authService.register(payload);
  }

  async function signOut(): Promise<void> {
    await authStorage.clear();
    setUser(null);
  }

  async function refreshUser(): Promise<void> {
    const currentUser = await authService.me();
    await authStorage.saveUser(currentUser);
    setUser(currentUser);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}