import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { monitoringService } from '../../services/api/monitoringService';
import { colors } from '../../theme';

const symptomOptions = [
  'Desconforto',
  'Vermelhidão na pele',
  'Coceira',
  'Calor ou suor',
];

export default function SymptomsScreen({ navigation, route }: any) {
  const selectedMood = route.params?.mood;

  const [child, setChild] = useState('1');
  const [symptomType, setSymptomType] = useState('Desconforto');
  const [intensity, setIntensity] = useState('1');
  const [description, setDescription] = useState('');
  const [other, setOther] = useState('');

  function toggleSymptom(option: string) {
    setSymptomType(option);
  }

  async function handleSubmit() {
    if (!child || !symptomType || !intensity) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios.');
      return;
    }

    try {
      await monitoringService.createSymptom({
        child: Number(child),
        symptom_type: symptomType,
        intensity: Number(intensity),
        description: other
          ? `${description}\nOutros: ${other}`
          : description,
      });

      Alert.alert('Sucesso', 'Sintoma registrado com sucesso!');
      setDescription('');
      setOther('');
      navigation.navigate('Home');
    } catch {
      Alert.alert('Erro', 'Não foi possível registrar o sintoma.');
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.questionRow}>
          {selectedMood && (
            <View style={styles.moodBadge}>
              <Text style={styles.selectedMood}>{selectedMood}</Text>
            </View>
          )}

          <View style={styles.questionTextBox}>
            <Text style={styles.title}>Como você está se sentindo?</Text>
            <Text style={styles.subtitle}>
              Me conte como foi o uso da órtese hoje.
            </Text>
          </View>
        </View>

        <Text style={styles.label}>ID da criança</Text>
        <TextInput
          style={styles.input}
          value={child}
          onChangeText={setChild}
          keyboardType="numeric"
          placeholder="Ex: 1"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Descreva o que aconteceu"
          value={description}
          onChangeText={setDescription}
          style={styles.textArea}
          multiline
        />

        <Text style={styles.sectionText}>
          Você está sentindo algum sintoma ou desconforto?
        </Text>

        {symptomOptions.map((item) => {
          const selected = symptomType === item;

          return (
            <TouchableOpacity
              key={item}
              style={styles.checkboxRow}
              onPress={() => toggleSymptom(item)}
            >
              <Text style={styles.checkbox}>{selected ? '☑' : '☐'}</Text>
              <Text style={styles.checkboxText}>{item}</Text>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.label}>Intensidade de 1 a 5</Text>
        <TextInput
          style={styles.input}
          value={intensity}
          onChangeText={setIntensity}
          keyboardType="numeric"
          placeholder="Ex: 1"
        />

        <Text style={styles.sectionText}>Outros:</Text>
        <TextInput
          placeholder="Descreva outro sintoma, se houver"
          value={other}
          onChangeText={setOther}
          style={styles.input}
        />

        <Button title="Enviar" onPress={handleSubmit} />
      </View>

      <BottomNav navigation={navigation} active="add" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 18,
  },
  back: {
    fontWeight: '700',
    marginBottom: 14,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  questionTextBox: {
    flex: 1,
  },
  moodBadge: {
    backgroundColor: colors.blue,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMood: {
    fontSize: 32,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
    color: colors.textLight,
  },
  label: {
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    height: 44,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  textArea: {
    height: 110,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  sectionText: {
    fontWeight: '700',
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  checkbox: {
    fontSize: 16,
  },
  checkboxText: {
    fontSize: 14,
  },
});