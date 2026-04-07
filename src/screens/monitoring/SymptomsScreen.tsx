import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { monitoringService } from '../../services/api/monitoringService';

export default function SymptomsScreen() {
  const [child, setChild] = useState('1');
  const [symptomType, setSymptomType] = useState('Dor');
  const [intensity, setIntensity] = useState('1');
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    try {
      await monitoringService.createSymptom({
        child: Number(child),
        symptom_type: symptomType,
        intensity: Number(intensity),
        description,
      });

      Alert.alert('Sucesso', 'Sintoma registrado com sucesso!');
      setDescription('');
    } catch {
      Alert.alert('Erro', 'Não foi possível registrar o sintoma.');
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

      <Text style={styles.label}>Tipo do sintoma</Text>
      <TextInput
        style={styles.input}
        value={symptomType}
        onChangeText={setSymptomType}
      />

      <Text style={styles.label}>Intensidade (1 a 5)</Text>
      <TextInput
        style={styles.input}
        value={intensity}
        onChangeText={setIntensity}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar Sintoma</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7FAFC',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
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
  button: {
    marginTop: 20,
    backgroundColor: '#D69E2E',
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
  },
});