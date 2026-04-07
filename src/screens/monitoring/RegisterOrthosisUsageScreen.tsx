import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import { monitoringService } from '../../services/api/monitoringService';

export default function RegisterOrthosisUsageScreen() {
  const [child, setChild] = useState('1');
  const [usedToday, setUsedToday] = useState(true);
  const [usageHours, setUsageHours] = useState('2');
  const [notes, setNotes] = useState('');

  async function handleSubmit() {
    try {
      await monitoringService.registerOrthosisUsage({
        child: Number(child),
        used_today: usedToday,
        usage_hours: Number(usageHours),
        notes,
      });

      Alert.alert('Sucesso', 'Uso da órtese registrado com sucesso!');
      setUsageHours('2');
      setNotes('');
    } catch {
      Alert.alert('Erro', 'Não foi possível registrar o uso da órtese.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID da criança</Text>
      <TextInput
        style={styles.input}
        value={child}
        onChangeText={setChild}
        keyboardType="numeric"
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Usou hoje?</Text>
        <Switch value={usedToday} onValueChange={setUsedToday} />
      </View>

      <Text style={styles.label}>Horas de uso</Text>
      <TextInput
        style={styles.input}
        value={usageHours}
        onChangeText={setUsageHours}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7FAFC' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, marginTop: 8 },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    padding: 12,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  switchRow: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3182CE',
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
  },
});