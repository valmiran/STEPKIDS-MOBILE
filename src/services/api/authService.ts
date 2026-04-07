import { api } from './api';
import { LoginPayload, LoginResponse, RegisterPayload } from '../../types/auth';

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await api.post('/auth/login/', payload);
    return response.data;
  },

  async register(payload: RegisterPayload) {
    const response = await api.post('/auth/register/', payload);
    return response.data;
  },

  async me() {
    const response = await api.get('/auth/me/');
    return response.data;
  },
};