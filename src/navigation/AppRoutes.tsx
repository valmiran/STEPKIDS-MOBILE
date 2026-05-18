import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/useAuth';

import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';

export default function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}