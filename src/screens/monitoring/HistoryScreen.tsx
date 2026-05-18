import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import ChildSelect from '../../components/common/ChildSelect';
import { monitoringService } from '../../services/api/monitoringService';
import {
  DailyChecklist,
  OrthosisUsage,
  Symptom,
} from '../../types/monitoring';
import { colors } from '../../theme';

export default function HistoryScreen({ navigation }: any) {
  const [childId, setChildId] = useState('');
  const [usages, setUsages] = useState<OrthosisUsage[]>([]);
  const [checklists, setChecklists] = useState<DailyChecklist[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [searched, setSearched] = useState(false);

  async function handleLoadHistory() {
    if (!childId.trim()) {
      Alert.alert('Atenção', 'Selecione uma criança.');
      return;
    }

    try {
      const [usageData, checklistData, symptomData] = await Promise.all([
        monitoringService.getOrthosisUsageByChild(childId),
        monitoringService.getChecklistsByChild(childId),
        monitoringService.getSymptomsByChild(childId),
      ]);

      setUsages(usageData);
      setChecklists(checklistData);
      setSymptoms(symptomData);
      setSearched(true);
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Não foi possível carregar.');
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Histórico Clínico</Text>

        <Text style={styles.description}>
          Consulte registros de órtese, checklist e sintomas vinculados à criança.
        </Text>

        <View style={styles.searchCard}>
          <Text style={styles.label}>Selecione a criança</Text>
          <ChildSelect
            selectedChildId={childId}
            onSelect={(id) => {
              setChildId(id);
              setSearched(false);
            }}
          />

          <Button title="Buscar histórico" onPress={handleLoadHistory} />
        </View>

        {!searched ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>Nenhum histórico carregado</Text>
            <Text style={styles.emptyText}>
              Selecione uma criança para visualizar os registros.
            </Text>
          </View>
        ) : (
          <>
            <Section title="Uso da órtese" emoji="🦶">
              {usages.length === 0 ? (
                <Text style={styles.emptySectionText}>Nenhum registro encontrado.</Text>
              ) : (
                usages.map((item) => (
                  <View key={item.id} style={styles.recordCard}>
                    <Text style={styles.recordTitle}>Data: {item.date}</Text>
                    <Text style={styles.recordText}>Usou: {item.used_today ? 'Sim' : 'Não'}</Text>
                    <Text style={styles.recordText}>Horas: {item.usage_hours}</Text>
                    {item.notes ? <Text style={styles.recordText}>Obs: {item.notes}</Text> : null}
                  </View>
                ))
              )}
            </Section>

            <Section title="Checklists" emoji="✅">
              {checklists.length === 0 ? (
                <Text style={styles.emptySectionText}>Nenhum checklist encontrado.</Text>
              ) : (
                checklists.map((item) => (
                  <View key={item.id} style={styles.recordCard}>
                    <Text style={styles.recordTitle}>Data: {item.date}</Text>
                    <Text style={styles.recordText}>Usou hoje: {item.used_today ? 'Sim' : 'Não'}</Text>
                    <Text style={styles.recordText}>Dor: {item.felt_pain ? 'Sim' : 'Não'}</Text>
                    <Text style={styles.recordText}>
                      Dormiu com órtese: {item.slept_with_orthosis ? 'Sim' : 'Não'}
                    </Text>
                    <Text style={styles.recordText}>Pontos ganhos: {item.pointsEarned || 0}</Text>
                  </View>
                ))
              )}
            </Section>

            <Section title="Sintomas" emoji="😟">
              {symptoms.length === 0 ? (
                <Text style={styles.emptySectionText}>Nenhum sintoma encontrado.</Text>
              ) : (
                symptoms.map((item) => (
                  <View key={item.id} style={styles.recordCard}>
                    <Text style={styles.recordTitle}>Data: {item.date}</Text>
                    <Text style={styles.recordText}>Tipo: {item.symptom_type}</Text>
                    <Text style={styles.recordText}>Intensidade: {item.intensity}</Text>
                    {item.mood ? <Text style={styles.recordText}>Humor: {item.mood}</Text> : null}
                    {item.description ? (
                      <Text style={styles.recordText}>Descrição: {item.description}</Text>
                    ) : null}
                  </View>
                ))
              )}
            </Section>
          </>
        )}
      </ScrollView>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

function Section({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEmoji}>{emoji}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
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
    marginBottom: 16,
  },
  label: { fontWeight: '800', marginBottom: 6 },
  section: { marginBottom: 18 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionEmoji: { fontSize: 24 },
  sectionTitle: { fontSize: 19, fontWeight: '900' },
  recordCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recordTitle: { fontWeight: '900', marginBottom: 6 },
  recordText: {
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 4,
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
  emptySectionText: {
    color: colors.textLight,
    fontWeight: '700',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
});