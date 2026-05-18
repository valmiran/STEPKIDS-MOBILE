import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import ChildSelect from '../../components/common/ChildSelect';
import { colors } from '../../theme';
import { useActivities } from '../../hooks/useActivities';
import { activityService } from '../../services/api/activityService';
import { Activity } from '../../types/activity';

export default function ActivityListScreen({ navigation }: any) {
  const { activities, loading, reload } = useActivities();
  const [selectedChildId, setSelectedChildId] = useState('');

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  async function handleCompleteActivity(activity: Activity) {
    if (!selectedChildId) {
      Alert.alert('Atenção', 'Selecione uma criança antes de concluir a missão.');
      return;
    }

    try {
      await activityService.completeActivity(selectedChildId, activity);

      Alert.alert(
        'Missão concluída!',
        `A criança recebeu ${activity.expReward} EXP e ${activity.goldReward} moedas de ouro.`
      );

      await reload();
    } catch (error: any) {
      Alert.alert(
        'Aviso',
        error?.message || 'Não foi possível concluir a missão.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.title}>Missões do Pé de Herói</Text>

        <Text style={styles.description}>
          Missões padrão e personalizadas para motivar a criança no tratamento.
        </Text>

        <View style={styles.selectCard}>
          <Text style={styles.label}>Selecione a criança</Text>
          <ChildSelect
            selectedChildId={selectedChildId}
            onSelect={(id) => setSelectedChildId(id)}
          />
        </View>

        <Button
          title="Criar missão personalizada"
          onPress={() => navigation.navigate('CreateActivity')}
        />

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.lilacDark} />
            <Text style={styles.loadingText}>Carregando missões...</Text>
          </View>
        ) : (
          <FlatList
            data={activities}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              activities.length === 0 ? styles.emptyContainer : styles.list
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>{item.icon || '🎯'}</Text>
                </View>

                <View style={styles.info}>
                  <Text style={styles.activityTitle}>{item.title}</Text>

                  <Text style={styles.activityDescription}>
                    {item.description || 'Sem descrição.'}
                  </Text>

                  {item.realLifeReward ? (
                    <Text style={styles.realReward}>
                      Recompensa real: {item.realLifeReward}
                    </Text>
                  ) : null}

                  <View style={styles.badgeRow}>
                    <View style={styles.expBadge}>
                      <Text style={styles.badgeText}>+{item.expReward} EXP</Text>
                    </View>

                    <View style={styles.goldBadge}>
                      <Text style={styles.badgeText}>+{item.goldReward} ouro</Text>
                    </View>

                    <View style={styles.typeBadge}>
                      <Text style={styles.badgeText}>
                        {item.type === 'standard' ? 'Padrão' : 'Pai'}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => handleCompleteActivity(item)}
                  >
                    <Text style={styles.completeText}>Concluir missão</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>🎯</Text>
                <Text style={styles.emptyTitle}>Nenhuma missão cadastrada</Text>
                <Text style={styles.emptyText}>
                  Crie uma missão personalizada para aparecer aqui.
                </Text>
              </View>
            }
          />
        )}
      </View>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 18, paddingBottom: 90 },
  title: { fontSize: 26, fontWeight: '900', marginBottom: 8 },
  description: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 14,
  },
  selectCard: {
    backgroundColor: colors.lilac,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  label: {
    fontWeight: '900',
    marginBottom: 8,
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.textLight,
    fontWeight: '700',
  },
  list: { paddingTop: 14, paddingBottom: 20 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 12,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.lilac,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 26 },
  info: { flex: 1 },
  activityTitle: { fontSize: 18, fontWeight: '900', marginBottom: 4 },
  activityDescription: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 8,
  },
  realReward: {
    backgroundColor: colors.yellow,
    borderRadius: 10,
    padding: 8,
    fontWeight: '800',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  expBadge: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  goldBadge: {
    backgroundColor: colors.yellow,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  typeBadge: {
    backgroundColor: '#EFEFEF',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeText: { fontWeight: '900', fontSize: 12 },
  completeButton: {
    backgroundColor: colors.lilacDark,
    borderRadius: 10,
    padding: 10,
  },
  completeText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '900',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyBox: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  emptyText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
});