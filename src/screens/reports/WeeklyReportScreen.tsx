import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function WeeklyReportScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.title}>Configurações</Text>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.optionTitle}>Perfil</Text>
          <Text style={styles.optionText}>Dados do responsável, nome, e-mail e contato</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.optionTitle}>Segurança</Text>
          <Text style={styles.optionText}>Senha, biometria e autenticação</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionTitle}>Clínica</Text>
          <Text style={styles.optionText}>Dados clínicos, médico e acompanhamento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionTitle}>Notificações</Text>
          <Text style={styles.optionText}>Lembretes de consultas e alertas importantes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionTitle}>Aparência</Text>
          <Text style={styles.optionText}>Tema, idioma e personalização do app</Text>
        </TouchableOpacity>

        <Button title="Sair e Salvar" onPress={() => navigation.navigate('Home')} />
        <Button title="Deslogar" variant="secondary" onPress={() => navigation.navigate('Home')} />
      </View>

      <BottomNav navigation={navigation} active="settings" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 18 },
  title: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 18,
  },
  option: {
    backgroundColor: '#F3E8F8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  optionTitle: {
    fontWeight: '900',
    marginBottom: 4,
  },
  optionText: {
    fontSize: 12,
    color: colors.textLight,
  },
});