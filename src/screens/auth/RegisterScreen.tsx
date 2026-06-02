import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppHeader from '../../components/common/AppHeader';
import KeyboardAwareScreen from '../../components/common/KeyboardAwareScreen';
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
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Informe nome, e-mail, senha e confirmação de senha.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);

      await signUp({
        full_name: name.trim(),
        cpf: cpf.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirm_password: confirmPassword,
        role: 'parent',
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso.');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Não foi possível cadastrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Criar conta"
        subtitle="Cadastro de usuário"
        fallbackRoute="Login"
      />

      <KeyboardAwareScreen contentStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.brand}>PÉ DE HERÓI</Text>

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

          <Button
            title={loading ? 'Cadastrando...' : 'Cadastrar'}
            onPress={handleRegister}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Entrar</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
    color: colors.primaryDark,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 14,
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
  footer: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: colors.text,
    fontWeight: '600',
  },
  link: {
    color: colors.primaryDark,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
});