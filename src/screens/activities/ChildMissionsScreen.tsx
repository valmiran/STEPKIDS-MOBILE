import React, { useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
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
  Sparkles,
  Target,
} from 'lucide-react-native';

import AppHeader from '../../components/common/AppHeader';
import Button from '../../components/common/Button';
import { useActivities } from '../../hooks/useActivities';
import { useChildren } from '../../hooks/useChildren';
import { childService } from '../../services/api/childService';
import { colors } from '../../theme';

type Mission = {
  id: string;
  title: string;
  description: string;
  icon: string;
  expReward: number;
  goldReward: number;
  realLifeReward?: string;
  criterion: string;
  isCustom: boolean;
};

type MissionCompletion = {
  [key: string]: string;
};

const DEFAULT_MISSIONS: Mission[] = [
  {
    id: 'default_use_orthosis',
    title: 'Usar a órtese hoje',
    description:
      'Missão concluída quando o herói ou heroína cumprir a rotina de uso da órtese.',
    icon: '🦶',
    expReward: 20,
    goldReward: 10,
    realLifeReward:
      'A jornada fica mais forte quando a órtese faz parte da rotina.',
    criterion: 'Registrar ou cumprir o uso da órtese no dia.',
    isCustom: false,
  },
  {
    id: 'default_checklist',
    title: 'Registrar checklist',
    description:
      'Missão concluída quando o checklist diário da jornada for registrado.',
    icon: '✅',
    expReward: 15,
    goldReward: 5,
    realLifeReward:
      'Cada cuidado registrado ajuda o herói ou heroína a evoluir.',
    criterion: 'Ter checklist do dia registrado.',
    isCustom: false,
  },
  {
    id: 'default_activity',
    title: 'Completar atividade educativa',
    description:
      'Missão concluída ao finalizar uma atividade educativa do Pé de Herói.',
    icon: '📚',
    expReward: 25,
    goldReward: 10,
    realLifeReward:
      'Aprender também faz parte da jornada de cuidado e evolução.',
    criterion: 'Concluir uma missão ou atividade.',
    isCustom: false,
  },
  {
    id: 'default_game',
    title: 'Jogar Monte a Órtese do Herói',
    description:
      'Missão concluída quando o herói ou heroína montar a órtese na ordem correta.',
    icon: '🧩',
    expReward: 30,
    goldReward: 15,
    realLifeReward:
      'A armadura do cuidado fica mais forte a cada etapa concluída.',
    criterion: 'Jogar Monte a Órtese do Herói.',
    isCustom: false,
  },
];

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

export default function ChildMissionsScreen({ navigation }: any) {
  const { activities, loading, reload } = useActivities();
  const { children, loading: loadingChildren } = useChildren();

  const [selectedChildId, setSelectedChildId] = useState('');
  const [completedMissions, setCompletedMissions] =
    useState<MissionCompletion>({});
  const [animatedMissionId, setAnimatedMissionId] = useState('');

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const selectedChild = useMemo(() => {
    return children.find((child) => child.id === selectedChildId);
  }, [children, selectedChildId]);

  const customMissions: Mission[] = useMemo(() => {
    return activities.map((activity) => ({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      icon: activity.icon || '🎯',
      expReward: activity.expReward || 10,
      goldReward: activity.goldReward || 5,
      realLifeReward: activity.realLifeReward,
      criterion: 'Missão personalizada criada para a jornada do herói.',
      isCustom: true,
    }));
  }, [activities]);

  const allMissions: Mission[] = useMemo(() => {
    return [...DEFAULT_MISSIONS, ...customMissions];
  }, [customMissions]);

  function toggleChildSelection(childId: string) {
    setSelectedChildId((current) => (current === childId ? '' : childId));
  }

  function missionKey(missionId: string) {
    return `${selectedChildId}_${missionId}_${getTodayKey()}`;
  }

  function isMissionCompletedToday(missionId: string) {
    return completedMissions[missionKey(missionId)] === getTodayKey();
  }

  function runCompletionAnimation(missionId: string) {
    setAnimatedMissionId(missionId);
    scaleAnim.setValue(0.94);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.04,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => setAnimatedMissionId(''));
  }

  async function handleCompleteMission(mission: Mission) {
    if (!selectedChildId) {
      Alert.alert(
        'Escolha o herói ou heroína',
        'Toque no herói ou heroína que vai concluir essa missão.'
      );
      return;
    }

    if (isMissionCompletedToday(mission.id)) {
      Alert.alert(
        'Missão já concluída',
        'Essa missão já foi recolhida hoje. Amanhã a jornada pode continuar.'
      );
      return;
    }

    try {
      await childService.addChildRewards(selectedChildId, {
        exp: Number(mission.expReward || 0),
        coins: Number(mission.goldReward || 0),
        points: Number(mission.expReward || 0),
        reason: `Missão concluída: ${mission.title}`,
      });

      setCompletedMissions((current) => ({
        ...current,
        [missionKey(mission.id)]: getTodayKey(),
      }));

      runCompletionAnimation(mission.id);

      Alert.alert(
        'Missão concluída!',
        `${selectedChild?.name || 'O herói'} recebeu +${mission.expReward} XP e +${mission.goldReward} moedas.`
      );
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível concluir a missão.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Missões da Jornada"
        subtitle="Desafios do herói"
        fallbackRoute="ChildArea"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Target size={38} color={colors.white} />
          </View>

          <View style={styles.heroTextBox}>
            <Text style={styles.title}>Missões da Jornada</Text>

            <Text style={styles.description}>
              Escolha o herói ou heroína, complete desafios, ganhe XP, receba moedas e avance na aventura do Pé de Herói.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeaderCard}>
          <Text style={styles.sectionEmoji}>🦸</Text>

          <View style={styles.sectionHeaderTextBox}>
            <Text style={styles.sectionTitle}>Escolha o herói ou heroína</Text>

            <Text style={styles.sectionDescription}>
              Toque no perfil que vai concluir as missões. Se tocar novamente no mesmo perfil, a seleção será removida.
            </Text>
          </View>
        </View>

        {loadingChildren ? (
          <View style={styles.loadingChildrenBox}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>Carregando heróis...</Text>
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
                      {item.name?.charAt(0)?.toUpperCase() || 'H'}
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
                      ⭐ Nível {item.level || 1} • {item.totalExp || 0} XP
                    </Text>
                  </View>

                  {selected && <CheckCircle2 size={22} color={colors.white} />}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyChildrenBox}>
                <Text style={styles.emptyChildrenIcon}>🧒</Text>
                <Text style={styles.emptyChildrenText}>
                  Nenhum herói cadastrado.
                </Text>
              </View>
            }
          />
        )}

        <View style={styles.createMissionBox}>
          <View style={styles.createMissionEmojiBox}>
            <Text style={styles.createMissionEmoji}>✨</Text>
          </View>

          <View style={styles.createMissionTextBox}>
            <Text style={styles.createMissionTitle}>
              Missões personalizadas
            </Text>

            <Text style={styles.createMissionDescription}>
              As missões criadas pelo responsável aparecem aqui para o herói ou heroína concluir.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.createMissionButton}
            activeOpacity={0.86}
            onPress={() => navigation.navigate('CreateActivity')}
          >
            <Plus size={24} color={colors.white} strokeWidth={3} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeaderCard}>
          <Text style={styles.sectionEmoji}>🎯</Text>

          <View style={styles.sectionHeaderTextBox}>
            <Text style={styles.sectionTitle}>Desafios disponíveis</Text>

            <Text style={styles.sectionDescription}>
              Cada missão concluída fortalece a jornada, dá XP, moedas e ajuda na evolução.
            </Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Carregando desafios...</Text>
          </View>
        ) : (
          <View style={styles.missionList}>
            {allMissions.map((item) => {
              const completed = isMissionCompletedToday(item.id);
              const isAnimated = animatedMissionId === item.id;

              const cardContent = (
                <View style={[styles.card, completed && styles.cardCompleted]}>
                  <View style={styles.iconBox}>
                    <Text style={styles.icon}>{item.icon || '🎯'}</Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.missionTitle}>{item.title}</Text>

                    <Text style={styles.missionDescription}>
                      {item.description}
                    </Text>

                    <View style={styles.badgeRow}>
                      <View style={styles.expBadge}>
                        <Text style={styles.badgeText}>
                          ⚡ +{item.expReward} XP
                        </Text>
                      </View>

                      <View style={styles.goldBadge}>
                        <Text style={styles.badgeText}>
                          🪙 +{item.goldReward}
                        </Text>
                      </View>

                      {item.isCustom ? (
                        <View style={styles.customBadge}>
                          <Text style={styles.customBadgeText}>
                            Especial
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <View style={styles.criterionBox}>
                      <Sparkles size={16} color={colors.primaryDark} />
                      <Text style={styles.criterionText}>
                        Como concluir: {item.criterion}
                      </Text>
                    </View>

                    {item.realLifeReward ? (
                      <Text style={styles.realReward}>
                        💜 Motivação: {item.realLifeReward}
                      </Text>
                    ) : null}

                    <TouchableOpacity
                      style={[
                        styles.completeButton,
                        completed && styles.completeButtonDone,
                      ]}
                      activeOpacity={0.84}
                      onPress={() => handleCompleteMission(item)}
                    >
                      {completed ? (
                        <>
                          <CheckCircle2 size={20} color={colors.textLight} />
                          <Text style={styles.completeButtonDoneText}>
                            Missão concluída
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.completeButtonText}>
                            Concluir missão
                          </Text>
                          <ChevronRight size={20} color={colors.white} />
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );

              if (isAnimated) {
                return (
                  <Animated.View
                    key={item.id}
                    style={{ transform: [{ scale: scaleAnim }] }}
                  >
                    {cardContent}
                  </Animated.View>
                );
              }

              return <View key={item.id}>{cardContent}</View>;
            })}
          </View>
        )}

        <Button title="Atualizar missões" variant="secondary" onPress={reload} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primarySoft },
  scroll: { flex: 1 },
  content: { padding: 18, paddingBottom: 120 },

  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 32,
    padding: 22,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  heroIcon: {
    width: 78,
    height: 78,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  heroTextBox: { flex: 1 },
  title: {
    fontSize: 27,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 7,
  },
  description: {
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '800',
    lineHeight: 22,
    fontSize: 14,
  },

  sectionHeaderCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  sectionEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  sectionHeaderTextBox: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  sectionDescription: {
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 20,
    fontSize: 13,
  },

  loadingChildrenBox: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.white,
  },
  childrenList: { paddingBottom: 14, gap: 10 },
  childSelectorCard: {
    width: 278,
    minHeight: 82,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 13,
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  childSelectorCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.accent,
  },
  childAvatar: {
    width: 56,
    height: 56,
    borderRadius: 22,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  childAvatarActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  childAvatarText: {
    color: colors.primaryDark,
    fontSize: 24,
    fontWeight: '900',
  },
  childAvatarTextActive: { color: colors.white },
  childInfo: { flex: 1 },
  childName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 4,
  },
  childNameActive: { color: colors.white },
  childMeta: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: '800',
  },
  childMetaActive: { color: 'rgba(255,255,255,0.88)' },
  emptyChildrenBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    width: 260,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
  },
  emptyChildrenIcon: {
    fontSize: 34,
    marginBottom: 6,
  },
  emptyChildrenText: {
    color: colors.textLight,
    fontWeight: '800',
    textAlign: 'center',
  },

  createMissionBox: {
    backgroundColor: colors.accentSoft,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createMissionEmojiBox: {
    width: 52,
    height: 52,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  createMissionEmoji: {
    fontSize: 28,
  },
  createMissionTextBox: { flex: 1, paddingRight: 12 },
  createMissionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  createMissionDescription: {
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 20,
    fontSize: 13,
  },
  createMissionButton: {
    width: 54,
    height: 54,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingBox: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    borderWidth: 2,
    borderColor: colors.white,
  },
  loadingText: {
    marginTop: 10,
    color: colors.textLight,
    fontWeight: '800',
  },

  missionList: { marginBottom: 16 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 26,
    padding: 15,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: colors.white,
    flexDirection: 'row',
    gap: 12,
  },
  cardCompleted: {
    backgroundColor: colors.successSoft,
    borderColor: colors.success,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 25,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 32 },
  info: { flex: 1 },
  missionTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 5,
    color: colors.text,
  },
  missionDescription: {
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 10,
    fontSize: 13,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  expBadge: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 11,
  },
  goldBadge: {
    backgroundColor: colors.yellow,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 11,
  },
  customBadge: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 11,
  },
  customBadgeText: {
    fontWeight: '900',
    fontSize: 12,
    color: colors.primaryDark,
  },
  badgeText: { fontWeight: '900', fontSize: 12, color: colors.text },
  criterionBox: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: colors.border,
  },
  criterionText: {
    flex: 1,
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  realReward: {
    color: colors.textLight,
    fontWeight: '800',
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 10,
    marginBottom: 11,
    lineHeight: 18,
    fontSize: 12,
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonDone: { backgroundColor: '#DADADA' },
  completeButtonText: {
    color: colors.white,
    fontWeight: '900',
    marginRight: 6,
    fontSize: 15,
  },
  completeButtonDoneText: {
    color: colors.textLight,
    fontWeight: '900',
    marginLeft: 6,
    fontSize: 14,
  },
});