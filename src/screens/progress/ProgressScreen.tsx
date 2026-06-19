import React, { useMemo, useState } from 'react';
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
  Award,
  CheckCircle2,
  ChevronUp,
  Crown,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from 'lucide-react-native';

import AppHeader from '../../components/common/AppHeader';
import Button from '../../components/common/Button';
import { useChildren } from '../../hooks/useChildren';
import { childService } from '../../services/api/childService';
import { colors } from '../../theme';

type LevelInfo = {
  level: number;
  title: string;
  requiredExp: number;
  reward: string;
  rank: string;
};

const LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: 'Primeiro Passo',
    requiredExp: 0,
    reward: 'Início da jornada',
    rank: 'Aprendiz do Herói',
  },
  {
    level: 2,
    title: 'Passo Confiante',
    requiredExp: 100,
    reward: 'Desbloqueia pequenas conquistas',
    rank: 'Aprendiz do Herói',
  },
  {
    level: 3,
    title: 'Rotina de Coragem',
    requiredExp: 250,
    reward: 'Mais força na jornada',
    rank: 'Aprendiz do Herói',
  },
  {
    level: 4,
    title: 'Cuidado Constante',
    requiredExp: 500,
    reward: 'Reconhecimento de evolução',
    rank: 'Aprendiz do Herói',
  },
  {
    level: 5,
    title: 'Estrela da Rotina',
    requiredExp: 900,
    reward: 'Título de dedicação',
    rank: 'Aprendiz do Herói',
  },
  {
    level: 6,
    title: 'Pequeno Campeão',
    requiredExp: 1300,
    reward: 'Nova patente: Pequeno Campeão',
    rank: 'Pequeno Campeão',
  },
  {
    level: 7,
    title: 'Defensor da Jornada',
    requiredExp: 1700,
    reward: 'Mais destaque no progresso',
    rank: 'Pequeno Campeão',
  },
  {
    level: 8,
    title: 'Guardião da Rotina',
    requiredExp: 2200,
    reward: 'Mais conquistas visuais',
    rank: 'Pequeno Campeão',
  },
  {
    level: 9,
    title: 'Campeão dos Passos',
    requiredExp: 2800,
    reward: 'Avanço na jornada',
    rank: 'Pequeno Campeão',
  },
  {
    level: 10,
    title: 'Guardião dos Passos',
    requiredExp: 3500,
    reward: 'Nova patente: Guardião dos Passos',
    rank: 'Guardião dos Passos',
  },
  {
    level: 11,
    title: 'Protetor da Órtese',
    requiredExp: 4300,
    reward: 'Maior prestígio na jornada',
    rank: 'Guardião dos Passos',
  },
  {
    level: 12,
    title: 'Mestre da Persistência',
    requiredExp: 5200,
    reward: 'Conquista de persistência',
    rank: 'Guardião dos Passos',
  },
  {
    level: 13,
    title: 'Lenda da Rotina',
    requiredExp: 6200,
    reward: 'Reconhecimento especial',
    rank: 'Guardião dos Passos',
  },
  {
    level: 14,
    title: 'Campeão da Evolução',
    requiredExp: 7300,
    reward: 'Preparação para o nível máximo',
    rank: 'Guardião dos Passos',
  },
  {
    level: 15,
    title: 'Herói da Órtese',
    requiredExp: 8500,
    reward: 'Patente máxima do Pé de Herói',
    rank: 'Herói da Órtese',
  },
];

function getCurrentLevelInfo(level: number) {
  return LEVELS.find((item) => item.level === level) || LEVELS[0];
}

function getNextLevelInfo(level: number) {
  return LEVELS.find((item) => item.level === level + 1) || null;
}

function getProgressPercent(currentExp: number, currentLevel: number) {
  const nextLevel = getNextLevelInfo(currentLevel);

  if (!nextLevel) {
    return 100;
  }

  const required = nextLevel.requiredExp;

  if (required <= 0) {
    return 100;
  }

  return Math.min(100, Math.round((currentExp / required) * 100));
}

export default function ProgressScreen({ navigation }: any) {
  const { children, loading, reload } = useChildren();

  const [selectedChildId, setSelectedChildId] = useState('');
  const [levelingUp, setLevelingUp] = useState(false);

  const selectedChild = useMemo(() => {
    return children.find((child) => child.id === selectedChildId);
  }, [children, selectedChildId]);

  const currentLevel = selectedChild?.level || 1;
  const currentExp = selectedChild?.totalExp || 0;
  const currentCoins = selectedChild?.goldCoins || 0;
  const totalPoints = selectedChild?.totalPoints || 0;

  const currentLevelInfo = getCurrentLevelInfo(currentLevel);
  const nextLevelInfo = getNextLevelInfo(currentLevel);
  const progressPercent = getProgressPercent(currentExp, currentLevel);

  async function handleLevelUp() {
    if (!selectedChildId || !selectedChild) {
      Alert.alert(
        'Selecione o herói ou heroína',
        'Escolha quem terá a evolução da jornada acompanhada.'
      );
      return;
    }

    if (!nextLevelInfo) {
      Alert.alert(
        'Nível máximo',
        'O herói ou heroína já alcançou o nível máximo: Herói da Órtese.'
      );
      return;
    }

    if (currentExp < nextLevelInfo.requiredExp) {
      Alert.alert(
        'XP insuficiente',
        `Para avançar para o nível ${nextLevelInfo.level}, são necessários ${nextLevelInfo.requiredExp} XP.`
      );
      return;
    }

    try {
      setLevelingUp(true);

      await childService.levelUpChild(selectedChildId);

      Alert.alert(
        'Parabéns!',
        `${selectedChild.name} avançou para o nível ${nextLevelInfo.level}: ${nextLevelInfo.title}.`
      );

      await reload();
    } catch (error: any) {
      Alert.alert(
        'Atenção',
        error?.message || 'Não foi possível avançar para o próximo nível.'
      );
    } finally {
      setLevelingUp(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Evolução da Jornada"
        subtitle="Nível, XP, moedas e ranking"
        fallbackRoute="ChildArea"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Trophy size={34} color={colors.white} />
          </View>

          <View style={styles.heroTextBox}>
            <Text style={styles.title}>Evolução da Jornada</Text>

            <Text style={styles.description}>
              Acompanhe o nível, XP, moedas, ranking e a evolução completa da jornada.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Escolha o herói ou heroína</Text>

        <Text style={styles.sectionDescription}>
          Role para o lado para selecionar quem terá a evolução acompanhada.
        </Text>

        {loading ? (
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
                  onPress={() => setSelectedChildId(item.id)}
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
                      Nível {item.level || 1} • {item.totalExp || 0} XP
                    </Text>
                  </View>

                  {selected && (
                    <CheckCircle2 size={18} color={colors.white} />
                  )}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyChildrenBox}>
                <Text style={styles.emptyChildrenText}>
                  Nenhum herói cadastrado.
                </Text>
              </View>
            }
          />
        )}

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>
                {selectedChild?.name || 'Selecione o herói ou heroína'}
              </Text>

              <Text style={styles.progressSubtitle}>
                {currentLevelInfo.rank}
              </Text>
            </View>

            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>Nv. {currentLevel}</Text>
            </View>
          </View>

          <View style={styles.rankBox}>
            <Crown size={22} color={colors.accent} />
            <View style={styles.rankTextBox}>
              <Text style={styles.rankTitle}>{currentLevelInfo.title}</Text>
              <Text style={styles.rankDescription}>
                {currentLevelInfo.reward}
              </Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Zap size={22} color={colors.primaryDark} />
              <Text style={styles.statNumber}>{currentExp}</Text>
              <Text style={styles.statLabel}>XP atual</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.coinEmoji}>🪙</Text>
              <Text style={styles.statNumber}>{currentCoins}</Text>
              <Text style={styles.statLabel}>Moedas</Text>
            </View>

            <View style={styles.statCard}>
              <Award size={22} color={colors.accent} />
              <Text style={styles.statNumber}>{totalPoints}</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>
          </View>

          <View style={styles.nextLevelBox}>
            <View style={styles.nextLevelHeader}>
              <Text style={styles.nextLevelTitle}>
                {nextLevelInfo
                  ? `Próximo nível: ${nextLevelInfo.level}`
                  : 'Nível máximo alcançado'}
              </Text>

              <Text style={styles.nextLevelValue}>
                {nextLevelInfo
                  ? `${currentExp}/${nextLevelInfo.requiredExp} XP`
                  : '100%'}
              </Text>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>

            <Text style={styles.nextLevelDescription}>
              {nextLevelInfo
                ? `Faltam ${Math.max(
                    0,
                    nextLevelInfo.requiredExp - currentExp
                  )} XP para avançar para ${nextLevelInfo.title}.`
                : 'A patente máxima da jornada foi alcançada.'}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.levelUpButton,
              (!nextLevelInfo ||
                !selectedChild ||
                currentExp < (nextLevelInfo?.requiredExp || 0)) &&
                styles.levelUpButtonDisabled,
            ]}
            activeOpacity={0.86}
            disabled={
              levelingUp ||
              !nextLevelInfo ||
              !selectedChild ||
              currentExp < (nextLevelInfo?.requiredExp || 0)
            }
            onPress={handleLevelUp}
          >
            {levelingUp ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <>
                <ChevronUp size={20} color={colors.white} />
                <Text style={styles.levelUpButtonText}>
                  Avançar para o próximo nível
                </Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.levelRuleText}>
            Ao avançar de nível, o XP necessário será consumido do total atual da jornada.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Níveis e Patentes</Text>

        <Text style={styles.sectionDescription}>
          A cada conquista, o herói ou heroína avança na jornada do Pé de Herói.
        </Text>

        {LEVELS.map((item) => {
          const achieved = currentLevel >= item.level;
          const next = nextLevelInfo?.level === item.level;

          return (
            <View
              key={item.level}
              style={[
                styles.levelItem,
                achieved && styles.levelItemAchieved,
                next && styles.levelItemNext,
              ]}
            >
              <View
                style={[
                  styles.levelItemIcon,
                  achieved && styles.levelItemIconAchieved,
                ]}
              >
                {achieved ? (
                  <CheckCircle2 size={20} color={colors.white} />
                ) : item.level === 15 ? (
                  <Crown size={20} color={colors.primaryDark} />
                ) : (
                  <Star size={20} color={colors.primaryDark} />
                )}
              </View>

              <View style={styles.levelItemContent}>
                <Text style={styles.levelItemTitle}>
                  Nível {item.level} — {item.title}
                </Text>

                <Text style={styles.levelItemDescription}>
                  Patente: {item.rank}
                </Text>

                <Text style={styles.levelItemReward}>{item.reward}</Text>
              </View>

              <View style={styles.levelItemExp}>
                <Text style={styles.levelItemExpText}>
                  {item.requiredExp} XP
                </Text>
              </View>
            </View>
          );
        })}

        <Button
          title="Atualizar progresso"
          variant="secondary"
          onPress={reload}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: 18,
    paddingBottom: 120,
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
  heroTextBox: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 6,
  },
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
  loadingChildrenBox: {
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
  childrenList: {
    paddingBottom: 14,
    gap: 10,
  },
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
  childAvatarActive: {
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  childAvatarText: {
    color: colors.primaryDark,
    fontSize: 20,
    fontWeight: '900',
  },
  childAvatarTextActive: {
    color: colors.white,
  },
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
  childMetaActive: {
    color: 'rgba(255,255,255,0.84)',
  },
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
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
  progressSubtitle: {
    color: colors.textLight,
    fontWeight: '700',
    marginTop: 2,
  },
  levelBadge: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  levelBadgeText: {
    color: colors.white,
    fontWeight: '900',
  },
  rankBox: {
    backgroundColor: colors.accentSoft,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  rankTextBox: { flex: 1 },
  rankTitle: {
    color: colors.text,
    fontWeight: '900',
    marginBottom: 3,
  },
  rankDescription: {
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceSoft,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  coinEmoji: { fontSize: 22 },
  statNumber: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
  statLabel: {
    color: colors.textLight,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
    textAlign: 'center',
  },
  nextLevelBox: {
    marginBottom: 14,
  },
  nextLevelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  nextLevelTitle: {
    color: colors.text,
    fontWeight: '900',
  },
  nextLevelValue: {
    color: colors.primaryDark,
    fontWeight: '900',
  },
  progressTrack: {
    height: 13,
    backgroundColor: colors.surfaceSoft,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  nextLevelDescription: {
    marginTop: 8,
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 18,
  },
  levelUpButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  levelUpButtonDisabled: {
    backgroundColor: '#DADADA',
  },
  levelUpButtonText: {
    color: colors.white,
    fontWeight: '900',
  },
  levelRuleText: {
    color: colors.textLight,
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  levelItem: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelItemAchieved: {
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  levelItemNext: {
    borderColor: colors.primary,
  },
  levelItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  levelItemIconAchieved: {
    backgroundColor: colors.success,
  },
  levelItemContent: {
    flex: 1,
  },
  levelItemTitle: {
    color: colors.text,
    fontWeight: '900',
    marginBottom: 3,
  },
  levelItemDescription: {
    color: colors.textLight,
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 3,
  },
  levelItemReward: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 17,
  },
  levelItemExp: {
    backgroundColor: colors.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  levelItemExpText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
  },
});