import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { authService } from '../../services/api/authService';
import { colors } from '../../theme';

export default function ChangePasswordScreen({ navigation }: any) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSave() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      await authService.changePassword(currentPassword, newPassword);
      Alert.alert('Sucesso', 'Senha alterada com sucesso.');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível alterar a senha.');
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>ALTERAÇÃO DA SENHA</Text>

        <Text style={styles.description}>
          Sua senha precisa ter no mínimo 8 caracteres e 1 número.
        </Text>

        <Text style={styles.label}>Digite a senha atual:</Text>
        <Input
          placeholder="Informe a senha atual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Senha:</Text>
        <Input
          placeholder="Informe a senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirmar a senha:</Text>
        <Input
          placeholder="Informe a senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button title="Salvar" onPress={handleSave} />
        <Button
          title="Sair"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 18 },
  back: { fontWeight: '700', marginBottom: 14 },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 18,
  },
  description: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 18,
    color: colors.text,
  },
  label: {
    fontWeight: '700',
    marginBottom: 6,
  },
});