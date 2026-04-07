import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens, User } from '../../types/auth';

const ACCESS_TOKEN_KEY = '@stepkids:access_token';
const REFRESH_TOKEN_KEY = '@stepkids:refresh_token';
const USER_KEY = '@stepkids:user';

export const authStorage = {
  async saveTokens(tokens: AuthTokens): Promise<void> {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
  },

  async getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  },

  async getRefreshToken(): Promise<string | null> {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  },

  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async getUser(): Promise<User | null> {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  },
};