import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import ChildSelect from '../../components/common/ChildSelect';
import Button from '../../components/common/Button';
import { useActivityHistory } from '../../hooks/useActivityHistory';
import { colors } from '../../theme';

export default function ActivityHistoryScreen({ navigation }: any) {
  const [childId, setChildId] = useState('');

  const { history, loading, reload } = useActivityHistory(childId);

  function formatDate(value?: string) {
    if (!value) return 'Data não informada';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  function formatTime(value?: string) {
    if (!value) return '';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.title}>Histórico de Missões</Text>

        <Text style={styles.description}>
          Veja as missões concluídas pela criança, com EXP e moedas de ouro recebidas.
        </Text>

        <View style={styles.selectCard}>
          <Text style={styles.label}>Selecione a criança</Text>
          <ChildSelect
            selectedChildId={childId}
            onSelect={(id) => setChildId(id)}
          />
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.lilacDark} />
            <Text style={styles.loadingText}>Carregando histórico...</Text>
          </View>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              history.length === 0 ? styles.emptyContainer : styles.list
            }
            onRefresh={reload}
            refreshing={loading}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>
                    {item.type === 'standard' ? '⭐' : '🎯'}
                  </Text>
                </View>

                <View style={styles.info}>
                  <Text style={styles.activityTitle}>
                    {item.activityTitle}
                  </Text>

                  <Text style={styles.dateText}>
                    {formatDate(item.completedAt)} às {formatTime(item.completedAt)}
                  </Text>

                  <View style={styles.badgeRow}>
                    <View style={styles.expBadge}>
                      <Text style={styles.badgeText}>
                        +{item.expReward} EXP
                      </Text>
                    </View>

                    <View style={styles.goldBadge}>
                      <Text style={styles.badgeText}>
                        🪙 +{item.goldReward}
                      </Text>
                    </View>

                    <View style={styles.typeBadge}>
                      <Text style={styles.badgeText}>
                        {item.type === 'standard' ? 'Padrão' : 'Personalizada'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>📜</Text>
                <Text style={styles.emptyTitle}>
                  Nenhuma missão concluída
                </Text>
                <Text style={styles.emptyText}>
                  Quando a criança concluir missões, elas aparecerão aqui.
                </Text>

                <Button
                  title="Ver missões"
                  onPress={() => navigation.navigate('ActivityList')}
                />
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 18,
    paddingBottom: 90,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 8,
  },
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.textLight,
    fontWeight: '700',
  },
  list: {
    paddingBottom: 20,
  },
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
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 26,
  },
  info: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  dateText: {
    color: colors.textLight,
    fontWeight: '600',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  badgeText: {
    fontWeight: '900',
    fontSize: 12,
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
    marginBottom: 14,
  },
});