import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  CheckCircle2,
  Medal,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react-native';

import AppHeader from '../../components/common/AppHeader';
import Button from '../../components/common/Button';
import { childService } from '../../services/api/childService';
import { colors } from '../../theme';

type OrthosisPiece = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const CORRECT_ORDER: OrthosisPiece[] = [
  {
    id: 'base',
    title: 'Base da órtese',
    description: 'A base dá apoio para o herói começar a jornada com segurança.',
    icon: '🦶',
  },
  {
    id: 'foot_adjustment',
    title: 'Ajuste do pé',
    description: 'O ajuste correto ajuda o herói a seguir evoluindo todos os dias.',
    icon: '⚙️',
  },
  {
    id: 'side_protection',
    title: 'Proteção lateral',
    description: 'A proteção lateral representa conforto e estabilidade.',
    icon: '🛡️',
  },
  {
    id: 'straps',
    title: 'Tiras de cuidado',
    description: 'As tiras ajudam a manter tudo ajustado durante a rotina.',
    icon: '🎗️',
  },
  {
    id: 'final_fit',
    title: 'Encaixe final',
    description: 'O encaixe final mostra que cada detalhe da rotina importa.',
    icon: '🧩',
  },
  {
    id: 'hero_glow',
    title: 'Brilho do herói',
    description: 'O brilho aparece quando o cuidado vira conquista.',
    icon: '✨',
  },
];

const ERROR_MESSAGES = [
  'Opa, esse passo não vem agora.',
  'Essa ainda não é a ordem correta.',
  'Opa, não é a vez desse passo ainda.',
  'Calma, primeiro precisamos seguir a ordem certa.',
  'Quase lá! Mas essa peça vem depois.',
];

function shufflePieces(pieces: OrthosisPiece[]) {
  const shuffled = [...pieces];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const current = shuffled[index];
    shuffled[index] = shuffled[randomIndex];
    shuffled[randomIndex] = current;
  }

  return shuffled;
}

function getRandomErrorMessage() {
  const randomIndex = Math.floor(Math.random() * ERROR_MESSAGES.length);
  return ERROR_MESSAGES[randomIndex];
}

export default function GamePlaceholderScreen({ navigation }: any) {
  const route = useRoute<any>();

  const childId = route.params?.childId;
  const childName = route.params?.childName;

  const [displayPieces, setDisplayPieces] = useState<OrthosisPiece[]>(() =>
    shufflePieces(CORRECT_ORDER)
  );

  const [equippedPieces, setEquippedPieces] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [savingReward, setSavingReward] = useState(false);
  const [rewardApplied, setRewardApplied] = useState(false);

  const progress = useMemo(() => {
    return Math.round((equippedPieces.length / CORRECT_ORDER.length) * 100);
  }, [equippedPieces.length]);

  const nextPiece = CORRECT_ORDER[equippedPieces.length];
  const isCompleted = equippedPieces.length === CORRECT_ORDER.length;

  async function applyFinalReward() {
    if (!childId || rewardApplied || savingReward) {
      return;
    }

    try {
      setSavingReward(true);

      await childService.completeOrthosisHeroGame(childId);

      setRewardApplied(true);
      setSuccessMessage(
        `Recompensa salva para ${childName || 'a criança selecionada'}!`
      );
    } catch (error: any) {
      Alert.alert(
        'Atenção',
        error?.message ||
          'O jogo foi concluído, mas não foi possível salvar a recompensa.'
      );
    } finally {
      setSavingReward(false);
    }
  }

  async function handleSelectPiece(piece: OrthosisPiece) {
    if (isCompleted) {
      return;
    }

    const isAlreadyEquipped = equippedPieces.includes(piece.id);

    if (isAlreadyEquipped) {
      setErrorMessage('');
      setSuccessMessage('Essa peça já foi colocada na órtese do herói.');
      return;
    }

    const isCorrectPiece = nextPiece?.id === piece.id;

    if (!isCorrectPiece) {
      setSuccessMessage('');
      setErrorMessage(getRandomErrorMessage());
      return;
    }

    const updatedEquippedPieces = [...equippedPieces, piece.id];

    setEquippedPieces(updatedEquippedPieces);
    setErrorMessage('');
    setSuccessMessage('Peça equipada com sucesso!');

    if (updatedEquippedPieces.length === CORRECT_ORDER.length) {
      await applyFinalReward();
    }
  }

  function handleResetGame() {
    setEquippedPieces([]);
    setErrorMessage('');
    setSuccessMessage('');
    setSavingReward(false);
    setRewardApplied(false);
    setDisplayPieces(shufflePieces(CORRECT_ORDER));
  }

  function getPieceStatus(pieceId: string) {
    if (equippedPieces.includes(pieceId)) {
      return 'equipped';
    }

    return 'available';
  }

  if (!childId) {
    return (
      <View style={styles.container}>
        <AppHeader
          navigation={navigation}
          title="Monte a Órtese do Herói"
          subtitle="Seleção necessária"
          fallbackRoute="ChildArea"
        />

        <View style={styles.requiredSelectionContent}>
          <View style={styles.requiredSelectionCard}>
            <UserRound size={46} color={colors.primaryDark} />

            <Text style={styles.requiredSelectionTitle}>
              Selecione uma criança antes de jogar
            </Text>

            <Text style={styles.requiredSelectionText}>
              Para salvar XP, moedas e medalha no perfil correto, é necessário escolher qual criança vai jogar.
            </Text>

            <Button
              title="Escolher criança"
              onPress={() => navigation.navigate('SelectChildForGame')}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Monte a Órtese do Herói"
        subtitle="Jogo educativo"
        fallbackRoute="SelectChildForGame"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.selectedChildCard}>
          <View style={styles.selectedChildAvatar}>
            <Text style={styles.selectedChildInitial}>
              {childName?.charAt(0)?.toUpperCase() || 'C'}
            </Text>
          </View>

          <View style={styles.selectedChildTextBox}>
            <Text style={styles.selectedChildLabel}>Jogando agora</Text>
            <Text style={styles.selectedChildName}>
              {childName || 'Criança selecionada'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.changeChildButton}
            activeOpacity={0.84}
            onPress={() => navigation.navigate('SelectChildForGame')}
          >
            <Text style={styles.changeChildText}>Trocar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <ShieldCheck size={36} color={colors.white} />
          </View>

          <Text style={styles.title}>Complete sua armadura de cuidado</Text>

          <Text style={styles.description}>
            Toque nas peças para montar a órtese do herói. Mas atenção: a montagem precisa seguir a ordem correta.
          </Text>

          <View style={styles.progressBox}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progresso</Text>
              <Text style={styles.progressValue}>{progress}%</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            {!isCompleted && nextPiece && (
              <Text style={styles.nextStepText}>
                Próximo passo: {nextPiece.title}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.storyCard}>
          <Text style={styles.storyTitle}>História</Text>

          <Text style={styles.storyText}>
            O pequeno herói está aprendendo que cuidar da órtese faz parte da sua força.
            {'\n\n'}
            Cada peça representa uma etapa importante da sua evolução.
            {'\n\n'}
            Para completar sua armadura de cuidado, monte a órtese seguindo a ordem correta.
            {'\n\n'}
            Assim, o herói fica mais forte a cada passo da jornada.
          </Text>

          <View style={styles.orderBox}>
            <Text style={styles.orderTitle}>Ordem correta da montagem</Text>

            {CORRECT_ORDER.map((piece, index) => {
              const isEquipped = equippedPieces.includes(piece.id);
              const isNext = nextPiece?.id === piece.id && !isCompleted;

              return (
                <View
                  key={piece.id}
                  style={[
                    styles.orderItem,
                    isEquipped && styles.orderItemDone,
                    isNext && styles.orderItemNext,
                  ]}
                >
                  <Text style={styles.orderNumber}>{index + 1}</Text>

                  <Text
                    style={[
                      styles.orderText,
                      isEquipped && styles.orderTextDone,
                    ]}
                  >
                    {piece.title}
                  </Text>

                  {isEquipped && (
                    <CheckCircle2 size={18} color={colors.success} />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Peças da órtese</Text>

        <Text style={styles.sectionDescription}>
          As peças aparecem em ordem diferente a cada partida. Observe a ordem correta e escolha o próximo passo.
        </Text>

        {errorMessage ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {successMessage ? (
          <View style={styles.successMessageBox}>
            <Text style={styles.successMessageText}>{successMessage}</Text>
          </View>
        ) : null}

        {displayPieces.map((piece) => {
          const status = getPieceStatus(piece.id);
          const isEquipped = status === 'equipped';
          const isNextPiece = nextPiece?.id === piece.id && !isCompleted;

          return (
            <TouchableOpacity
              key={piece.id}
              style={[
                styles.pieceCard,
                isEquipped && styles.pieceCardEquipped,
                isNextPiece && styles.pieceCardNext,
              ]}
              activeOpacity={0.84}
              onPress={() => handleSelectPiece(piece)}
            >
              <View style={styles.pieceIconBox}>
                <Text style={styles.pieceEmoji}>{piece.icon}</Text>
              </View>

              <View style={styles.pieceContent}>
                <Text style={styles.pieceTitle}>{piece.title}</Text>

                <Text style={styles.pieceDescription}>
                  {piece.description}
                </Text>

                <Text
                  style={[
                    styles.statusText,
                    isEquipped && styles.statusEquipped,
                    isNextPiece && styles.statusNext,
                  ]}
                >
                  {isEquipped
                    ? 'Equipada na órtese do herói'
                    : isNextPiece
                      ? 'É a vez desta peça'
                      : 'Toque quando chegar a vez dela'}
                </Text>
              </View>

              {isEquipped ? (
                <CheckCircle2 size={24} color={colors.success} />
              ) : (
                <Sparkles
                  size={22}
                  color={isNextPiece ? colors.primary : colors.muted}
                />
              )}
            </TouchableOpacity>
          );
        })}

        {isCompleted && (
          <View style={styles.finalSuccessCard}>
            <Medal size={42} color={colors.accent} />

            <Text style={styles.finalSuccessTitle}>Parabéns!</Text>

            <Text style={styles.finalSuccessText}>
              Você montou a Órtese do Herói! Seu herói ficou mais forte porque você cuidou da sua jornada.
            </Text>

            <View style={styles.rewardRow}>
              <Text style={styles.rewardPill}>+100 XP</Text>
              <Text style={styles.rewardPill}>+25 moedas</Text>
              <Text style={styles.rewardPill}>Medalha cuidado</Text>
            </View>

            <View style={styles.rewardStatusBox}>
              {savingReward ? (
                <>
                  <ActivityIndicator color={colors.primary} />
                  <Text style={styles.rewardStatusText}>
                    Salvando recompensa para {childName || 'a criança'}...
                  </Text>
                </>
              ) : rewardApplied ? (
                <Text style={styles.rewardAppliedText}>
                  Recompensa salva para {childName || 'a criança selecionada'}.
                </Text>
              ) : (
                <Text style={styles.rewardStatusText}>
                  A recompensa será enviada para {childName || 'a criança selecionada'}.
                </Text>
              )}
            </View>
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Registro da partida</Text>

          <Text style={styles.infoText}>
            Criança selecionada: {childName || 'Criança'}
          </Text>

          <Text style={styles.infoText}>ID da criança: {childId}</Text>

          <Text style={styles.infoText}>
            Ao concluir o jogo, o app salva XP, moedas e medalha no perfil selecionado.
          </Text>
        </View>

        <Button
          title="Recomeçar montagem"
          variant="secondary"
          onPress={handleResetGame}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 18,
    paddingBottom: 120,
  },
  requiredSelectionContent: {
    flex: 1,
    padding: 18,
    justifyContent: 'center',
  },
  requiredSelectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  requiredSelectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  requiredSelectionText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 14,
  },
  selectedChildCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedChildAvatar: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedChildInitial: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  selectedChildTextBox: {
    flex: 1,
  },
  selectedChildLabel: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '800',
  },
  selectedChildName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 2,
  },
  changeChildButton: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  changeChildText: {
    color: colors.primaryDark,
    fontWeight: '900',
    fontSize: 12,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  heroIcon: {
    width: 70,
    height: 70,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    color: colors.white,
    marginBottom: 8,
  },
  description: {
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  progressBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 18,
    padding: 14,
    marginTop: 18,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    color: colors.white,
    fontWeight: '900',
  },
  progressValue: {
    color: colors.white,
    fontWeight: '900',
  },
  progressTrack: {
    height: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.28)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.accent,
  },
  nextStepText: {
    marginTop: 10,
    color: colors.white,
    fontWeight: '900',
    fontSize: 13,
    textAlign: 'center',
  },
  storyCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  storyTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 6,
  },
  storyText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
  },
  orderBox: {
    marginTop: 16,
    backgroundColor: colors.surfaceSoft,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 10,
  },
  orderItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderItemDone: {
    backgroundColor: colors.successSoft,
    borderColor: colors.success,
  },
  orderItemNext: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  orderNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    color: colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '900',
    marginRight: 10,
  },
  orderText: {
    flex: 1,
    color: colors.text,
    fontWeight: '800',
  },
  orderTextDone: {
    color: colors.success,
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
  errorBox: {
    backgroundColor: colors.dangerSoft,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    color: colors.danger,
    fontWeight: '900',
    textAlign: 'center',
  },
  successMessageBox: {
    backgroundColor: colors.successSoft,
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  successMessageText: {
    color: colors.success,
    fontWeight: '900',
    textAlign: 'center',
  },
  pieceCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pieceCardEquipped: {
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  pieceCardNext: {
    borderColor: colors.primary,
  },
  pieceIconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pieceEmoji: {
    fontSize: 26,
  },
  pieceContent: {
    flex: 1,
  },
  pieceTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  pieceDescription: {
    color: colors.textLight,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
  },
  statusText: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
  },
  statusEquipped: {
    color: colors.success,
  },
  statusNext: {
    color: colors.primaryDark,
  },
  finalSuccessCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  finalSuccessTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginTop: 8,
    marginBottom: 6,
  },
  finalSuccessText: {
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'center',
  },
  rewardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  rewardPill: {
    backgroundColor: colors.white,
    color: colors.primaryDark,
    fontWeight: '900',
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  rewardStatusBox: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
    width: '100%',
    alignItems: 'center',
  },
  rewardStatusText: {
    marginTop: 6,
    color: colors.textLight,
    fontWeight: '800',
    textAlign: 'center',
  },
  rewardAppliedText: {
    color: colors.success,
    fontWeight: '900',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 8,
    color: colors.text,
  },
  infoText: {
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 5,
    lineHeight: 19,
  },
});