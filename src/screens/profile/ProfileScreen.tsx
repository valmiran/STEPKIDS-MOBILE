import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AppHeader from '../../components/common/AppHeader';
import KeyboardAwareScreen from '../../components/common/KeyboardAwareScreen';
import Button from '../../components/common/Button';
import { colors } from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/api/authService';

export default function ProfileScreen({ navigation }: any) {
  const { user, signOut, refreshUser } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [cpf, setCpf] = useState(user?.cpf || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita o acesso à galeria para escolher uma foto.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoURL(result.assets[0].uri);
    }
  }

  async function handleSaveProfile() {
    try {
      await authService.updateProfile({
        full_name: fullName,
        phone,
        cpf,
        photoURL,
      });

      await refreshUser();

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso.');
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível atualizar o perfil.'
      );
    }
  }

  async function handleLogout() {
    Alert.alert('Sair da conta', 'Deseja realmente sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
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
      <AppHeader
        navigation={navigation}
        title="Perfil"
        subtitle="Dados da conta"
        fallbackRoute="ParentArea"
      />

      <KeyboardAwareScreen contentStyle={styles.content}>
        <Text style={styles.title}>Meu Perfil</Text>

        <TouchableOpacity style={styles.avatarArea} onPress={handlePickImage}>
          {photoURL ? (
            <Image source={{ uri: photoURL }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>+</Text>
            </View>
          )}

          <Text style={styles.changePhoto}>Adicionar/alterar foto</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          placeholder="Nome completo"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={user?.email || ''}
          style={[styles.input, styles.disabledInput]}
          editable={false}
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput
          value={cpf}
          onChangeText={setCpf}
          style={styles.input}
          placeholder="CPF"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
        />

        <Button title="Salvar alterações" onPress={handleSaveProfile} />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 18,
    color: colors.text,
  },
  avatarArea: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.white,
  },
  avatarPlaceholder: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.lilac,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.white,
  },
  changePhoto: {
    marginTop: 10,
    fontWeight: '800',
    color: colors.lilacDark,
  },
  label: {
    fontWeight: '800',
    marginBottom: 6,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 12,
  },
  disabledInput: {
    backgroundColor: '#EFEFEF',
    color: '#777',
  },
  logoutButton: {
    marginTop: 18,
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.danger,
  },
  logoutText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '900',
  },
});