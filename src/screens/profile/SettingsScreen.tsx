import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';
import { useAuth } from '../../hooks/useAuth';

export default function SettingsScreen({ navigation }: any) {
  const { signOut } = useAuth();

  function handleLogout() {
    Alert.alert('Sair da conta', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Configurações</Text>

        <Text style={styles.description}>
          Gerencie informações da conta, segurança e preferências do aplicativo.
        </Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Profile')}
          >
            <View>
              <Text style={styles.optionTitle}>Meu perfil</Text>
              <Text style={styles.optionDescription}>
                Alterar dados pessoais e foto.
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View>
              <Text style={styles.optionTitle}>Alterar senha</Text>
              <Text style={styles.optionDescription}>
                Atualizar senha da conta.
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View>
              <Text style={styles.optionTitle}>Notificações</Text>
              <Text style={styles.optionDescription}>
                Lembretes de órtese e checklists.
              </Text>
            </View>
            <Text style={styles.soon}>Em breve</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Segurança</Text>
          <Text style={styles.infoText}>
            Seus dados são separados por usuário no Firebase, usando a lógica
            users/UID para proteger cada conta.
          </Text>
        </View>

        <Button title="Sair da conta" onPress={handleLogout} />
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
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 14,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  optionDescription: {
    color: colors.textLight,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.textLight,
  },
  soon: {
    backgroundColor: colors.yellow,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    fontWeight: '900',
    fontSize: 12,
  },
  infoBox: {
    backgroundColor: colors.lilac,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
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