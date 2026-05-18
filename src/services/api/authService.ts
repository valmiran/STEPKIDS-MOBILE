import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { get, ref, set, update } from 'firebase/database';

import { auth, database } from '../../config/firebaseConfig';
import { LoginPayload, RegisterPayload, User } from '../../types/auth';

function getFirebaseErrorMessage(error: any): string {
  const code = error?.code;

  if (code === 'auth/invalid-email') return 'E-mail inválido.';
  if (code === 'auth/user-not-found') return 'Usuário não encontrado.';
  if (code === 'auth/wrong-password') return 'Senha incorreta.';
  if (code === 'auth/email-already-in-use') return 'Este e-mail já está cadastrado.';
  if (code === 'auth/weak-password') return 'A senha deve ter pelo menos 6 caracteres.';
  if (code === 'auth/too-many-requests') return 'Muitas tentativas. Tente novamente mais tarde.';

  return error?.message || 'Erro inesperado no Firebase.';
}

async function getUserProfile(uid: string): Promise<User | null> {
  const snapshot = await get(ref(database, `users/${uid}/profile`));
  return snapshot.exists() ? snapshot.val() : null;
}

export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        payload.email.trim(),
        payload.password
      );

      const profile = await getUserProfile(credential.user.uid);

      if (profile) {
        return profile;
      }

      const fallbackUser: User = {
        id: credential.user.uid,
        uid: credential.user.uid,
        full_name:
          credential.user.displayName ||
          credential.user.email?.split('@')[0] ||
          'Usuário Pé de Herói',
        email: credential.user.email || payload.email,
        role: 'parent',
        createdAt: new Date().toISOString(),
      };

      await set(ref(database, `users/${credential.user.uid}/profile`), fallbackUser);

      return fallbackUser;
    } catch (error: any) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async register(payload: RegisterPayload): Promise<User> {
    try {
      if (payload.password !== payload.confirm_password) {
        throw new Error('As senhas não coincidem.');
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        payload.email.trim(),
        payload.password
      );

      await updateProfile(credential.user, {
        displayName: payload.full_name,
      });

      const user: User = {
        id: credential.user.uid,
        uid: credential.user.uid,
        full_name: payload.full_name,
        email: payload.email.trim(),
        cpf: payload.cpf || '',
        phone: payload.phone || '',
        role: payload.role || 'parent',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await set(ref(database, `users/${credential.user.uid}/profile`), user);

      return user;
    } catch (error: any) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async me(): Promise<User | null> {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      return null;
    }

    return getUserProfile(uid);
  },

  async updateProfile(payload: Partial<User>): Promise<void> {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('Usuário não autenticado.');
  }

  await update(ref(database, `users/${uid}/profile`), {
    ...payload,
    updatedAt: new Date().toISOString(),
  });
},

  async recoverPassword(email: string): Promise<void> {
    try {
      if (!email.trim()) {
        throw new Error('Informe um e-mail válido.');
      }

      await sendPasswordResetEmail(auth, email.trim());
    } catch (error: any) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async changePassword(newPassword: string): Promise<void> {
    if (!auth.currentUser) {
      throw new Error('Usuário não autenticado.');
    }

    await updatePassword(auth.currentUser, newPassword);
  },

  async logout(): Promise<void> {
    await firebaseSignOut(auth);
  },
};