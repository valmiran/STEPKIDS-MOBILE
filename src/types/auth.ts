export type User = {
  id: number;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type LoginResponse = {
  user: User;
  tokens: AuthTokens;
};