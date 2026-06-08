import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CheckCircle2,
  ChevronRight,
  Plus,
  Star,
} from 'lucide-react-native';

import AppHeader from '../../components/common/AppHeader';
import Button from '../../components/common/Button';
import { useActivities } from '../../hooks/useActivities';
import { useChildren } from '../../hooks/useChildren';
import { colors } from '../../theme';

export default function ActivityListScreen({ navigation }: any) {
  const { activities, loading, reload } = useActivities();
  const { children, loading: loadingChildren } = useChildren();

  const [selectedChildId, setSelectedChildId] = useState('');

  const selectedChild = useMemo(() => {
    return children.find((child) => child.id === selectedChildId);
  }, [children, selectedChildId]);

  function toggleChildSelection(childId: string) {
    setSelectedChildId((current) => (current === childId ? '' : childId));
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Atividades Educativas"
        subtitle="Gestão dos pais"
        fallbackRoute="ParentArea"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Star size={34} color={colors.white} />
          </View>

          <View style={styles.heroTextBox}>
            <Text style={styles.title}>Atividades Educativas</Text>

            <Text style={styles.description}>
              Gerencie atividades, selecione uma criança e acompanhe conteúdos que ajudam na jornada do Pé de Herói.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Selecionar criança</Text>

        <Text style={styles.sectionDescription}>
          Toque em uma criança para selecionar. Toque novamente para remover a seleção.
        </Text>

        {loadingChildren ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>Carregando crianças...</Text>
          </View>
        ) : (
          <FlatList
            data={children}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.childrenList}
            renderItem={({ item }) => {
              const selected = selectedChildId === item.id;

              return (
                <TouchableOpacity
                  style={[
                    styles.childSelectorCard,
                    selected && styles.childSelectorCardActive,
                  ]}
                  activeOpacity={0.86}
                  onPress={() => toggleChildSelection(item.id)}
                >
                  <View
                    style={[
                      styles.childAvatar,
                      selected && styles.childAvatarActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.childAvatarText,
                        selected && styles.childAvatarTextActive,
                      ]}
                    >
                      {item.name?.charAt(0)?.toUpperCase() || 'C'}
                    </Text>
                  </View>

                  <View style={styles.childInfo}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.childName,
                        selected && styles.childNameActive,
                      ]}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={[
                        styles.childMeta,
                        selected && styles.childMetaActive,
                      ]}
                    >
                      Nível {item.level || 1} • {item.totalExp || 0} XP
                    </Text>
                  </View>

                  {selected && <CheckCircle2 size={18} color={colors.white} />}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyChildrenBox}>
                <Text style={styles.emptyChildrenText}>
                  Nenhuma criança cadastrada.
                </Text>
              </View>
            }
          />
        )}

        <View style={styles.createBox}>
          <View style={styles.createTextBox}>
            <Text style={styles.createTitle}>Criar atividade personalizada</Text>

            <Text style={styles.createDescription}>
              Crie atividades com ícone, descrição, XP e moedas para apoiar a criança na rotina.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.createButton}
            activeOpacity={0.86}
            onPress={() => navigation.navigate('CreateActivity')}
          >
            <Plus size={24} color={colors.white} strokeWidth={3} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          {selectedChild
            ? `Atividades de ${selectedChild.name}`
            : 'Atividades cadastradas'}
        </Text>

        <Text style={styles.sectionDescription}>
          As atividades listadas aqui poderão ser usadas como missões educativas no Pé de Herói.
        </Text>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>Carregando atividades...</Text>
          </View>
        ) : (
          <View style={styles.activitiesList}>
            {activities.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.activityCard}
                activeOpacity={0.86}
              >
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>{item.icon || '⭐'}</Text>
                </View>

                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{item.title}</Text>

                  <Text style={styles.activityDescription}>
                    {item.description}
                  </Text>

                  <View style={styles.badgeRow}>
                    <View style={styles.expBadge}>
                      <Text style={styles.badgeText}>
                        +{item.expReward || 0} XP
                      </Text>
                    </View>

                    <View style={styles.goldBadge}>
                      <Text style={styles.badgeText}>
                        🪙 +{item.goldReward || 0}
                      </Text>
                    </View>
                  </View>
                </View>

                <ChevronRight size={20} color={colors.muted} />
              </TouchableOpacity>
            ))}

            {activities.length === 0 && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>⭐</Text>
                <Text style={styles.emptyTitle}>Nenhuma atividade cadastrada</Text>
                <Text style={styles.emptyText}>
                  Crie uma atividade personalizada para começar.
                </Text>
              </View>
            )}
          </View>
        )}

        <Button
          title="Atualizar atividades"
          variant="secondary"
          onPress={reload}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 120 },
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
  heroTextBox: { flex: 1 },
  title: { fontSize: 24, fontWeight: '900', color: colors.white, marginBottom: 6 },
  description: {
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '600',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 6,
  },
  sectionDescription: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 12,
  },
  loadingBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loadingText: {
    marginTop: 8,
    color: colors.textLight,
    fontWeight: '700',
  },
  childrenList: { paddingBottom: 14, gap: 10 },
  childSelectorCard: {
    width: 260,
    minHeight: 72,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  childSelectorCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  childAvatar: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  childAvatarActive: { backgroundColor: 'rgba(255,255,255,0.22)' },
  childAvatarText: {
    color: colors.primaryDark,
    fontSize: 20,
    fontWeight: '900',
  },
  childAvatarTextActive: { color: colors.white },
  childInfo: { flex: 1 },
  childName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 3,
  },
  childNameActive: { color: colors.white },
  childMeta: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '700',
  },
  childMetaActive: { color: 'rgba(255,255,255,0.84)' },
  emptyChildrenBox: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    width: 260,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyChildrenText: {
    color: colors.textLight,
    fontWeight: '700',
    textAlign: 'center',
  },
  createBox: {
    backgroundColor: colors.accentSoft,
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createTextBox: { flex: 1, paddingRight: 12 },
  createTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  createDescription: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
  },
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activitiesList: { marginBottom: 16 },
  activityCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 22,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 26 },
  activityInfo: { flex: 1 },
  activityTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
    color: colors.text,
  },
  activityDescription: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 8,
  },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  expBadge: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  goldBadge: {
    backgroundColor: colors.yellow,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeText: { fontWeight: '900', fontSize: 12, color: colors.text },
  emptyBox: { alignItems: 'center', padding: 26 },
  emptyIcon: { fontSize: 42, marginBottom: 10 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
    color: colors.text,
  },
  emptyText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
});