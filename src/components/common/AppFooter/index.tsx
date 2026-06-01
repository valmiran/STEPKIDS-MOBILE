import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../theme';

export default function AppFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pé de Herói • versão 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 12,
    alignItems: 'center',
  },
  text: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
  },
});