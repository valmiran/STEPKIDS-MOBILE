import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme';

type NavigationProps = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin123456');

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Atenção', 'Informe e-mail e senha.');
      return;
    }

    try {
      await signIn({ email, password });
    } catch {
      Alert.alert('Erro', 'E-mail ou senha inválidos.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.brand}>STEPKIDS</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Bem-Vindo</Text>

          <Text style={styles.description}>
            Entre para acompanhar o tratamento, registrar o uso da órtese e visualizar a evolução da criança.
          </Text>

          <Text style={styles.label}>Email:</Text>
          <Input
            placeholder="exemplo@dominio.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha:</Text>
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgot}>◌ Esqueci minha senha</Text>
          </TouchableOpacity>

          <Button title="Entrar" onPress={handleLogin} />

          <View style={styles.footer}>
            <Text>Não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingTop: 58,
  },
  brand: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 14,
  },
  card: {
    flex: 1,
    minHeight: 600,
    backgroundColor: colors.lilac,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 22,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 14,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 19,
  },
  label: {
    fontWeight: '700',
    marginBottom: 6,
  },
  forgot: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 18,
  },
  footer: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    color: '#FFE87A',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});