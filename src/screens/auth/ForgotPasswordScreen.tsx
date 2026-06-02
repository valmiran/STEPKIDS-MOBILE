import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import KeyboardAwareScreen from '../../components/common/KeyboardAwareScreen';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { colors } from '../../theme';
import { useAuth } from '../../hooks/useAuth';

export default function ForgotPasswordScreen({ navigation }: any) {
  const { recoverPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRecoverPassword() {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Informe seu e-mail cadastrado.');
      return;
    }

    try {
      setLoading(true);

      await recoverPassword(email.trim().toLowerCase());

      Alert.alert(
        'Recuperação enviada',
        'Enviamos um link de recuperação para o e-mail informado.'
      );

      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível enviar o e-mail de recuperação.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Recuperar senha"
        subtitle="Acesso à conta"
        fallbackRoute="Login"
      />

      <KeyboardAwareScreen contentStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.brand}>PÉ DE HERÓI</Text>

          <Text style={styles.title}>Esqueceu a senha?</Text>

          <Text style={styles.description}>
            Digite o e-mail cadastrado para receber as instruções de recuperação da conta.
          </Text>

          <Text style={styles.label}>Email</Text>

          <Input
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Button
            title={loading ? 'Enviando...' : 'Enviar'}
            onPress={handleRecoverPassword}
          />

          <Button
            title="Voltar"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </KeyboardAwareScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 18,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 22,
  },
  brand: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 18,
    color: colors.primaryDark,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
    color: colors.text,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
    color: colors.textLight,
    fontWeight: '600',
  },
  label: {
    fontWeight: '800',
    marginBottom: 6,
    color: colors.text,
  },
});