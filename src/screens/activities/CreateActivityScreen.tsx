import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function CreateActivityScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [deadline, setDeadline] = useState('');

  function handleSave() {
    Alert.alert('Tarefa criada', 'A nova tarefa foi adicionada com sucesso.');
    navigation.navigate('ActivityList');
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>NOVA ATIVIDADE</Text>

        <Text style={styles.label}>Nome da Tarefa:</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Descrição:</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} />

        <Text style={styles.label}>Categoria:</Text>
        {['Estudo', 'Higiene', 'Organização', 'Atividade Física'].map((item) => (
          <Text key={item} style={styles.checkbox}>☐ {item}</Text>
        ))}

        <Text style={styles.label}>Pontuação:</Text>
        <TextInput style={styles.input} value={points} onChangeText={setPoints} />

        <Text style={styles.label}>Prazo:</Text>
        <TextInput style={styles.input} value={deadline} onChangeText={setDeadline} />

        <Button title="Confirmar Tarefa" onPress={handleSave} />
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
    marginBottom: 20,
  },
  label: {
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    height: 42,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  checkbox: {
    marginBottom: 6,
  },
});