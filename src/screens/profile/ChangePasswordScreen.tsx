import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { authService } from '../../services/api/authService';
import { colors } from '../../theme';

export default function ChangePasswordScreen({ navigation }: any) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleChangePassword() {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Atenção', 'Informe e confirme a nova senha.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await authService.changePassword(newPassword);

      Alert.alert('Sucesso', 'Senha alterada com sucesso.');
      setNewPassword('');
      setConfirmPassword('');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível alterar a senha.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Alterar Senha</Text>

        <Text style={styles.description}>
          Escolha uma nova senha segura para manter sua conta protegida.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nova senha</Text>
          <Input
            placeholder="Digite a nova senha"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirmar senha</Text>
          <Input
            placeholder="Confirme a nova senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Dica de segurança</Text>
            <Text style={styles.infoText}>
              Use pelo menos 6 caracteres e evite senhas muito simples.
            </Text>
          </View>

          <Button title="Alterar senha" onPress={handleChangePassword} />

          <Button
            title="Cancelar"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} active="settings" />
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
    paddingBottom: 90,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 8,
  },
  description: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 18,
  },
  label: {
    fontWeight: '800',
    marginBottom: 6,
  },
  infoBox: {
    backgroundColor: colors.yellow,
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
    marginBottom: 16,
  },
  infoTitle: {
    fontWeight: '900',
    marginBottom: 4,
  },
  infoText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
  },
});