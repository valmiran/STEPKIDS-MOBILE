import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppRoutes from './src/navigation/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}