import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { childService } from '../../services/api/childService';
import { colors } from '../../theme';

export default function EditChildScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { child } = route.params;

  const [name, setName] = useState(child.name);
  const [age, setAge] = useState(String(child.age));
  const [diagnosis, setDiagnosis] = useState(child.diagnosis || '');
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
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

      await childService.updateChild(child.id, {
        name: name.trim(),
        age: Number(age),
        diagnosis: diagnosis.trim(),
      });

      Alert.alert('Sucesso', 'Dados atualizados com sucesso.');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível atualizar.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    Alert.alert(
      'Excluir criança',
      `Deseja realmente excluir o cadastro de ${child.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await childService.deleteChild(child.id);
              Alert.alert('Sucesso', 'Criança excluída.');
              navigation.navigate('ChildList');
            } catch (error: any) {
              Alert.alert(
                'Erro',
                error?.message || 'Não foi possível excluir.'
              );
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editar Criança</Text>

        <Text style={styles.description}>
          Atualize os dados da criança sempre que necessário para manter o
          acompanhamento organizado.
        </Text>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name?.charAt(0)?.toUpperCase() || 'C'}
            </Text>
          </View>

          <Text style={styles.label}>Nome da criança</Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Nome"
          />

          <Text style={styles.label}>Idade</Text>
          <Input
            value={age}
            onChangeText={setAge}
            placeholder="Idade"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Diagnóstico</Text>
          <Input
            value={diagnosis}
            onChangeText={setDiagnosis}
            placeholder="Diagnóstico"
          />

          <View style={styles.statsBox}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{child.level || 1}</Text>
              <Text style={styles.statLabel}>Nível</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{child.totalPoints || 0}</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {child.totalOrthosisHours || 0}h
              </Text>
              <Text style={styles.statLabel}>Órtese</Text>
            </View>
          </View>

          {loading ? (
            <View style={styles.loadingButton}>
              <ActivityIndicator color={colors.white} />
            </View>
          ) : (
            <Button title="Salvar alterações" onPress={handleUpdate} />
          )}

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteText}>Excluir criança</Text>
          </TouchableOpacity>

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
  avatar: {
    alignSelf: 'center',
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.lilacDark,
  },
  label: {
    fontWeight: '800',
    marginBottom: 6,
  },
  statsBox: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '700',
    marginTop: 2,
  },
  loadingButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.lilacDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#FFE1E1',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  deleteText: {
    color: '#B42318',
    textAlign: 'center',
    fontWeight: '900',
  },
});