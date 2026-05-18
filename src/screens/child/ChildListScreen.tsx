import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { childService } from '../../services/api/childService';
import { Child } from '../../types/child';
import { colors } from '../../theme';

export default function ChildListScreen() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  async function loadChildren() {
    try {
      setLoading(true);
      const data = await childService.getChildren();
      setChildren(data);
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível carregar as crianças.'
      );
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadChildren();
    }, [])
  );

  function handleCreateChild() {
    navigation.navigate('CreateChild');
  }

  function handleEditChild(child: Child) {
    navigation.navigate('EditChild', { child });
  }

  function handleViewChild(child: Child) {
    navigation.navigate('ChildDetails', { child });
  }

  function handleDeleteChild(child: Child) {
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
              await loadChildren();
              Alert.alert('Sucesso', 'Criança removida com sucesso.');
            } catch (error: any) {
              Alert.alert(
                'Erro',
                error?.message || 'Não foi possível excluir a criança.'
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

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Crianças</Text>
            <Text style={styles.subtitle}>
              Gerencie os perfis cadastrados.
            </Text>
          </View>
        </View>

        <Button title="Cadastrar criança" onPress={handleCreateChild} />

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.lilacDark} />
            <Text style={styles.loadingText}>Carregando crianças...</Text>
          </View>
        ) : (
          <FlatList
            data={children}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              children.length === 0
                ? styles.emptyContainer
                : styles.listContent
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleViewChild(item)}
                onLongPress={() => handleDeleteChild(item)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.name?.charAt(0)?.toUpperCase() || 'C'}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>

                  <Text style={styles.info}>
                    Idade: {item.age} anos
                  </Text>

                  <Text style={styles.info}>
                    Diagnóstico: {item.diagnosis || 'Não informado'}
                  </Text>

                  <View style={styles.badgeRow}>
                    <View style={styles.badgeBlue}>
                      <Text style={styles.badgeText}>
                        Nível {item.level || 1}
                      </Text>
                    </View>

                    <View style={styles.badgeYellow}>
                      <Text style={styles.badgeText}>
                        {item.totalPoints || 0} pts
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.hoursText}>
                    {item.totalOrthosisHours || 0}h totais de órtese
                  </Text>

                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditChild(item)}
                    >
                      <Text style={styles.actionText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteChild(item)}
                    >
                      <Text style={styles.deleteActionText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>👶</Text>
                <Text style={styles.emptyTitle}>
                  Nenhuma criança cadastrada
                </Text>
                <Text style={styles.emptyText}>
                  Cadastre uma criança para iniciar o acompanhamento.
                </Text>
              </View>
            }
          />
        )}
      </View>

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
    flex: 1,
    padding: 18,
    paddingBottom: 90,
  },
  headerRow: {
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
    fontWeight: '600',
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.textLight,
    fontWeight: '700',
  },
  listContent: {
    paddingTop: 14,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.lilac,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 3,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  badgeBlue: {
    backgroundColor: colors.blue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  badgeYellow: {
    backgroundColor: colors.yellow,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '900',
  },
  hoursText: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: colors.blue,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#FFE1E1',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  actionText: {
    fontWeight: '900',
  },
  deleteActionText: {
    fontWeight: '900',
    color: '#B42318',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyBox: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
  },
});