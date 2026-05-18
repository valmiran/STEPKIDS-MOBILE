import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import ChildSelect from '../../components/common/ChildSelect';
import { useRewards } from '../../hooks/useRewards';
import { colors } from '../../theme';

export default function RewardsScreen({ navigation }: any) {
  const [childId, setChildId] = useState('');
  const { rewards, loading, redeemReward, reload } = useRewards(childId);

  async function handleRedeem(rewardId: string) {
    try {
      await redeemReward(rewardId);
      Alert.alert('Sucesso', 'Recompensa resgatada com sucesso.');
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Não foi possível resgatar.');
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.title}>Recompensas</Text>

        <Text style={styles.description}>
          Visualize recompensas disponíveis, bloqueadas e já resgatadas.
        </Text>

        <View style={styles.searchCard}>
          <Text style={styles.label}>Selecione a criança</Text>
          <ChildSelect selectedChildId={childId} onSelect={(id) => setChildId(id)} />
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.lilacDark} />
            <Text style={styles.loadingText}>Carregando recompensas...</Text>
          </View>
        ) : (
          <FlatList
            data={rewards}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              rewards.length === 0 ? styles.emptyContainer : styles.listContent
            }
            onRefresh={reload}
            refreshing={loading}
            renderItem={({ item }) => {
              const status = item.redeemed
                ? 'Resgatada'
                : item.unlocked
                  ? 'Disponível'
                  : 'Bloqueada';

              return (
                <View style={styles.rewardCard}>
                  <View style={styles.rewardIcon}>
                    <Text style={styles.rewardEmoji}>
                      {item.redeemed ? '🎉' : item.unlocked ? '⭐' : '🔒'}
                    </Text>
                  </View>

                  <View style={styles.rewardContent}>
                    <Text style={styles.rewardTitle}>{item.title}</Text>
                    <Text style={styles.rewardDescription}>{item.description}</Text>

                    <View style={styles.badgeRow}>
                      <View style={styles.pointsBadge}>
                        <Text style={styles.badgeText}>{item.points_required} pts</Text>
                      </View>

                      <View
                        style={[
                          styles.statusBadge,
                          item.unlocked && !item.redeemed
                            ? styles.availableBadge
                            : styles.lockedBadge,
                        ]}
                      >
                        <Text style={styles.badgeText}>{status}</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.redeemButton,
                        (!item.unlocked || item.redeemed) && styles.disabledButton,
                      ]}
                      disabled={!item.unlocked || item.redeemed}
                      onPress={() => handleRedeem(item.id)}
                    >
                      <Text style={styles.redeemText}>
                        {item.redeemed ? 'Já resgatada' : 'Resgatar'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>🎁</Text>
                <Text style={styles.emptyTitle}>Nenhuma recompensa carregada</Text>
                <Text style={styles.emptyText}>
                  Selecione uma criança para visualizar as recompensas.
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
  searchCard: {
    backgroundColor: colors.lilac,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  label: { fontWeight: '800', marginBottom: 6 },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 10, color: colors.textLight, fontWeight: '700' },
  listContent: { paddingBottom: 20 },
  rewardCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 12,
  },
  rewardIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardEmoji: { fontSize: 26 },
  rewardContent: { flex: 1 },
  rewardTitle: { fontSize: 18, fontWeight: '900', marginBottom: 4 },
  rewardDescription: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 10,
  },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  pointsBadge: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  availableBadge: { backgroundColor: colors.yellow },
  lockedBadge: { backgroundColor: '#EFEFEF' },
  badgeText: { fontSize: 12, fontWeight: '900' },
  redeemButton: {
    backgroundColor: colors.lilacDark,
    borderRadius: 10,
    padding: 10,
  },
  disabledButton: { backgroundColor: '#BDBDBD' },
  redeemText: { color: colors.white, textAlign: 'center', fontWeight: '900' },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  emptyBox: { alignItems: 'center', paddingHorizontal: 20 },
  emptyIcon: { fontSize: 42, marginBottom: 10 },
  emptyTitle: { fontSize: 18, fontWeight: '900', marginBottom: 6 },
  emptyText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
});