import React from 'react';
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
  LogOut,
  Puzzle,
  Rocket,
  Settings,
  Shield,
  Sparkles,
  Trophy,
  UserRound,
} from 'lucide-react-native';

import BottomNav from '../../components/common/BottomNav';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme';

const profileLogo = require('../../assets/images/foto dos perfis.png');

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
  const { signOut } = useAuth();

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

        <View style={styles.topBar}>
          <View>
            <Text style={styles.appName}>Área da Criança</Text>
            <Text style={styles.topSubtitle}>Minha jornada de herói</Text>
          </View>

          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.topButton}
              activeOpacity={0.82}
              onPress={() => navigation.navigate('Profile')}
            >
              <UserRound size={19} color={colors.primaryDark} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.topButton}
              activeOpacity={0.82}
              onPress={() => navigation.navigate('Settings')}
            >
              <Settings size={19} color={colors.primaryDark} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.topButton}
              activeOpacity={0.82}
              onPress={handleLogout}
            >
              <LogOut size={19} color={colors.danger} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Sparkles size={32} color={colors.white} />
          </View>

          <View style={styles.heroTextArea}>
            <Text style={styles.title}>Minha jornada de herói começou!</Text>
            <Text style={styles.subtitle}>
              Eu posso completar missões, ganhar XP, cuidar da minha rotina e desbloquear partes da órtese do herói.
            </Text>
          </View>
        </View>

        <SectionTitle title="Jornada do herói" />

        <ActionCard
          title="Missões do dia"
          description="Veja as minhas missões de hoje e ganhe recompensas ao concluir cada desafio."
          icon={<Rocket size={24} color={colors.primaryDark} />}
          onPress={() => navigation.navigate('ChildMissions')}
        />

        <ActionCard
          title="Recompensas"
          description="Colete minhas recompensas diárias e acompanhe minhas conquistas."
          icon={<Gift size={24} color={colors.success} />}
          onPress={() => navigation.navigate('Rewards')}
        />

        <ActionCard
          title="Loja do herói"
          description="Veja os itens que eu posso desbloquear usando XP e moedas."
          icon={<Shield size={24} color={colors.primaryDark} />}
          onPress={() => navigation.navigate('Shop')}
        />

        <ActionCard
          title="Monte a Órtese do Herói"
          description="Monte minha órtese na ordem correta e fortaleça minha jornada."
          icon={<Puzzle size={24} color={colors.secondaryDark} />}
          onPress={() => navigation.navigate('SelectChildForGame')}
        />

        <SectionTitle title="Meu Progresso" />

        <ActionCard
          title="Meu progresso"
          description="Acompanhe o meu nível, XP, moedas e ranking."
          icon={<Trophy size={24} color={colors.accent} />}
          onPress={() => navigation.navigate('Progress')}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomNav navigation={navigation} area="child" active="home" visible />
    </View>
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
  screen: { flex: 1, backgroundColor: colors.primaryDark },
  container: { flex: 1, backgroundColor: colors.primaryDark },
  content: { padding: 20, paddingTop: 46, paddingBottom: 28 },
  topNavigation: {
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileLogo: {
    width: 76,
    height: 54,
  },
  backAreasButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  backAreasText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 13,
    marginLeft: 4,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  appName: { color: colors.white, fontSize: 20, fontWeight: '900' },
  topSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  topActions: { flexDirection: 'row', gap: 8 },
  topButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 28,
    padding: 22,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
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
  heroTextArea: { flex: 1 },
  title: { fontSize: 22, fontWeight: '900', color: colors.white, marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.white,
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
  actionContent: { flex: 1 },
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
    fontWeight: '600',
  },
  bottomSpacer: { height: 96 },
});