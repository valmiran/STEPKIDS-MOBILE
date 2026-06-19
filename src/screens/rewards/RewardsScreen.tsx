import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CheckCircle2,
  Gift,
  Lock,
  Sparkles,
} from 'lucide-react-native';

import AppHeader from '../../components/common/AppHeader';
import Button from '../../components/common/Button';
import { useChildren } from '../../hooks/useChildren';
import { useRewards } from '../../hooks/useRewards';
import { rewardsService } from '../../services/api/rewardsService';
import { DailyCheckInData, DailyCheckInReward } from '../../types/reward';
import { colors } from '../../theme';

function formatDate(dateISO?: string) {
  if (!dateISO) return '';

  const date = new Date(dateISO);

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
}

function isSameDay(dateISO?: string) {
  if (!dateISO) return false;
  return dateISO.split('T')[0] === new Date().toISOString().split('T')[0];
}

export default function RewardsScreen({ navigation }: any) {
  const { children, loading: loadingChildren } = useChildren();

  const [childId, setChildId] = useState('');
  const [dailyCheckIn, setDailyCheckIn] = useState<DailyCheckInData | null>(
    null
  );
  const [dailyRewards, setDailyRewards] = useState<DailyCheckInReward[]>([]);
  const [loadingCheckIn, setLoadingCheckIn] = useState(false);

  const { rewards, loading, redeemReward, reload } = useRewards(childId);

  const selectedChild = useMemo(() => {
    return children.find((child) => child.id === childId);
  }, [children, childId]);

  const todayReward = useMemo(() => {
    if (!dailyCheckIn) return null;
    return dailyRewards.find((item) => item.day === dailyCheckIn.currentDay);
  }, [dailyCheckIn, dailyRewards]);

  const alreadyCollectedToday = isSameDay(dailyCheckIn?.lastCollectedAt);

  async function loadDailyCheckIn(selectedChildId: string) {
    if (!selectedChildId) return;

    try {
      setLoadingCheckIn(true);

      const rewardsList = rewardsService.getDailyCheckInRewards();
      const data = await rewardsService.getDailyCheckIn(selectedChildId);

      setDailyRewards(rewardsList);
      setDailyCheckIn(data);
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível carregar o check-in.'
      );
    } finally {
      setLoadingCheckIn(false);
    }
  }

  async function handleCollectDailyCheckIn() {
    if (!childId) {
      Alert.alert(
        'Escolha o herói ou heroína',
        'Escolha o herói ou heroína que vai receber a recompensa.'
      );
      return;
    }

    try {
      const updated = await rewardsService.collectDailyCheckIn(childId);

      setDailyCheckIn(updated);

      Alert.alert(
        'Check-in coletado!',
        `${selectedChild?.name || 'O herói'} recebeu a recompensa diária da jornada.`
      );
    } catch (error: any) {
      Alert.alert(
        'Atenção',
        error?.message || 'Não foi possível coletar o check-in diário.'
      );
    }
  }

  async function handleRedeem(rewardId: string) {
    if (!childId) {
      Alert.alert(
        'Escolha o herói ou heroína',
        'Escolha o herói ou heroína que vai receber a recompensa.'
      );
      return;
    }

    try {
      await redeemReward(rewardId);

      Alert.alert(
        'Recompensa coletada!',
        'A recompensa semanal foi adicionada à jornada do herói ou heroína.'
      );

      await reload();
    } catch (error: any) {
      Alert.alert(
        'Atenção',
        error?.message || 'Não foi possível resgatar esta recompensa.'
      );
    }
  }

  useEffect(() => {
    if (childId) {
      loadDailyCheckIn(childId);
    } else {
      setDailyCheckIn(null);
      setDailyRewards([]);
    }
  }, [childId]);

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Recompensas da Jornada"
        subtitle="Prêmios do herói"
        fallbackRoute="ChildArea"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Gift size={40} color={colors.white} />
          </View>

          <View style={styles.heroTextBox}>
            <Text style={styles.title}>Baú de Recompensas</Text>

            <Text style={styles.description}>
              Escolha o herói ou heroína, colete prêmios, ganhe XP, receba moedas e fortaleça a jornada.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeaderCard}>
          <Text style={styles.sectionEmoji}>🦸</Text>

          <View style={styles.sectionHeaderTextBox}>
            <Text style={styles.sectionTitle}>Escolha o herói ou heroína</Text>

            <Text style={styles.sectionDescription}>
              Role para o lado e escolha quem vai receber as recompensas da jornada.
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
              const selected = childId === item.id;

              return (
                <TouchableOpacity
                  style={[
                    styles.childSelectorCard,
                    selected && styles.childSelectorCardActive,
                  ]}
                  activeOpacity={0.86}
                  onPress={() =>
                    setChildId((current) =>
                      current === item.id ? '' : item.id
                    )
                  }
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
                      ⚡ {item.totalExp || 0} XP • 🪙 {item.goldCoins || 0}
                    </Text>
                  </View>

                  {selected && (
                    <CheckCircle2 size={22} color={colors.white} />
                  )}
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

        <View style={styles.checkInCard}>
          <View style={styles.checkInHeader}>
            <View style={styles.checkInTitleBox}>
              <Text style={styles.checkInEmoji}>🎁</Text>

              <View>
                <Text style={styles.checkInTitle}>Check-in da Jornada</Text>
                <Text style={styles.checkInSubtitle}>Ciclo mágico de 28 dias</Text>
              </View>
            </View>

            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>
                Dia {dailyCheckIn?.currentDay || 1}
              </Text>
            </View>
          </View>

          <Text style={styles.checkInText}>
            Cada acesso diário fortalece a jornada, incentiva o uso da órtese e ajuda na evolução do herói ou heroína.
          </Text>

          {loadingCheckIn ? (
            <View style={styles.checkInLoading}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.loadingText}>Carregando check-in...</Text>
            </View>
          ) : todayReward ? (
            <View style={styles.todayRewardBox}>
              <Sparkles size={24} color={colors.primaryDark} />

              <View style={styles.todayRewardTextBox}>
                <Text style={styles.todayRewardTitle}>
                  Recompensa de hoje
                </Text>

                <Text style={styles.todayRewardText}>
                  ⚡ +{todayReward.exp} XP
                  {todayReward.coins > 0
                    ? ` • 🪙 +${todayReward.coins} moedas`
                    : ''}
                  {todayReward.medal ? ` • 🏅 ${todayReward.medal}` : ''}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.todayRewardBox}>
              <Text style={styles.todayRewardText}>
                Escolha o herói ou heroína para carregar o check-in.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.collectButton,
              alreadyCollectedToday && styles.collectButtonDone,
            ]}
            activeOpacity={0.86}
            onPress={handleCollectDailyCheckIn}
          >
            {alreadyCollectedToday ? (
              <>
                <CheckCircle2 size={20} color={colors.textLight} />
                <Text style={styles.collectButtonDoneText}>
                  Check-in coletado hoje
                </Text>
              </>
            ) : (
              <Text style={styles.collectButtonText}>
                Coletar prêmio diário
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.daysGrid}>
            {dailyRewards.map((reward) => {
              const currentDay = dailyCheckIn?.currentDay || 1;
              const isCurrent = reward.day === currentDay;
              const isCollectedToday = isCurrent && alreadyCollectedToday;

              return (
                <View
                  key={reward.day}
                  style={[
                    styles.dayBox,
                    isCurrent && styles.dayBoxCurrent,
                    isCollectedToday && styles.dayBoxCollected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayBoxText,
                      isCurrent && styles.dayBoxTextCurrent,
                    ]}
                  >
                    {reward.day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionHeaderCard}>
          <Text style={styles.sectionEmoji}>🏆</Text>

          <View style={styles.sectionHeaderTextBox}>
            <Text style={styles.sectionTitle}>Recompensas semanais</Text>

            <Text style={styles.sectionDescription}>
              Colete prêmios especiais conforme a pontuação do herói ou heroína.
            </Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Carregando recompensas...</Text>
          </View>
        ) : (
          <View>
            {rewards.map((item) => {
              const isCollectedRecently =
                item.lastRedeemedAt && !item.unlocked;

              const status = item.unlocked
                ? 'Disponível'
                : isCollectedRecently
                  ? 'Disponível em breve'
                  : 'Bloqueada';

              return (
                <View
                  key={item.id}
                  style={[
                    styles.rewardCard,
                    isCollectedRecently && styles.rewardCardCollected,
                  ]}
                >
                  <View style={styles.rewardIcon}>
                    <Text style={styles.rewardEmoji}>
                      {item.unlocked
                        ? '⭐'
                        : isCollectedRecently
                          ? '✅'
                          : '🔒'}
                    </Text>
                  </View>

                  <View style={styles.rewardContent}>
                    <Text style={styles.rewardTitle}>{item.title}</Text>

                    <Text style={styles.rewardDescription}>
                      {item.description}
                    </Text>

                    <View style={styles.badgeRow}>
                      <View style={styles.pointsBadge}>
                        <Text style={styles.badgeText}>
                          🏅 {item.points_required} pts
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.statusBadge,
                          item.unlocked
                            ? styles.availableBadge
                            : styles.lockedBadge,
                        ]}
                      >
                        <Text style={styles.badgeText}>{status}</Text>
                      </View>
                    </View>

                    {item.nextAvailableAt ? (
                      <Text style={styles.nextAvailableText}>
                        Próxima coleta: {formatDate(item.nextAvailableAt)}
                      </Text>
                    ) : null}

                    <TouchableOpacity
                      style={[
                        styles.redeemButton,
                        !item.unlocked && styles.disabledButton,
                      ]}
                      disabled={!item.unlocked}
                      onPress={() => handleRedeem(item.id)}
                    >
                      {item.unlocked ? (
                        <Text style={styles.redeemText}>Coletar recompensa</Text>
                      ) : isCollectedRecently ? (
                        <View style={styles.buttonRow}>
                          <CheckCircle2 size={18} color={colors.textLight} />
                          <Text style={styles.disabledText}>
                            Disponível em breve
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.buttonRow}>
                          <Lock size={18} color={colors.textLight} />
                          <Text style={styles.disabledText}>Bloqueada</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            {rewards.length === 0 && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>🎁</Text>
                <Text style={styles.emptyTitle}>
                  Nenhuma recompensa carregada
                </Text>
                <Text style={styles.emptyText}>
                  Escolha o herói ou heroína para visualizar as recompensas.
                </Text>
              </View>
            )}
          </View>
        )}

        <Button
          title="Atualizar recompensas"
          variant="secondary"
          onPress={reload}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primarySoft },
  content: {
    padding: 18,
    paddingBottom: 120,
  },

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
  heroTextBox: {
    flex: 1,
  },
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
  childrenList: {
    paddingBottom: 14,
    gap: 10,
  },
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
  childAvatarActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  childAvatarText: {
    color: colors.primaryDark,
    fontSize: 24,
    fontWeight: '900',
  },
  childAvatarTextActive: {
    color: colors.white,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 4,
  },
  childNameActive: {
    color: colors.white,
  },
  childMeta: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: '800',
  },
  childMetaActive: {
    color: 'rgba(255,255,255,0.88)',
  },
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

  checkInCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: colors.white,
  },
  checkInHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkInTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkInEmoji: {
    fontSize: 34,
    marginRight: 10,
  },
  checkInTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
  checkInSubtitle: {
    color: colors.textLight,
    fontWeight: '800',
    marginTop: 2,
    fontSize: 12,
  },
  dayBadge: {
    backgroundColor: colors.yellow,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: colors.white,
  },
  dayBadgeText: {
    color: colors.primaryDark,
    fontWeight: '900',
    fontSize: 13,
  },
  checkInText: {
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: 14,
    fontSize: 13,
  },
  checkInLoading: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  todayRewardBox: {
    backgroundColor: colors.accentSoft,
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: colors.white,
  },
  todayRewardTextBox: {
    flex: 1,
  },
  todayRewardTitle: {
    color: colors.text,
    fontWeight: '900',
    marginBottom: 3,
    fontSize: 16,
  },
  todayRewardText: {
    color: colors.textLight,
    fontWeight: '800',
    lineHeight: 19,
    fontSize: 13,
  },
  collectButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.white,
  },
  collectButtonDone: {
    backgroundColor: '#DADADA',
    flexDirection: 'row',
    gap: 7,
  },
  collectButtonText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 15,
  },
  collectButtonDoneText: {
    color: colors.textLight,
    fontWeight: '900',
    fontSize: 14,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: colors.surfaceSoft,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayBoxCurrent: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayBoxCollected: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  dayBoxText: {
    color: colors.textLight,
    fontWeight: '900',
    fontSize: 13,
  },
  dayBoxTextCurrent: {
    color: colors.white,
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
    marginTop: 9,
    color: colors.textLight,
    fontWeight: '800',
  },

  rewardCard: {
    backgroundColor: colors.surface,
    borderRadius: 26,
    padding: 15,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: colors.white,
    flexDirection: 'row',
    gap: 12,
  },
  rewardCardCollected: {
    backgroundColor: colors.surfaceSoft,
  },
  rewardIcon: {
    width: 64,
    height: 64,
    borderRadius: 25,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardEmoji: {
    fontSize: 32,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 5,
    color: colors.text,
  },
  rewardDescription: {
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 10,
    fontSize: 13,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  pointsBadge: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 11,
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 11,
  },
  availableBadge: {
    backgroundColor: colors.yellow,
  },
  lockedBadge: {
    backgroundColor: '#EFEFEF',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.text,
  },
  nextAvailableText: {
    color: colors.textLight,
    fontWeight: '800',
    fontSize: 12,
    marginBottom: 9,
  },
  redeemButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  disabledButton: {
    backgroundColor: '#DADADA',
  },
  redeemText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 15,
  },
  disabledText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '900',
    marginLeft: 6,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  emptyBox: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 26,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.white,
    marginBottom: 16,
  },
  emptyIcon: {
    fontSize: 46,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 6,
    color: colors.text,
  },
  emptyText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 20,
  },
});