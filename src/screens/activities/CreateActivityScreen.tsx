import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { colors } from '../../theme';
import { activityService } from '../../services/api/activityService';

export default function CreateActivityScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expReward, setExpReward] = useState('50');
  const [goldReward, setGoldReward] = useState('20');
  const [icon, setIcon] = useState('🎯');
  const [realLifeReward, setRealLifeReward] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Informe o título da missão.');
      return;
    }

    if (!expReward || Number(expReward) <= 0) {
      Alert.alert('Atenção', 'Informe uma quantidade válida de EXP.');
      return;
    }

    if (!goldReward || Number(goldReward) < 0) {
      Alert.alert('Atenção', 'Informe uma quantidade válida de moedas.');
      return;
    }

    try {
      setLoading(true);

      await activityService.createCustomActivity({
        title: title.trim(),
        description: description.trim(),
        expReward: Number(expReward),
        goldReward: Number(goldReward),
        icon: icon.trim() || '🎯',
        realLifeReward: realLifeReward.trim(),
      });

      Alert.alert('Sucesso', 'Missão personalizada criada com sucesso.');

      setTitle('');
      setDescription('');
      setExpReward('50');
      setGoldReward('20');
      setIcon('🎯');
      setRealLifeReward('');

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível criar a missão.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Criar Missão</Text>

        <Text style={styles.description}>
          Crie uma missão personalizada com EXP, moedas de ouro e uma recompensa real opcional.
        </Text>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={styles.iconPreview}>{icon || '🎯'}</Text>
          </View>

          <Text style={styles.label}>Ícone</Text>
          <Input
            placeholder="Ex: 🎯"
            value={icon}
            onChangeText={setIcon}
          />

          <Text style={styles.label}>Nome da missão</Text>
          <Input
            placeholder="Ex: Passeio no Parque"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Descrição</Text>
          <Input
            placeholder="Ex: Cumprir a rotina da órtese para ganhar um passeio"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>EXP</Text>
          <Input
            placeholder="Ex: 50"
            value={expReward}
            onChangeText={setExpReward}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Moedas de ouro</Text>
          <Input
            placeholder="Ex: 20"
            value={goldReward}
            onChangeText={setGoldReward}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Recompensa real opcional</Text>
          <Input
            placeholder="Ex: Sair para o parque"
            value={realLifeReward}
            onChangeText={setRealLifeReward}
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Balanceamento recomendado</Text>
            <Text style={styles.infoText}>
              Missões simples: 25–50 EXP e 10–20 moedas. Missões médias:
              60–150 EXP e 25–60 moedas. Missões difíceis: 250+ EXP e 100+
              moedas.
            </Text>
          </View>

          <Button
            title={loading ? 'Salvando...' : 'Salvar missão'}
            onPress={handleCreate}
          />

          <Button
            title="Cancelar"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: 18, paddingBottom: 90 },
  title: { fontSize: 26, fontWeight: '900', marginBottom: 8 },
  description: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 18,
  },
  iconBox: {
    alignSelf: 'center',
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconPreview: { fontSize: 36 },
  label: { fontWeight: '800', marginBottom: 6 },
  infoBox: {
    backgroundColor: colors.yellow,
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
    marginBottom: 16,
  },
  infoTitle: { fontWeight: '900', marginBottom: 4 },
  infoText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
  },
});