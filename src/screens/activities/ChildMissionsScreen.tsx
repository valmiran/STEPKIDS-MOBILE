import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { useActivities } from '../../hooks/useActivities';
import { colors } from '../../theme';

export default function ChildMissionsScreen({ navigation }: any) {
  const { activities, loading, reload } = useActivities();

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.title}>Missões do Herói</Text>

        <Text style={styles.description}>
          Veja as missões disponíveis. Para concluir uma missão, peça para o responsável confirmar na Área dos Pais.
        </Text>

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
            contentContainerStyle={styles.list}
            onRefresh={reload}
            refreshing={loading}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>{item.icon || '🎯'}</Text>
                </View>

                <View style={styles.info}>
                  <Text style={styles.missionTitle}>{item.title}</Text>

                  <Text style={styles.missionDescription}>
                    {item.description}
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
                  </View>

                  {item.realLifeReward ? (
                    <Text style={styles.realReward}>
                      Recompensa real: {item.realLifeReward}
                    </Text>
                  ) : null}
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>🎯</Text>
                <Text style={styles.emptyTitle}>Nenhuma missão disponível</Text>
                <Text style={styles.emptyText}>
                  As missões criadas pelos pais aparecerão aqui.
                </Text>
              </View>
            }
          />
        )}

        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
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
  list: { paddingBottom: 20 },
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
  icon: { fontSize: 26 },
  info: { flex: 1 },
  missionTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  missionDescription: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
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
  badgeText: {
    fontWeight: '900',
    fontSize: 12,
  },
  realReward: {
    color: colors.textLight,
    fontWeight: '700',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 8,
  },
  emptyBox: {
    alignItems: 'center',
    padding: 26,
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