import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import KeyboardAwareScreen from '../../components/common/KeyboardAwareScreen';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import ChildSelect from '../../components/common/ChildSelect';
import { monitoringService } from '../../services/api/monitoringService';
import { colors } from '../../theme';

export default function RegisterOrthosisUsageScreen({ navigation }: any) {
  const [child, setChild] = useState('');
  const [usedToday, setUsedToday] = useState(true);
  const [usageHours, setUsageHours] = useState('2');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!child.trim()) {
      Alert.alert('Atenção', 'Selecione uma criança.');
      return;
    }

    if (usedToday && (!usageHours || Number(usageHours) < 0)) {
      Alert.alert('Atenção', 'Informe uma quantidade de horas válida.');
      return;
    }

    try {
      setLoading(true);

      await monitoringService.registerOrthosisUsage({
        child,
        used_today: usedToday,
        usage_hours: Number(usageHours || 0),
        notes: notes.trim(),
      });

      Alert.alert('Sucesso', 'Uso da órtese registrado com sucesso!');
      setUsageHours('2');
      setNotes('');
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Não foi possível registrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Uso da órtese"
        subtitle="Registro diário"
        fallbackRoute="ParentArea"
      />

      <KeyboardAwareScreen contentStyle={styles.content}>
        <Text style={styles.title}>Uso da Órtese</Text>

        <Text style={styles.description}>
          Registre o uso diário da órtese para acompanhar a adesão ao tratamento.
        </Text>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>🦶</Text>
          </View>

          <Text style={styles.label}>Selecione a criança</Text>
          <ChildSelect selectedChildId={child} onSelect={(id) => setChild(id)} />

          <View style={styles.switchCard}>
            <View style={styles.switchTextBox}>
              <Text style={styles.switchTitle}>Usou a órtese hoje?</Text>
              <Text style={styles.switchDescription}>
                Marque se a criança utilizou a órtese neste dia.
              </Text>
            </View>

            <Switch value={usedToday} onValueChange={setUsedToday} />
          </View>

          <Text style={styles.label}>Horas de uso</Text>
          <Input
            placeholder="Ex: 8"
            value={usageHours}
            onChangeText={setUsageHours}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Observações</Text>
          <Input
            placeholder="Descreva observações, se houver"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Pontuação</Text>
            <Text style={styles.infoText}>
              Ao registrar uso positivo, a criança ganha pontos e acumula horas totais.
            </Text>
          </View>

          <Button
            title={loading ? 'Salvando...' : 'Registrar uso'}
            onPress={handleSubmit}
          />

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
  title: { fontSize: 26, fontWeight: '900', marginBottom: 8, color: colors.text },
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
  icon: { fontSize: 36 },
  label: { fontWeight: '800', marginBottom: 6, color: colors.text },
  switchCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTextBox: { flex: 1, paddingRight: 12 },
  switchTitle: { fontWeight: '900', marginBottom: 4, color: colors.text },
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
  infoTitle: { fontWeight: '900', marginBottom: 4, color: colors.text },
  infoText: { color: colors.textLight, fontWeight: '600', lineHeight: 19 },
});