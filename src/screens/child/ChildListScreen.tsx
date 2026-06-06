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
import {
  Baby,
  ChevronRight,
  Eye,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
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
      <AppHeader
        navigation={navigation}
        title="Minhas Crianças"
        subtitle="Crianças cadastradas"
        fallbackRoute="ParentArea"
      />

      <View style={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Baby size={34} color={colors.white} />
          </View>

          <View style={styles.heroTextBox}>
            <Text style={styles.title}>Crianças cadastradas</Text>
            <Text style={styles.subtitle}>
              Consulte os perfis infantis, acompanhe dados principais e acesse
              detalhes de cada criança.
            </Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.primary} />
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
              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.cardMainArea}
                  activeOpacity={0.86}
                  onPress={() => handleViewChild(item)}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {item.name?.charAt(0)?.toUpperCase() || 'C'}
                    </Text>
                  </View>

                  <View style={styles.cardContent}>
                    <Text style={styles.name}>{item.name}</Text>

                    <Text style={styles.info}>
                      {item.age} anos • {item.diagnosis || 'Diagnóstico não informado'}
                    </Text>

                    <View style={styles.badgeRow}>
                      <View style={styles.badgePrimary}>
                        <Text style={styles.badgeText}>Nível {item.level || 1}</Text>
                      </View>

                      <View style={styles.badgeAccent}>
                        <Text style={styles.badgeText}>
                          {item.totalPoints || 0} pts
                        </Text>
                      </View>

                      <View style={styles.badgeSoft}>
                        <Text style={styles.badgeSoftText}>
                          {item.goldCoins || 0} moedas
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.hoursText}>
                      {item.totalOrthosisHours || 0}h totais de uso da órtese
                    </Text>
                  </View>

                  <ChevronRight size={20} color={colors.muted} />
                </TouchableOpacity>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    activeOpacity={0.84}
                    onPress={() => handleViewChild(item)}
                  >
                    <Eye size={16} color={colors.primaryDark} />
                    <Text style={styles.viewText}>Visualizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.editButton}
                    activeOpacity={0.84}
                    onPress={() => handleEditChild(item)}
                  >
                    <Pencil size={16} color={colors.secondaryDark} />
                    <Text style={styles.editText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    activeOpacity={0.84}
                    onPress={() => handleDeleteChild(item)}
                  >
                    <Trash2 size={16} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <View style={styles.emptyIconBox}>
                  <Baby size={38} color={colors.primaryDark} />
                </View>

                <Text style={styles.emptyTitle}>
                  Nenhuma criança cadastrada
                </Text>

                <Text style={styles.emptyText}>
                  Use o botão + para cadastrar a primeira criança e iniciar o
                  acompanhamento no Pé de Herói.
                </Text>
              </View>
            }
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.86}
        onPress={handleCreateChild}
      >
        <Plus size={34} color={colors.white} strokeWidth={3} />
      </TouchableOpacity>

      <BottomNav navigation={navigation} area="parent" active="children" visible />
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
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 26,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroIcon: {
    width: 66,
    height: 66,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  heroTextBox: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '600',
    lineHeight: 19,
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
    paddingBottom: 110,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 110,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardMainArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.primaryDark,
    fontSize: 24,
    fontWeight: '900',
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  info: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  badgePrimary: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeAccent: {
    backgroundColor: colors.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeSoft: {
    backgroundColor: colors.secondarySoft,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.text,
  },
  badgeSoftText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.secondaryDark,
  },
  hoursText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  viewButton: {
    flex: 1,
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  viewText: {
    color: colors.primaryDark,
    fontWeight: '900',
    fontSize: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: colors.secondarySoft,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  editText: {
    color: colors.secondaryDark,
    fontWeight: '900',
    fontSize: 12,
  },
  deleteButton: {
    width: 48,
    backgroundColor: colors.dangerSoft,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBox: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyIconBox: {
    width: 78,
    height: 78,
    borderRadius: 28,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 94,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    elevation: 10,
    borderWidth: 4,
    borderColor: colors.background,
  },
});