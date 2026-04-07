import axios from 'axios';
import { authStorage } from '../storage/authStorage';

export const api = axios.create({
  baseURL: 'exp://192.168.0.10:8081/api',
  timeout: 10000,
});

api.interceptors.request.use(async config => {
  const token = await authStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});