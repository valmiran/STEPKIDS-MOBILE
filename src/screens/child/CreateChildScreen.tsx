import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';

import AppHeader from '../../components/common/AppHeader';
import KeyboardAwareScreen from '../../components/common/KeyboardAwareScreen';
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
      navigation.navigate('ChildList');
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
      <AppHeader
        navigation={navigation}
        title="Cadastrar Criança"
        subtitle="Novo cadastro"
        fallbackRoute="ChildList"
      />

      <KeyboardAwareScreen contentStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.plusCircle}>
            <Plus size={38} color={colors.white} strokeWidth={3} />
          </View>

          <Text style={styles.title}>Nova Criança</Text>

          <Text style={styles.description}>
            Preencha os dados básicos da criança. Esta tela é exclusiva para
            cadastro, mantendo a organização do módulo Minhas Crianças.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Nome da criança</Text>
          <Input
            placeholder="Ex: Ana Clara"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />

          <Text style={styles.label}>Idade</Text>
          <Input
            placeholder="Ex: 5"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            editable={!loading}
          />

          <Text style={styles.label}>Diagnóstico</Text>
          <Input
            placeholder="Ex: Pé torto congênito"
            value={diagnosis}
            onChangeText={setDiagnosis}
            editable={!loading}
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Importante</Text>
            <Text style={styles.infoText}>
              Após salvar, a criança aparecerá em Minhas Crianças. Por lá será
              possível visualizar, editar e acompanhar a evolução.
            </Text>
          </View>

          {loading ? (
            <View style={styles.loadingButton}>
              <ActivityIndicator color={colors.white} />
              <Text style={styles.loadingButtonText}>Salvando...</Text>
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
      </KeyboardAwareScreen>
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
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
  },
  plusCircle: {
    width: 76,
    height: 76,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 8,
    color: colors.white,
    textAlign: 'center',
  },
  description: {
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontWeight: '800',
    marginBottom: 6,
    color: colors.text,
  },
  infoBox: {
    backgroundColor: colors.accentSoft,
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoTitle: {
    fontWeight: '900',
    marginBottom: 4,
    color: colors.text,
  },
  infoText: {
    fontWeight: '600',
    color: colors.textLight,
    lineHeight: 19,
  },
  loadingButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    flexDirection: 'row',
    gap: 10,
  },
  loadingButtonText: {
    color: colors.white,
    fontWeight: '900',
  },
});