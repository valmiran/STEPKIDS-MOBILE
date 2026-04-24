import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme';
import { useAuth } from '../../../hooks/useAuth';

type Props = {
  navigation: any;
};

export default function AppHeader({ navigation }: Props) {
  const { signOut } = useAuth();

  function handleLogout() {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da aplicação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.header}>
      <Text style={styles.title}>STEPKIDS</Text>

      {/* PERFIL */}
      <TouchableOpacity
        style={[styles.profileButton, { right: 60 }]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.profileIcon}>⚙</Text>
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity
        style={[styles.profileButton, { right: 18 }]}
        onPress={handleLogout}
      >
        <Text style={styles.profileIcon}>⎋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.lilac,
    paddingTop: 42,
    paddingBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 17,
    color: colors.text,
  },
  profileButton: {
    position: 'absolute',
    top: 38,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E9D6F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 16,
  },
});