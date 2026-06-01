import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LogOut, Settings } from 'lucide-react-native';

import { colors } from '../../../theme';
import { useAuth } from '../../../hooks/useAuth';

type Props = {
  navigation: any;
};

export default function AppHeader({ navigation }: Props) {
  const { signOut } = useAuth();

  function handleLogout() {
    Alert.alert('Sair', 'Deseja realmente sair da aplicação?', [
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
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Pé de Herói</Text>
        <Text style={styles.subtitle}>Acompanhamento e jornada gamificada</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.82}
        >
          <Settings size={19} color={colors.primaryDark} strokeWidth={2.2} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleLogout}
          activeOpacity={0.82}
        >
          <LogOut size={19} color={colors.danger} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    paddingTop: 46,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
    color: colors.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});