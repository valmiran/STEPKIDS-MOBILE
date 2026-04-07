export type Child = {
  id: number;
  name: string;
  age: number;
  diagnosis?: string;
  avatar?: string;
  createdAt?: string;
};

export type CreateChildPayload = {
  name: string;
  age: number;
  diagnosis?: string;
};

export type UpdateChildPayload = {
  name?: string;
  age?: number;
  diagnosis?: string;
};