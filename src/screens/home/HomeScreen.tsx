import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme';
import { useAuth } from '../../hooks/useAuth';

export default function HomeScreen({ navigation }: any) {
  const { userName } = useAuth();

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Olá, {userName}!</Text>
          <Text style={styles.greetingSub}>Bem-vindo ao Pé de Herói</Text>
        </View>

        <View style={styles.introCard}>
          <Text style={styles.introIcon}>🌟</Text>
          <Text style={styles.introTitle}>Escolha como deseja usar o app</Text>
          <Text style={styles.introText}>
            O Pé de Herói separa o acompanhamento dos pais da experiência gamificada da criança.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.parentCard}
          onPress={() => navigation.navigate('ParentArea')}
        >
          <Text style={styles.cardIcon}>👨‍👩‍👧</Text>

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTitle}>Área dos Pais</Text>
            <Text style={styles.cardText}>
              Monitoramento, crianças, sintomas, checklists, atividades, recompensas e relatórios.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.childCard}
          onPress={() => navigation.navigate('ChildArea')}
        >
          <Text style={styles.cardIcon}>🦸</Text>

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTitle}>Modo Criança</Text>
            <Text style={styles.cardText}>
              Jogo, missões, moedas, recompensas, conquistas e evolução do personagem.
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Organização do sistema</Text>
          <Text style={styles.infoText}>
            Os pais cuidam do acompanhamento e a criança interage com a parte lúdica. Isso deixa o app mais profissional e coerente com a proposta do TCC.
          </Text>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: 18,
    paddingBottom: 90,
  },
  greeting: {
    marginBottom: 14,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '900',
  },
  greetingSub: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
    fontWeight: '600',
  },
  introCard: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  introIcon: {
    fontSize: 42,
    marginBottom: 8,
  },
  introTitle: {
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
  },
  introText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  parentCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  childCard: {
    backgroundColor: colors.yellow,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 38,
  },
  cardTextBox: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 4,
  },
  cardText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
  },
  infoBox: {
    backgroundColor: colors.blue,
    borderRadius: 18,
    padding: 16,
    marginTop: 2,
  },
  infoTitle: {
    fontWeight: '900',
    fontSize: 17,
    marginBottom: 6,
  },
  infoText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
  },
});