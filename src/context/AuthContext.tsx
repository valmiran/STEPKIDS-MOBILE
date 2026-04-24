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

/*
  CONTROLE DE LOGIN

  Para testes rápidos:
  - deixe TEMP_LOGIN_BYPASS = true
  - qualquer e-mail/senha entra no app

  Para usar login real do backend:
  - deixe TEMP_LOGIN_BYPASS = false
  - o app usará Django + JWT
*/
const TEMP_LOGIN_BYPASS = true;

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
    /*
      MODO TESTE:
      Este bloco permite entrar no app com qualquer e-mail e senha.
      Use enquanto estiver testando telas, navegação e design.
    */
    if (TEMP_LOGIN_BYPASS) {
      const tempUser: User = {
        id: 1,
        full_name: 'Usuário StepKids',
        email: payload.email || 'teste@stepkids.com',
        cpf: '00000000000',
        phone: '(82) 99999-9999',
      };

      await authStorage.saveTokens({
        access: 'temp-access-token',
        refresh: 'temp-refresh-token',
      });

      await authStorage.saveUser(tempUser);
      setUser(tempUser);
      return;
    }

    /*
      MODO REAL:
      Este bloco usa o backend Django + JWT.
      Para usar login real, troque TEMP_LOGIN_BYPASS para false.
    */
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
    /*
      Em modo teste, não busca usuário no backend.
      Em modo real, atualiza os dados pelo endpoint /accounts/me/.
    */
    if (TEMP_LOGIN_BYPASS) {
      return;
    }

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