import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Activity,
  Baby,
  CalendarCheck,
  ChevronRight,
  ClipboardCheck,
  FileText,
  HeartPulse,
  History,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
} from 'lucide-react-native';

import BottomNav from '../../components/common/BottomNav';
import { useAuth } from '../../hooks/useAuth';
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

export default function ParentAreaScreen({ navigation }: Props) {
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
        <View style={styles.topBar}>
          <View>
            <Text style={styles.appName}>Pé de Herói</Text>
            <Text style={styles.topSubtitle}>Área dos Pais</Text>
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

        <View style={styles.headerCard}>
          <View style={styles.headerIcon}>
            <ShieldCheck size={30} color={colors.white} />
          </View>

          <View style={styles.headerTextArea}>
            <Text style={styles.title}>Acompanhe a jornada da criança</Text>

            <Text style={styles.subtitle}>
              Registre cuidados, monitore sintomas, acompanhe o uso da órtese e veja a evolução de forma simples.
            </Text>
          </View>
        </View>

        <SectionTitle title="Monitoramento diário" />

        <ActionCard
          title="Checklist diário"
          description="Registre rotina, dor, sono, uso da órtese e observações importantes."
          icon={<ClipboardCheck size={24} color={colors.primaryDark} />}
          onPress={() => navigation.navigate('DailyChecklist')}
        />

        <ActionCard
          title="Uso da órtese"
          description="Informe o tempo de uso e acompanhe a adesão ao tratamento."
          icon={<CalendarCheck size={24} color={colors.secondaryDark} />}
          onPress={() => navigation.navigate('RegisterOrthosisUsage')}
        />

        <ActionCard
          title="Sintomas"
          description="Registre dor, desconforto, humor e sinais de atenção."
          icon={<HeartPulse size={24} color={colors.danger} />}
          onPress={() => navigation.navigate('Symptoms')}
        />

        <SectionTitle title="Acompanhamento" />

        <ActionCard
          title="Progresso"
          description="Acompanhe evolução, XP, pontuação, nível e indicadores."
          icon={<Activity size={24} color={colors.success} />}
          onPress={() => navigation.navigate('Progress')}
        />

        <ActionCard
          title="Histórico"
          description="Consulte registros anteriores de uso, sintomas e checklists."
          icon={<History size={24} color={colors.accent} />}
          onPress={() => navigation.navigate('History')}
        />

        <ActionCard
          title="Relatório semanal"
          description="Veja informações organizadas para acompanhamento clínico."
          icon={<FileText size={24} color={colors.secondaryDark} />}
          onPress={() => navigation.navigate('WeeklyReport')}
        />

        <SectionTitle title="Gestão familiar" />

        <ActionCard
          title="Crianças cadastradas"
          description="Consulte, visualize, edite e acompanhe as crianças cadastradas."
          icon={<Baby size={24} color={colors.primaryDark} />}
          onPress={() => navigation.navigate('ChildList')}
        />
      </ScrollView>

      <BottomNav navigation={navigation} area="parent" active="home" visible />
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function ActionCard({ title, description, icon, onPress }: ActionCardProps) {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      activeOpacity={0.86}
      onPress={onPress}
    >
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
    paddingTop: 50,
    paddingBottom: 28,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  appName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  topSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
    gap: 8,
  },
  topButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 28,
    padding: 22,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTextArea: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.86)',
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
    fontWeight: '600',
  },
});