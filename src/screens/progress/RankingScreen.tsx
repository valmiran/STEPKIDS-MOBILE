import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

const ranking = [
  { name: 'Herói da Órtese', level: 'Ouro', icon: '🥇' },
  { name: 'Guardião dos Passos', level: 'Prata', icon: '🥈' },
  { name: 'Pequeno Campeão', level: 'Bronze', icon: '🥉' },
];

export default function RankingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Ranking</Text>

        <Text style={styles.description}>
          Veja níveis simbólicos de evolução para motivar a criança.
        </Text>

        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>🏆</Text>
          <Text style={styles.heroTitle}>Conquistas Pé de Herói</Text>
          <Text style={styles.heroText}>
            O ranking ajuda a transformar o tratamento em uma jornada mais divertida.
          </Text>
        </View>

        {ranking.map((item) => (
          <View key={item.name} style={styles.card}>
            <Text style={styles.rankIcon}>{item.icon}</Text>

            <View style={styles.info}>
              <Text style={styles.rankName}>{item.name}</Text>
              <Text style={styles.rankLevel}>{item.level}</Text>
            </View>
          </View>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Observação</Text>
          <Text style={styles.infoText}>
            Esta tela pode evoluir para rankings por criança, níveis e missões concluídas.
          </Text>
        </View>

        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 90 },
  title: { fontSize: 26, fontWeight: '900', marginBottom: 8 },
  description: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 14,
  },
  heroCard: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  heroIcon: { fontSize: 48, marginBottom: 8 },
  heroTitle: { fontSize: 20, fontWeight: '900', marginBottom: 6 },
  heroText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankIcon: { fontSize: 34 },
  info: { flex: 1 },
  rankName: { fontSize: 17, fontWeight: '900' },
  rankLevel: {
    marginTop: 4,
    color: colors.textLight,
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 14,
    marginTop: 4,
    marginBottom: 14,
  },
  infoTitle: { fontWeight: '900', marginBottom: 4 },
  infoText: { color: colors.textLight, fontWeight: '600', lineHeight: 19 },
});