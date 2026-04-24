import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function ActivityListScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>TAREFA DO DIA</Text>

        <View style={styles.childSelector}>
          <Text style={styles.childText}>Lua</Text>
          <Text>⌄</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.date}>07 de Abril de 2026</Text>

          {[
            'Estudar matemática',
            'Natação',
            'Revisar a Prova',
            'Leitura',
            'Organizar brinquedos',
            'Ajudar na tarefa',
            'Fazer o dever',
            'Higiene bucal',
          ].map((item) => (
            <Text key={item} style={styles.item}>
              ☐ {item}
            </Text>
          ))}
        </View>

        <Button
          title="Criar Nova Tarefa"
          onPress={() => navigation.navigate('CreateActivity')}
        />
      </View>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 18 },
  back: { fontWeight: '700', marginBottom: 14 },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 16,
  },
  childSelector: {
    backgroundColor: colors.pink,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  childText: { fontWeight: '700' },
  card: {
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  date: { fontWeight: '900', marginBottom: 12 },
  item: { marginBottom: 8, fontWeight: '600' },
});