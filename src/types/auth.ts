export type UserRole = 'parent' | 'doctor' | 'admin';

export type User = {
  id: string;
  uid: string;
  full_name: string;
  email: string;
  cpf?: string;
  phone?: string;
  photoURL?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  full_name: string;
  email: string;
  cpf?: string;
  phone?: string;
  password: string;
  confirm_password: string;
  role?: UserRole;
};