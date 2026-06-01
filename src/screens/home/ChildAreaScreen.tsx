import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Award,
  ChevronRight,
  Gamepad2,
  Gift,
  Puzzle,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react-native';

import { colors } from '../../theme';

type Props = {
  navigation: any;
};

type ActionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function ChildAreaScreen({ navigation }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Sparkles size={32} color={colors.white} />
        </View>

        <View style={styles.heroTextArea}>
          <Text style={styles.title}>Modo Criança</Text>
          <Text style={styles.subtitle}>
            Complete missões, ganhe XP, junte moedas e evolua seu herói durante a jornada
            com a órtese.
          </Text>
        </View>
      </View>

      <SectionTitle title="Jornada do herói" />

      <ActionCard
        title="Missões do dia"
        description="Veja desafios simples para cumprir hoje e ganhar recompensas."
        icon={<Rocket size={24} color={colors.primaryDark} />}
        onPress={() => navigation.navigate('ChildMissions')}
      />

      <ActionCard
        title="Atividades"
        description="Complete atividades educativas e acompanhe sua evolução."
        icon={<Star size={24} color={colors.primaryDark} />}
        onPress={() => navigation.navigate('ActivityList')}
      />

      <ActionCard
        title="Meu progresso"
        description="Acompanhe nível, XP, moedas, ranking e evolução do personagem."
        icon={<Trophy size={24} color={colors.accent} />}
        onPress={() => navigation.navigate('Progress')}
      />

      <SectionTitle title="Recompensas e diversão" />

      <ActionCard
        title="Recompensas"
        description="Veja moedas, prêmios, itens liberados e conquistas alcançadas."
        icon={<Gift size={24} color={colors.success} />}
        onPress={() => navigation.navigate('Rewards')}
      />

      <ActionCard
        title="Loja do herói"
        description="Use moedas para desbloquear itens e melhorar sua jornada."
        icon={<Shield size={24} color={colors.primaryDark} />}
        onPress={() => navigation.navigate('Shop')}
      />

      <ActionCard
        title="Jogo da órtese"
        description="Aprenda brincando sobre a órtese e os cuidados do tratamento."
        icon={<Puzzle size={24} color={colors.secondary} />}
        onPress={() => navigation.navigate('GamePlaceholder')}
      />

      <SectionTitle title="Extras" />

      <ActionCard
        title="Pontos"
        description="Veja sua pontuação acumulada na jornada."
        icon={<Award size={24} color={colors.accent} />}
        onPress={() => navigation.navigate('Points')}
      />

      <ActionCard
        title="Ranking"
        description="Compare seu progresso e acompanhe sua evolução."
        icon={<Gamepad2 size={24} color={colors.secondary} />}
        onPress={() => navigation.navigate('Ranking')}
      />
    </ScrollView>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function ActionCard({ title, description, icon, onPress }: ActionCardProps) {
  return (
    <TouchableOpacity style={styles.actionCard} activeOpacity={0.86} onPress={onPress}>
      <View style={styles.actionIcon}>{icon}</View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>

      <ChevronRight size={20} color={colors.muted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 42,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 22,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroIcon: {
    width: 68,
    height: 68,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  heroTextArea: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.88)',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.text,
    marginTop: 10,
    marginBottom: 12,
  },
  actionCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textLight,
  },
});