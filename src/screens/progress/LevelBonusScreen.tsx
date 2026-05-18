import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import ChildSelect from '../../components/common/ChildSelect';
import { useProgress } from '../../hooks/useProgress';
import { colors } from '../../theme';

export default function LevelBonusScreen({ navigation }: any) {
  const [childId, setChildId] = useState('');
  const { progress, loading, reload } = useProgress(childId);

  const nextLevelExp = progress ? progress.level * 100 : 100;
  const currentLevelBase = progress ? (progress.level - 1) * 100 : 0;
  const currentExpInLevel = progress
    ? Math.max(0, progress.total_exp - currentLevelBase)
    : 0;
  const expNeededInLevel = 100;
  const progressPercent = progress
    ? Math.min(100, (currentExpInLevel / expNeededInLevel) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Progresso</Text>

        <Text style={styles.description}>
          Acompanhe EXP, moedas de ouro, nível, missões e horas de uso da órtese.
        </Text>

        <View style={styles.searchCard}>
          <Text style={styles.label}>Selecione a criança</Text>
          <ChildSelect
            selectedChildId={childId}
            onSelect={(id) => setChildId(id)}
          />
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.lilacDark} />
            <Text style={styles.loadingText}>Carregando progresso...</Text>
          </View>
        ) : progress ? (
          <>
            <View style={styles.mainCard}>
              <Text style={styles.childName}>{progress.child_name}</Text>

              <View style={styles.levelCircle}>
                <Text style={styles.levelNumber}>{progress.level}</Text>
              </View>

              <Text style={styles.levelText}>Nível atual</Text>

              <View style={styles.pointsRow}>
                <View style={styles.pointsBadge}>
                  <Text style={styles.pointsText}>
                    {progress.total_exp} EXP
                  </Text>
                </View>

                <View style={styles.goldBadge}>
                  <Text style={styles.pointsText}>
                    🪙 {progress.gold_coins}
                  </Text>
                </View>
              </View>

              <View style={styles.expBarBox}>
                <View style={styles.expBarBackground}>
                  <View
                    style={[
                      styles.expBarFill,
                      { width: `${progressPercent}%` },
                    ]}
                  />
                </View>

                <Text style={styles.expText}>
                  {currentExpInLevel}/100 EXP para o próximo nível
                </Text>
              </View>
            </View>

            <View style={styles.grid}>
              <View style={styles.statCardBlue}>
                <Text style={styles.statIcon}>⏱</Text>
                <Text style={styles.statNumber}>
                  {progress.total_orthosis_hours}h
                </Text>
                <Text style={styles.statLabel}>Horas de órtese</Text>
              </View>

              <View style={styles.statCardYellow}>
                <Text style={styles.statIcon}>📅</Text>
                <Text style={styles.statNumber}>
                  {progress.orthosis_usage_days}
                </Text>
                <Text style={styles.statLabel}>Dias registrados</Text>
              </View>

              <View style={styles.statCardWhite}>
                <Text style={styles.statIcon}>✅</Text>
                <Text style={styles.statNumber}>
                  {progress.completed_checklists}
                </Text>
                <Text style={styles.statLabel}>Checklists</Text>
              </View>

              <View style={styles.statCardWhite}>
                <Text style={styles.statIcon}>🎯</Text>
                <Text style={styles.statNumber}>
                  {progress.completed_missions}
                </Text>
                <Text style={styles.statLabel}>Missões</Text>
              </View>

              <View style={styles.statCardWhite}>
                <Text style={styles.statIcon}>🧩</Text>
                <Text style={styles.statNumber}>
                  {progress.completed_activities}
                </Text>
                <Text style={styles.statLabel}>Atividades</Text>
              </View>

              <View style={styles.statCardWhite}>
                <Text style={styles.statIcon}>🔥</Text>
                <Text style={styles.statNumber}>
                  {progress.streak_days}
                </Text>
                <Text style={styles.statLabel}>Sequência</Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>EXP e moedas de ouro</Text>
              <Text style={styles.infoText}>
                O EXP evolui o personagem e aumenta o nível da criança. As moedas
                de ouro serão usadas futuramente na loja para comprar itens do
                jogo.
              </Text>
            </View>

            <View style={styles.balanceBox}>
              <Text style={styles.balanceTitle}>Balanceamento atual</Text>

              <Text style={styles.balanceItem}>
                • Missão simples: 25–50 EXP / 10–20 moedas
              </Text>

              <Text style={styles.balanceItem}>
                • Missão média: 60–150 EXP / 25–60 moedas
              </Text>

              <Text style={styles.balanceItem}>
                • Missão difícil: 250+ EXP / 100+ moedas
              </Text>
            </View>

            <Button title="Atualizar progresso" onPress={reload} />
          </>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📈</Text>
            <Text style={styles.emptyTitle}>Nenhum progresso carregado</Text>
            <Text style={styles.emptyText}>
              Selecione uma criança para visualizar EXP, moedas, níveis e evolução.
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: 18, paddingBottom: 90 },
  title: { fontSize: 26, fontWeight: '900', marginBottom: 8 },
  description: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 14,
  },
  searchCard: {
    backgroundColor: colors.lilac,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  label: { fontWeight: '800', marginBottom: 6 },
  loadingBox: { marginTop: 40, alignItems: 'center' },
  loadingText: { marginTop: 10, color: colors.textLight, fontWeight: '700' },
  mainCard: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
  },
  childName: { fontSize: 22, fontWeight: '900', marginBottom: 14 },
  levelCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: { fontSize: 42, fontWeight: '900' },
  levelText: { marginTop: 8, fontWeight: '800' },
  pointsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  pointsBadge: {
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  goldBadge: {
    backgroundColor: colors.yellow,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  pointsText: { fontWeight: '900' },
  expBarBox: {
    width: '100%',
    marginTop: 16,
  },
  expBarBackground: {
    height: 14,
    backgroundColor: colors.white,
    borderRadius: 999,
    overflow: 'hidden',
  },
  expBarFill: {
    height: '100%',
    backgroundColor: colors.lilacDark,
    borderRadius: 999,
  },
  expText: {
    marginTop: 6,
    textAlign: 'center',
    color: colors.textLight,
    fontWeight: '700',
    fontSize: 12,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCardBlue: {
    width: '47%',
    backgroundColor: colors.blue,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  statCardYellow: {
    width: '47%',
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  statCardWhite: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIcon: { fontSize: 24, marginBottom: 4 },
  statNumber: { fontSize: 24, fontWeight: '900' },
  statLabel: {
    marginTop: 4,
    textAlign: 'center',
    color: colors.textLight,
    fontWeight: '700',
    fontSize: 12,
  },
  infoBox: {
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 14,
    marginTop: 14,
    marginBottom: 14,
  },
  infoTitle: { fontWeight: '900', marginBottom: 4 },
  infoText: { color: colors.textLight, fontWeight: '600', lineHeight: 19 },
  balanceBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  balanceTitle: {
    fontWeight: '900',
    marginBottom: 8,
  },
  balanceItem: {
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 5,
    lineHeight: 19,
  },
  emptyBox: { alignItems: 'center', padding: 26, marginTop: 20 },
  emptyIcon: { fontSize: 42, marginBottom: 10 },
  emptyTitle: { fontSize: 18, fontWeight: '900', marginBottom: 6 },
  emptyText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
});