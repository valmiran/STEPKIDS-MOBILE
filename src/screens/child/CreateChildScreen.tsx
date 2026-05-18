import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { childService } from '../../services/api/childService';
import { colors } from '../../theme';

export default function CreateChildScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  async function handleCreate() {
    try {
      if (!name.trim()) {
        Alert.alert('Atenção', 'Informe o nome da criança.');
        return;
      }

      if (!age || Number(age) <= 0) {
        Alert.alert('Atenção', 'Informe uma idade válida.');
        return;
      }

      setLoading(true);

      await childService.createChild({
        name: name.trim(),
        age: Number(age),
        diagnosis: diagnosis.trim(),
      });

      Alert.alert('Sucesso', 'Criança cadastrada com sucesso!');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível cadastrar a criança.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nova Criança</Text>

        <Text style={styles.description}>
          Cadastre os dados básicos da criança para iniciar o acompanhamento
          diário do tratamento.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nome da criança</Text>
          <Input
            placeholder="Ex: Ana Clara"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Idade</Text>
          <Input
            placeholder="Ex: 5"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Diagnóstico</Text>
          <Input
            placeholder="Ex: Pé torto congênito"
            value={diagnosis}
            onChangeText={setDiagnosis}
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Importante</Text>
            <Text style={styles.infoText}>
              Esses dados serão usados para registrar órtese, sintomas,
              checklists, pontos, níveis e relatórios futuros.
            </Text>
          </View>

          {loading ? (
            <View style={styles.loadingButton}>
              <ActivityIndicator color={colors.white} />
            </View>
          ) : (
            <Button title="Salvar criança" onPress={handleCreate} />
          )}

          <Button
            title="Cancelar"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} active="children" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 18,
    paddingBottom: 90,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 8,
  },
  description: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 18,
  },
  label: {
    fontWeight: '800',
    marginBottom: 6,
  },
  infoBox: {
    backgroundColor: colors.yellow,
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
    marginBottom: 16,
  },
  infoTitle: {
    fontWeight: '900',
    marginBottom: 4,
  },
  infoText: {
    fontWeight: '600',
    color: colors.textLight,
    lineHeight: 19,
  },
  loadingButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.lilacDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});