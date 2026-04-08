import { api } from './api';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  User,
} from '../../types/auth';
import { USE_MOCK } from '../../utils/constants';

let mockUser: User = {
  id: 1,
  name: 'Valmiran',
  email: 'teste@stepkids.com',
  cpf: '000.000.000-00',
  phone: '(82) 99999-9999',
};

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    if (USE_MOCK) {
      return {
        user: {
          ...mockUser,
          email: payload.email,
        },
        tokens: {
          access: 'mock-access-token',
          refresh: 'mock-refresh-token',
        },
      };
    }

    const response = await api.post('/auth/login/', payload);
    return response.data;
  },

  async register(payload: RegisterPayload) {
    if (USE_MOCK) {
      mockUser = {
        id: 1,
        name: payload.name,
        email: payload.email,
        cpf: payload.cpf,
        phone: payload.phone,
      };

      return {
        success: true,
        user: mockUser,
      };
    }

    const response = await api.post('/auth/register/', payload);
    return response.data;
  },

  async me() {
    if (USE_MOCK) {
      return mockUser;
    }

    const response = await api.get('/auth/me/');
    return response.data;
  },
};