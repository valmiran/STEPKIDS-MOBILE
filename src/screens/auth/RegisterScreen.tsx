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
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Informe nome, e-mail, senha e confirmação de senha.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      await signUp({
        full_name: name.trim(),
        cpf: cpf.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password,
        confirm_password: confirmPassword,
        role: 'parent',
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso.');
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Não foi possível cadastrar.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.brand}>PÉ DE HERÓI</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Criar conta</Text>

          <Text style={styles.description}>
            Cadastre-se para acompanhar o tratamento, registrar o uso da órtese
            e visualizar a evolução da criança.
          </Text>

          <Text style={styles.label}>Nome completo:</Text>
          <Input
            placeholder="Digite seu nome completo"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>CPF:</Text>
          <Input
            placeholder="Digite seu CPF"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Telefone:</Text>
          <Input
            placeholder="Digite seu telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

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
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirmar senha:</Text>
          <Input
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Button title="Cadastrar" onPress={handleRegister} />

          <View style={styles.footer}>
            <Text>Já tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Entrar</Text>
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
    minHeight: 680,
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