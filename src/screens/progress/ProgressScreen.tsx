import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { monitoringService } from '../../services/api/monitoringService';
import { ProgressData } from '../../types/monitoring';

export default function ProgressScreen() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProgress() {
    try {
      const data = await monitoringService.getProgress(1);
      setProgress(data);
    } catch (error) {
      console.log('Erro ao buscar progresso');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProgress();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progresso</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Criança</Text>
        <Text style={styles.value}>{progress?.child_name ?? 'Não informado'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Pontos totais</Text>
        <Text style={styles.value}>{progress?.total_points ?? 0}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Checklists concluídos</Text>
        <Text style={styles.value}>{progress?.completed_checklists ?? 0}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Dias de uso da órtese</Text>
        <Text style={styles.value}>{progress?.orthosis_usage_days ?? 0}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Dias seguidos</Text>
        <Text style={styles.value}>{progress?.streak_days ?? 0}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Meta da recompensa</Text>
        <Text style={styles.value}>{progress?.reward_target ?? 100} pontos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
});