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
import KeyboardAwareScreen from '../../components/common/KeyboardAwareScreen';
import Button from '../../components/common/Button';
import ChildSelect from '../../components/common/ChildSelect';
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

  const [child, setChild] = useState('');
  const [symptomType, setSymptomType] = useState('Desconforto');
  const [intensity, setIntensity] = useState('1');
  const [description, setDescription] = useState('');
  const [other, setOther] = useState('');
  const [loading, setLoading] = useState(false);

  function toggleSymptom(option: string) {
    setSymptomType(option);
  }

  async function handleSubmit() {
    if (!child || !symptomType || !intensity) {
      Alert.alert('Atenção', 'Selecione uma criança e preencha os campos obrigatórios.');
      return;
    }

    const intensityNumber = Number(intensity);

    if (Number.isNaN(intensityNumber) || intensityNumber < 1 || intensityNumber > 5) {
      Alert.alert('Atenção', 'A intensidade deve ser um número de 1 a 5.');
      return;
    }

    try {
      setLoading(true);

      await monitoringService.createSymptom({
        child,
        symptom_type: symptomType,
        intensity: intensityNumber,
        mood: selectedMood,
        description: other ? `${description}\nOutros: ${other}` : description,
      });

      Alert.alert('Sucesso', 'Sintoma registrado com sucesso!');
      setDescription('');
      setOther('');
      navigation.navigate('ParentArea');
    } catch (error: any) {
      const message = String(error?.message || '');

      if (message.includes('Já existe um registro de sintomas')) {
        Alert.alert(
          'Registro já realizado',
          'Os sintomas desta criança já foram cadastrados hoje.\n\nTente novamente amanhã.'
        );
        return;
      }

      Alert.alert('Erro', message || 'Não foi possível registrar o sintoma.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Sintomas"
        subtitle="Registro de desconfortos"
        fallbackRoute="ParentArea"
      />

      <KeyboardAwareScreen contentStyle={styles.content}>
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

        <View style={styles.card}>
          <Text style={styles.label}>Selecione a criança</Text>
          <ChildSelect selectedChildId={child} onSelect={(id) => setChild(id)} />

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
                style={[styles.checkboxRow, selected && styles.checkboxRowSelected]}
                onPress={() => toggleSymptom(item)}
                activeOpacity={0.8}
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

          <Button title={loading ? 'Enviando...' : 'Enviar'} onPress={handleSubmit} />

          <Button
            title="Cancelar"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </KeyboardAwareScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: 18, paddingBottom: 120 },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  questionTextBox: { flex: 1 },
  moodBadge: {
    backgroundColor: colors.blue,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMood: { fontSize: 32 },
  title: { fontSize: 20, fontWeight: '900', color: colors.text },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    color: colors.textLight,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 18,
  },
  label: { fontWeight: '800', marginBottom: 6, color: colors.text },
  input: {
    height: 46,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  sectionText: {
    fontWeight: '800',
    marginBottom: 8,
    color: colors.text,
  },
  checkboxRow: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkboxRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  checkbox: { fontSize: 16 },
  checkboxText: { fontSize: 14, fontWeight: '700', color: colors.text },
});