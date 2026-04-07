import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './navigation/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}