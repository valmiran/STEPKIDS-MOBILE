import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { childService } from '../../services/api/childService';
import { useNavigation } from '@react-navigation/native';

export default function CreateChildScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const navigation = useNavigation();

  async function handleCreate() {
    try {
      await childService.createChild({
        name,
        age: Number(age),
      });

      Alert.alert('Sucesso', 'Criança cadastrada!');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível cadastrar.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Criança</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    padding: 16,
    backgroundColor: '#38A169',
    borderRadius: 10,
  },
  buttonText: { color: '#FFF', textAlign: 'center' },
});