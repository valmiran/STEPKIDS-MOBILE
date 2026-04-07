import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { childService } from '../../services/api/childService';

export default function EditChildScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const { child } = route.params;

  const [name, setName] = useState(child.name);
  const [age, setAge] = useState(String(child.age));

  async function handleUpdate() {
    try {
      await childService.updateChild(child.id, {
        name,
        age: Number(age),
      });

      Alert.alert('Sucesso', 'Atualizado!');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Criança</Text>

      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <TextInput value={age} onChangeText={setAge} style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
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
    backgroundColor: '#3182CE',
    borderRadius: 10,
  },
  buttonText: { color: '#FFF', textAlign: 'center' },
});