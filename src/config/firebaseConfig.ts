import { getApp, getApps, initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCaRWD225GjJlUeILx6mToNqbXxK_kHB4M',
  authDomain: 'stepkids-mobile.firebaseapp.com',
  databaseURL: 'https://stepkids-mobile-default-rtdb.firebaseio.com',
  projectId: 'stepkids-mobile',
  storageBucket: 'stepkids-mobile.firebasestorage.app',
  messagingSenderId: '902295505359',
  appId: '1:902295505359:web:d878db2232c4f34bc2aaba',
  measurementId: 'G-5R5X91RRLN',
};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

const auth = getAuth(app);

const database = getDatabase(app);

export { app, auth, database };