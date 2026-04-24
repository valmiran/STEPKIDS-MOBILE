import { api } from './api';
import {
  AuthTokens,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  User,
} from '../../types/auth';

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const tokenResponse = await api.post<AuthTokens>(
      '/accounts/login/',
      payload
    );

    const tokens = tokenResponse.data;

    const meResponse = await api.get<User>('/accounts/me/', {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    });

    return {
      user: meResponse.data,
      tokens,
    };
  },

  async register(payload: RegisterPayload) {
    const response = await api.post('/accounts/register/', payload);
    return response.data;
  },

  async me(): Promise<User> {
    const response = await api.get<User>('/accounts/me/');
    return response.data;
  },

  async updateProfile(payload: Partial<User>) {
    const response = await api.put('/accounts/me/', payload);
    return response.data;
  },

  async changePassword(current_password: string, new_password: string) {
    const response = await api.post('/accounts/change-password/', {
      current_password,
      new_password,
    });

    return response.data;
  },
};