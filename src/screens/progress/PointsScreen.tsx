import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme';

export default function PointsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.title}>Pontos</Text>

        <View style={styles.card}>
          <Text style={styles.value}>1250</Text>
          <Text style={styles.text}>
            Pontos acumulados por uso da órtese, checklists diários, tarefas e registros de acompanhamento.
          </Text>
        </View>

        <View style={styles.cardYellow}>
          <Text style={styles.cardTitle}>Como ganhar pontos?</Text>
          <Text style={styles.item}>+10 pontos por registrar uso da órtese</Text>
          <Text style={styles.item}>+5 pontos por checklist diário</Text>
          <Text style={styles.item}>+5 pontos por tarefa concluída</Text>
        </View>
      </View>

      <BottomNav navigation={navigation} active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 18 },
  title: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 18,
  },
  card: {
    backgroundColor: colors.blue,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
  },
  value: {
    fontSize: 42,
    fontWeight: '900',
  },
  text: {
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  cardYellow: {
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontWeight: '900',
    marginBottom: 10,
  },
  item: {
    marginBottom: 6,
    fontWeight: '600',
  },
});