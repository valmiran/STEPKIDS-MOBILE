import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// ⚠️ Se ainda não criou essas telas, comente temporariamente
// import SplashScreen from '../screens/auth/SplashScreen';
// import AddressRegisterScreen from '../screens/auth/AddressRegisterScreen';
// import ConfirmEmailScreen from '../screens/auth/ConfirmEmailScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* ⚠️ COMENTE SE NÃO EXISTIR AINDA */}
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

      {/* ⚠️ DESCOMENTE QUANDO CRIAR */}
      {/* <Stack.Screen name="AddressRegister" component={AddressRegisterScreen} /> */}
      {/* <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} /> */}

    </Stack.Navigator>
  );
}