export type User = {
  id: number;
  full_name: string;
  email: string;
  cpf?: string;
  phone?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  full_name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  confirm_password: string;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type LoginResponse = {
  user: User;
  tokens: AuthTokens;
};