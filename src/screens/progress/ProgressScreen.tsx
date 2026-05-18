import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function ProgressScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Progresso</Text>

        <Text style={styles.description}>
          Acompanhe evolução, pontos, atividades concluídas e uso da órtese.
        </Text>

        <View style={styles.mainCard}>
          <Text style={styles.icon}>📈</Text>
          <Text style={styles.cardTitle}>Resumo de evolução</Text>
          <Text style={styles.cardText}>
            Visualize o desempenho da criança durante o tratamento.
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.statBlue}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>

          <View style={styles.statYellow}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Nível</Text>
          </View>

          <View style={styles.statWhite}>
            <Text style={styles.statNumber}>0h</Text>
            <Text style={styles.statLabel}>Órtese</Text>
          </View>

          <View style={styles.statWhite}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Atividades</Text>
          </View>
        </View>

        <Button
          title="Ver nível e bônus"
          onPress={() => navigation.navigate('LevelBonus')}
        />

        <Button
          title="Ver pontos"
          variant="secondary"
          onPress={() => navigation.navigate('Points')}
        />

        <Button
          title="Ranking"
          variant="secondary"
          onPress={() => navigation.navigate('Ranking')}
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
  mainCard: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  icon: { fontSize: 46, marginBottom: 8 },
  cardTitle: { fontSize: 20, fontWeight: '900', marginBottom: 6 },
  cardText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  statBlue: {
    width: '47%',
    backgroundColor: colors.blue,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statYellow: {
    width: '47%',
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statWhite: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: { fontSize: 26, fontWeight: '900' },
  statLabel: {
    marginTop: 4,
    color: colors.textLight,
    fontWeight: '700',
    textAlign: 'center',
  },
});