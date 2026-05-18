import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import ChildSelect from '../../components/common/ChildSelect';
import { monitoringService } from '../../services/api/monitoringService';
import { colors } from '../../theme';

export default function DailyChecklistScreen({ navigation }: any) {
  const [child, setChild] = useState('');
  const [usedToday, setUsedToday] = useState(true);
  const [feltPain, setFeltPain] = useState(false);
  const [sleptWithOrthosis, setSleptWithOrthosis] = useState(true);
  const [restlessness, setRestlessness] = useState(false);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!child.trim()) {
      Alert.alert('Atenção', 'Selecione uma criança.');
      return;
    }

    try {
      setLoading(true);

      await monitoringService.createDailyChecklist({
        child,
        used_today: usedToday,
        felt_pain: feltPain,
        slept_with_orthosis: sleptWithOrthosis,
        restlessness,
        notes: notes.trim(),
      });

      Alert.alert('Sucesso', 'Checklist diário registrado com sucesso!');
      setNotes('');
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Não foi possível registrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Checklist Diário</Text>

        <Text style={styles.description}>
          Responda o checklist para acompanhar a rotina, sintomas e adaptação.
        </Text>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>✅</Text>
          </View>

          <Text style={styles.label}>Selecione a criança</Text>
          <ChildSelect selectedChildId={child} onSelect={(id) => setChild(id)} />

          <View style={styles.switchCard}>
            <View style={styles.switchTextBox}>
              <Text style={styles.switchTitle}>Usou a órtese hoje?</Text>
              <Text style={styles.switchDescription}>Registro básico de adesão.</Text>
            </View>
            <Switch value={usedToday} onValueChange={setUsedToday} />
          </View>

          <View style={styles.switchCard}>
            <View style={styles.switchTextBox}>
              <Text style={styles.switchTitle}>Sentiu dor?</Text>
              <Text style={styles.switchDescription}>Ajuda no acompanhamento clínico.</Text>
            </View>
            <Switch value={feltPain} onValueChange={setFeltPain} />
          </View>

          <View style={styles.switchCard}>
            <View style={styles.switchTextBox}>
              <Text style={styles.switchTitle}>Dormiu com a órtese?</Text>
              <Text style={styles.switchDescription}>Informação importante para a rotina noturna.</Text>
            </View>
            <Switch value={sleptWithOrthosis} onValueChange={setSleptWithOrthosis} />
          </View>

          <View style={styles.switchCard}>
            <View style={styles.switchTextBox}>
              <Text style={styles.switchTitle}>Ficou inquieto(a)?</Text>
              <Text style={styles.switchDescription}>Registre sinais de desconforto.</Text>
            </View>
            <Switch value={restlessness} onValueChange={setRestlessness} />
          </View>

          <Text style={styles.label}>Observações</Text>
          <Input
            placeholder="Descreva observações do dia"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Recompensa diária</Text>
            <Text style={styles.infoText}>
              O checklist contribui para pontuação, evolução e relatórios.
            </Text>
          </View>

          <Button
            title={loading ? 'Salvando...' : 'Registrar checklist'}
            onPress={handleSubmit}
          />

          <Button title="Voltar" variant="secondary" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} active="add" />
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
    marginBottom: 16,
  },
  card: { backgroundColor: colors.lilac, borderRadius: 24, padding: 18 },
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
  icon: { fontSize: 34 },
  label: { fontWeight: '800', marginBottom: 6 },
  switchCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTextBox: { flex: 1, paddingRight: 12 },
  switchTitle: { fontWeight: '900', marginBottom: 4 },
  switchDescription: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: colors.yellow,
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
    marginBottom: 16,
  },
  infoTitle: { fontWeight: '900', marginBottom: 4 },
  infoText: { color: colors.textLight, fontWeight: '600', lineHeight: 19 },
});