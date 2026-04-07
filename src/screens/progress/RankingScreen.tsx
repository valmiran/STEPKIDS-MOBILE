import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PointsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pontos</Text>
      <Text style={styles.text}>Sistema de pontos em evolução.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
  text: { color: '#4A5568' },
});