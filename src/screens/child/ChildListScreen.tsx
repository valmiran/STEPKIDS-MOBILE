import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { childService } from '../../services/api/childService';
import { Child } from '../../types/child';

export default function ChildListScreen() {
  const [children, setChildren] = useState<Child[]>([]);
  const navigation = useNavigation<any>();

  async function loadChildren() {
    try {
      const data = await childService.getChildren();
      setChildren(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as crianças.');
    }
  }

  useEffect(() => {
    loadChildren();
  }, []);

  function handleCreateChild() {
    navigation.navigate('CreateChild');
  }

  function handleEditChild(child: Child) {
    navigation.navigate('EditChild', { child });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crianças</Text>

      <FlatList
        data={children}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleEditChild(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>Idade: {item.age}</Text>
            {item.diagnosis ? (
              <Text style={styles.info}>Diagnóstico: {item.diagnosis}</Text>
            ) : null}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma criança cadastrada.</Text>
        }
        contentContainerStyle={
          children.length === 0 ? styles.emptyContainer : undefined
        }
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateChild}>
        <Text style={styles.buttonText}>Cadastrar criança</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#4A5568',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#718096',
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#3182CE',
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});