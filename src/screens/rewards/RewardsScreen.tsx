import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { rewardsService } from '../../services/api/rewardsService';
import { Reward } from '../../types/reward';

export default function RewardsScreen() {
  const [rewards, setRewards] = useState<Reward[]>([]);

  async function loadRewards() {
    try {
      const data = await rewardsService.getRewards(1);
      setRewards(data);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as recompensas.');
    }
  }

  async function handleRedeem(rewardId: number) {
    try {
      await rewardsService.redeemReward({
        child: 1,
        reward_id: rewardId,
      });

      Alert.alert('Sucesso', 'Recompensa resgatada com sucesso!');
      loadRewards();
    } catch {
      Alert.alert('Erro', 'Não foi possível resgatar a recompensa.');
    }
  }

  useEffect(() => {
    loadRewards();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recompensas</Text>

      <FlatList
        data={rewards}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.rewardTitle}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.points}>{item.points_required} pontos</Text>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: item.unlocked ? '#38A169' : '#A0AEC0' },
              ]}
              disabled={!item.unlocked}
              onPress={() => handleRedeem(item.id)}
            >
              <Text style={styles.buttonText}>
                {item.unlocked ? 'Resgatar' : 'Bloqueada'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma recompensa disponível.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7FAFC' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 12,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: '#4A5568',
    marginBottom: 8,
  },
  points: {
    fontWeight: '700',
    marginBottom: 10,
  },
  button: {
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    color: '#718096',
  },
});