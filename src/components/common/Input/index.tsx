import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function Input(props: TextInputProps) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
});