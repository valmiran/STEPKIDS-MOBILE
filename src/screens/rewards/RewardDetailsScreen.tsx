import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function RewardDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const reward = route.params?.reward;

  if (!reward) {
    return (
      <View style={styles.container}>
        <AppHeader navigation={navigation} />

        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>🎁</Text>
          <Text style={styles.emptyTitle}>Recompensa não encontrada</Text>

          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>

        <BottomNav navigation={navigation} active="tasks" />
      </View>
    );
  }

  const status = reward.redeemed
    ? 'Resgatada'
    : reward.unlocked
      ? 'Disponível'
      : 'Bloqueada';

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.rewardHeader}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>
              {reward.redeemed ? '🎉' : reward.unlocked ? '⭐' : '🔒'}
            </Text>
          </View>

          <Text style={styles.title}>{reward.title}</Text>

          <Text style={styles.description}>
            {reward.description}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes da recompensa</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Pontos necessários</Text>
            <Text style={styles.rowValue}>
              {reward.points_required} pts
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Status</Text>
            <Text style={styles.rowValue}>{status}</Text>
          </View>

          {reward.redeemedAt ? (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Resgatada em</Text>
              <Text style={styles.rowValue}>{reward.redeemedAt}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Uso no Pé de Herói</Text>
          <Text style={styles.infoText}>
            As recompensas ajudam a motivar a criança a manter a rotina de
            tratamento e registrar suas atividades diariamente.
          </Text>
        </View>

        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </ScrollView>

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
    padding: 18,
    paddingBottom: 90,
  },
  rewardHeader: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBox: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  icon: {
    fontSize: 42,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    color: colors.textLight,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  row: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  rowLabel: {
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 4,
  },
  rowValue: {
    fontWeight: '900',
  },
  infoBox: {
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  infoTitle: {
    fontWeight: '900',
    marginBottom: 4,
  },
  infoText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
  },
  emptyBox: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 46,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 16,
  },
});