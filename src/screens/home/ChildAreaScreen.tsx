import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ChevronLeft,
  ChevronRight,
  Gift,
  Puzzle,
  Rocket,
  Shield,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react-native';

import BottomNav from '../../components/common/BottomNav';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme';

const profileLogo = require('../../assets/images/foto dos perfis.png');
const journeyImage = require('../../assets/images/foto inicio de jornada.png');
const evolutionImage = require('../../assets/images/foto minha evolução.png');

type Props = {
  navigation: any;
};

type HeroCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  points: string;
  backgroundColor: string;
  onPress: () => void;
};

type InfoType = 'missions' | 'coins' | 'achievements' | null;

export default function ChildAreaScreen({ navigation }: Props) {
  const { signOut } = useAuth();
  const [selectedInfo, setSelectedInfo] = useState<InfoType>(null);

  function handleLogout() {
    Alert.alert('Sair da conta', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  }

  function toggleInfo(type: InfoType) {
    setSelectedInfo((current) => (current === type ? null : type));
  }

  function getInfoText() {
    if (selectedInfo === 'missions') {
      return {
        title: 'Missões',
        text: 'As missões são desafios da jornada. Ao concluir cada uma, o herói ou heroína ganha XP, moedas e avança na rotina de cuidados.',
      };
    }

    if (selectedInfo === 'coins') {
      return {
        title: 'Moedas',
        text: 'As moedas são recompensas ganhas nas missões e no check-in. Elas podem ser usadas para desbloquear itens na Loja da Jornada.',
      };
    }

    if (selectedInfo === 'achievements') {
      return {
        title: 'Conquistas',
        text: 'As conquistas representam os níveis alcançados pela criança durante a jornada, mostrando sua evolução, dedicação e progresso.',
      };
    }

    return null;
  }

  const infoContent = getInfoText();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topNavigation}>
          <TouchableOpacity
            style={styles.backAreasButton}
            activeOpacity={0.82}
            onPress={() => navigation.navigate('Home')}
          >
            <ChevronLeft size={18} color={colors.white} strokeWidth={2.6} />
            <Text style={styles.backAreasText}>Áreas</Text>
          </TouchableOpacity>

          <Image
            source={profileLogo}
            style={styles.profileLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.heroPanel}>
          <View style={styles.heroPanelTop}>
            <View style={styles.heroAvatar}>
              <Sparkles size={36} color={colors.white} />
            </View>

            <View style={styles.heroPanelTextBox}>
              <Text style={styles.welcomeTitle}>Olá, herói!</Text>
              <Text style={styles.welcomeText}>
                Complete missões, ganhe XP e fortaleça sua jornada.
              </Text>
            </View>
          </View>

          <View style={styles.levelCard}>
            <View>
              <Text style={styles.levelLabel}>Meu progresso</Text>
              <Text style={styles.levelTitle}>Nível de Herói</Text>
            </View>

            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>Nv. 1</Text>
            </View>
          </View>

          <View style={styles.progressArea}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>XP da jornada</Text>
              <Text style={styles.progressValue}>0 / 100 XP</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>

        <View style={styles.quickRewards}>
          <TouchableOpacity
            style={[
              styles.rewardPill,
              selectedInfo === 'missions' && styles.rewardPillActive,
            ]}
            activeOpacity={0.84}
            onPress={() => toggleInfo('missions')}
          >
            <Text style={styles.rewardEmoji}>⭐</Text>
            <Text
              style={[
                styles.rewardText,
                selectedInfo === 'missions' && styles.rewardTextActive,
              ]}
            >
              Missões
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.rewardPill,
              selectedInfo === 'coins' && styles.rewardPillActive,
            ]}
            activeOpacity={0.84}
            onPress={() => toggleInfo('coins')}
          >
            <Text style={styles.rewardEmoji}>🪙</Text>
            <Text
              style={[
                styles.rewardText,
                selectedInfo === 'coins' && styles.rewardTextActive,
              ]}
            >
              Moedas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.rewardPill,
              selectedInfo === 'achievements' && styles.rewardPillActive,
            ]}
            activeOpacity={0.84}
            onPress={() => toggleInfo('achievements')}
          >
            <Text style={styles.rewardEmoji}>🏆</Text>
            <Text
              style={[
                styles.rewardText,
                selectedInfo === 'achievements' && styles.rewardTextActive,
              ]}
            >
              Conquistas
            </Text>
          </TouchableOpacity>
        </View>

        {infoContent && (
          <View style={styles.infoExplanationCard}>
            <Text style={styles.infoExplanationTitle}>
              {infoContent.title}
            </Text>

            <Text style={styles.infoExplanationText}>
              {infoContent.text}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Minha Jornada</Text>

        <View style={styles.imageCard}>
          <Image
            source={journeyImage}
            style={styles.journeyImage}
            resizeMode="cover"
          />
        </View>

        <HeroCard
          title="Missões do dia"
          description="Veja os desafios de hoje e ganhe recompensas ao concluir cada um."
          icon={<Rocket size={30} color={colors.white} />}
          points="+ XP"
          backgroundColor="#8B5CF6"
          onPress={() => navigation.navigate('ChildMissions')}
        />

        <HeroCard
          title="Recompensas"
          description="Colete seu check-in diário e desbloqueie prêmios da jornada."
          icon={<Gift size={30} color={colors.white} />}
          points="🎁"
          backgroundColor="#FACC15"
          onPress={() => navigation.navigate('Rewards')}
        />

        <HeroCard
          title="Loja do herói"
          description="Use suas moedas e XP para desbloquear itens especiais."
          icon={<Shield size={30} color={colors.white} />}
          points="🛡️"
          backgroundColor="#38BDF8"
          onPress={() => navigation.navigate('Shop')}
        />

        <HeroCard
          title="Monte a Órtese"
          description="Monte a órtese na ordem correta e fortaleça seu herói."
          icon={<Puzzle size={30} color={colors.white} />}
          points="+100 XP"
          backgroundColor="#22C55E"
          onPress={() => navigation.navigate('SelectChildForGame')}
        />

        <Text style={styles.sectionTitle}>Minha Evolução</Text>

        <View style={styles.imageCard}>
          <Image
            source={evolutionImage}
            style={styles.journeyImage}
            resizeMode="cover"
          />
        </View>

        <HeroCard
          title="Meu progresso"
          description="Acompanhe seu nível, XP, moedas e ranking na jornada."
          icon={<Trophy size={30} color={colors.white} />}
          points="🏆"
          backgroundColor="#EC4899"
          onPress={() => navigation.navigate('Progress')}
        />

        <View style={styles.motivationCard}>
          <View style={styles.motivationIcon}>
            <Zap size={26} color={colors.primaryDark} />
          </View>

          <View style={styles.motivationTextBox}>
            <Text style={styles.motivationTitle}>Continue sua jornada!</Text>
            <Text style={styles.motivationText}>
              Usar a órtese todos os dias ajuda seu herói a ficar cada vez mais forte.
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomNav navigation={navigation} area="child" active="home" visible />
    </View>
  );
}

function HeroCard({
  title,
  description,
  icon,
  points,
  backgroundColor,
  onPress,
}: HeroCardProps) {
  return (
    <TouchableOpacity
      style={[styles.actionCard, { backgroundColor }]}
      activeOpacity={0.88}
      onPress={onPress}
    >
      <View style={styles.actionIcon}>{icon}</View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>

      <View style={styles.pointsBadge}>
        <Text style={styles.pointsText}>{points}</Text>
      </View>

      <ChevronRight size={22} color={colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },
  content: {
    padding: 20,
    paddingTop: 46,
    paddingBottom: 28,
  },
  topNavigation: {
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileLogo: {
    width: 78,
    height: 56,
  },
  backAreasButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 999,
  },
  backAreasText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 14,
    marginLeft: 4,
  },
  heroPanel: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 32,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  heroPanelTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  heroAvatar: {
    width: 76,
    height: 76,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  heroPanelTextBox: {
    flex: 1,
  },
  welcomeTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
  },
  levelCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelLabel: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 3,
  },
  levelTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  levelBadge: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  levelBadgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  progressArea: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    padding: 13,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  progressLabel: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 13,
  },
  progressValue: {
    color: '#FACC15',
    fontWeight: '900',
    fontSize: 13,
  },
  progressTrack: {
    height: 15,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.22)',
    overflow: 'hidden',
  },
  progressFill: {
    width: '28%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#FACC15',
  },
  quickRewards: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  rewardPill: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  rewardPillActive: {
    backgroundColor: '#FACC15',
    borderColor: colors.white,
  },
  rewardEmoji: {
    fontSize: 24,
    marginBottom: 3,
  },
  rewardText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  rewardTextActive: {
    color: colors.primaryDark,
  },
  infoExplanationCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  infoExplanationTitle: {
    color: colors.primaryDark,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 5,
  },
  infoExplanationText: {
    color: colors.textLight,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.white,
    marginTop: 8,
    marginBottom: 14,
  },
  imageCard: {
    marginTop: -4,
    marginBottom: 16,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  journeyImage: {
    width: '100%',
    height: 210,
  },
  actionCard: {
    borderRadius: 26,
    padding: 17,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 5,
  },
  actionIcon: {
    width: 58,
    height: 58,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '700',
  },
  pointsBadge: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginLeft: 8,
    marginRight: 5,
  },
  pointsText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
  },
  motivationCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 17,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  motivationIcon: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: '#FACC15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  motivationTextBox: {
    flex: 1,
  },
  motivationTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 4,
  },
  motivationText: {
    color: colors.textLight,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 96,
  },
});