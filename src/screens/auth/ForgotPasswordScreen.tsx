import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { colors } from '../../theme';
import { useAuth } from '../../hooks/useAuth';

export default function ForgotPasswordScreen({ navigation }: any) {
  const { recoverPassword } = useAuth();

  const [email, setEmail] = useState('');

  async function handleRecoverPassword() {
    if (!email) {
      Alert.alert('Atenção', 'Informe seu e-mail cadastrado.');
      return;
    }

    try {
      await recoverPassword(email.trim());

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
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>PÉ DE HERÓI</Text>

      <View style={styles.card}>
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

        <Button title="Enviar" onPress={handleRecoverPassword} />

        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 58,
  },
  brand: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },
  card: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 22,
    borderTopWidth: 48,
    borderTopColor: colors.lilac,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 10,
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
});