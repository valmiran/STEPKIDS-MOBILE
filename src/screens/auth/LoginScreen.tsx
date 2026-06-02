import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/common/Input';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (isLoading) return;

    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Informe e-mail e senha.');
      return;
    }

    try {
      setIsLoading(true);

      await signIn({
        email: email.trim().toLowerCase(),
        password,
      });
    } catch (error: any) {
      Alert.alert(
        'Erro no login',
        error?.message || 'Não foi possível fazer login. Verifique seus dados.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>🦶</Text>
          </View>

          <Text style={styles.brand}>PÉ DE HERÓI</Text>

          <Text style={styles.brandSubtitle}>
            Cuidado, coragem e evolução em uma jornada gamificada.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Entrar na conta</Text>

          <Text style={styles.description}>
            Acompanhe o uso da órtese, registre cuidados e veja a evolução da criança.
          </Text>

          <Text style={styles.label}>E-mail</Text>
          <Input
            placeholder="exemplo@dominio.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading}
          />

          <Text style={styles.label}>Senha</Text>
          <Input
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />

          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            activeOpacity={0.86}
            disabled={isLoading}
            onPress={handleLogin}
          >
            {isLoading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color={colors.white} />
                <Text style={styles.loginButtonText}>Entrando...</Text>
              </View>
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerArea}>
            <Text style={styles.registerText}>Não tem conta? </Text>

            <TouchableOpacity
              disabled={isLoading}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerLink}>Cadastre-se</Text>
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
    backgroundColor: colors.primaryDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 54,
  },
  heroArea: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 26,
  },
  logoCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.26)',
  },
  logoIcon: {
    fontSize: 42,
  },
  brand: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandSubtitle: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.86)',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    minHeight: 600,
    backgroundColor: colors.background,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 42,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 20,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  forgotText: {
    alignSelf: 'flex-start',
    color: colors.primaryDark,
    fontWeight: '900',
    fontSize: 13,
    marginTop: 2,
    marginBottom: 18,
  },
  loginButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.72,
  },
  loginButtonText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 16,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  registerArea: {
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: colors.textLight,
    fontWeight: '600',
  },
  registerLink: {
    color: colors.primaryDark,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
});