import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme';

export default function RankingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.title}>Ranking</Text>

        <View style={styles.card}>
          <Text style={styles.position}>🥇 1º Lua</Text>
          <Text style={styles.points}>1250 pontos</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.position}>🥈 2º Carlos</Text>
          <Text style={styles.points}>980 pontos</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.position}>🥉 3º Maria</Text>
          <Text style={styles.points}>850 pontos</Text>
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
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },
  position: {
    fontSize: 18,
    fontWeight: '900',
  },
  points: {
    color: colors.textLight,
    marginTop: 4,
    fontWeight: '700',
  },
});