import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { monitoringService } from '../../services/api/monitoringService';
import { ProgressData } from '../../types/monitoring';
import { colors } from '../../theme';

export default function ProgressScreen({ navigation }: any) {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProgress() {
    try {
      const data = await monitoringService.getProgress(1);
      setProgress(data);
    } catch {
      Alert.alert('Erro', 'Não foi possível buscar o progresso.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProgress();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <AppHeader navigation={navigation} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.blueDark} />
          <Text style={styles.loadingText}>Carregando progresso...</Text>
        </View>
      </View>
    );
  }

  const totalPoints = progress?.total_points ?? 0;
  const level = Math.max(1, Math.floor(totalPoints / 100) + 1);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Progresso</Text>

        <View style={styles.levelCard}>
          <Text style={styles.smallTitle}>VOCÊ ESTÁ NO NÍVEL</Text>
          <Text style={styles.levelNumber}>{level}</Text>
          <Text style={styles.face}>🙂</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Criança</Text>
          <Text style={styles.value}>{progress?.child_name ?? 'Não informado'}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.infoCard}>
            <Text style={styles.label}>Pontos</Text>
            <Text style={styles.value}>{totalPoints}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Checklists</Text>
            <Text style={styles.value}>{progress?.completed_checklists ?? 0}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.infoCard}>
            <Text style={styles.label}>Uso da órtese</Text>
            <Text style={styles.value}>{progress?.orthosis_usage_days ?? 0} dias</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Sequência</Text>
            <Text style={styles.value}>{progress?.streak_days ?? 0} dias</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Meta da recompensa</Text>
          <Text style={styles.value}>{progress?.reward_target ?? 100} pontos</Text>
        </View>

        <Button
          title="Ver níveis e bonificações"
          onPress={() => navigation.navigate('LevelBonus')}
        />
      </View>

      <BottomNav navigation={navigation} active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 18 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontWeight: '700',
  },
  back: {
    fontWeight: '700',
    marginBottom: 14,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 16,
  },
  levelCard: {
    backgroundColor: colors.blue,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
  },
  smallTitle: {
    fontSize: 12,
    fontWeight: '900',
  },
  levelNumber: {
    fontSize: 44,
    fontWeight: '900',
  },
  face: {
    fontSize: 32,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  label: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '900',
  },
});