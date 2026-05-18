import {
  DataSnapshot,
  get,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { auth, database } from '../../config/firebaseConfig';

function getCurrentUserId(): string {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('Usuário não autenticado.');
  }

  return uid;
}

export function getUserBasePath(): string {
  return `users/${getCurrentUserId()}`;
}

export function getUserPath(path: string): string {
  return `${getUserBasePath()}/${path}`;
}

export async function userSet<T>(path: string, value: T): Promise<void> {
  await set(ref(database, getUserPath(path)), value);
}

export async function userGet<T>(path: string): Promise<T | null> {
  const snapshot = await get(ref(database, getUserPath(path)));
  return snapshot.exists() ? (snapshot.val() as T) : null;
}

export async function userPush<T extends object>(
  path: string,
  value: T
): Promise<string> {
  const newRef = push(ref(database, getUserPath(path)));
  const id = newRef.key;

  if (!id) {
    throw new Error('Não foi possível gerar o ID do registro.');
  }

  await set(newRef, {
    ...value,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return id;
}

export async function userUpdate<T extends object>(
  path: string,
  value: T
): Promise<void> {
  await update(ref(database, getUserPath(path)), {
    ...value,
    updatedAt: new Date().toISOString(),
  });
}

export async function userRemove(path: string): Promise<void> {
  await remove(ref(database, getUserPath(path)));
}

export function userListen<T>(
  path: string,
  callback: (data: T | null, snapshot: DataSnapshot) => void
) {
  const dbRef = ref(database, getUserPath(path));

  const unsubscribe = onValue(dbRef, (snapshot) => {
    callback(snapshot.exists() ? (snapshot.val() as T) : null, snapshot);
  });

  return unsubscribe;
}