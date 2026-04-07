import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {user?.name ?? 'Responsável'}!</Text>
      <Text style={styles.subtitle}>Bem-vindo ao StepKids</Text>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate('ChildList')}
      >
        <Text style={styles.cardTitle}>Gestão da Criança</Text>
        <Text style={styles.cardText}>Cadastrar, editar e visualizar crianças</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate('RegisterOrthosisUsage')}
      >
        <Text style={styles.cardTitle}>Uso da Órtese</Text>
        <Text style={styles.cardText}>Registrar uso diário da órtese</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate('DailyChecklist')}
      >
        <Text style={styles.cardTitle}>Checklist Diário</Text>
        <Text style={styles.cardText}>Usou hoje, teve dor, dormiu com a órtese</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate('Symptoms')}
      >
        <Text style={styles.cardTitle}>Sintomas</Text>
        <Text style={styles.cardText}>Registrar desconfortos e sintomas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate('Progress')}
      >
        <Text style={styles.cardTitle}>Progresso</Text>
        <Text style={styles.cardText}>Pontuação e evolução do tratamento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate('Rewards')}
      >
        <Text style={styles.cardTitle}>Recompensas</Text>
        <Text style={styles.cardText}>Visualizar e resgatar recompensas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.exitButton} onPress={signOut}>
        <Text style={styles.exitButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#4A5568',
  },
  exitButton: {
    marginTop: 12,
    height: 48,
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#FFF',
    fontWeight: '700',
  },
});