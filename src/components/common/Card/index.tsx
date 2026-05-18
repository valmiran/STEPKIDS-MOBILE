import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 12,
  },
});