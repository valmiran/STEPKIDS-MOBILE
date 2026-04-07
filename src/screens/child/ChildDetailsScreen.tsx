import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ChildDetailsScreen() {
  const route = useRoute<any>();
  const { child } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{child.name}</Text>
      <Text style={styles.text}>Idade: {child.age}</Text>
      <Text style={styles.text}>
        Diagnóstico: {child.diagnosis || 'Não informado'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  text: { fontSize: 16, marginBottom: 8 },
});