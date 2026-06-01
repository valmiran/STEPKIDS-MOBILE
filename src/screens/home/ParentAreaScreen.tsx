import React from 'react';
import {
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
  ShieldCheck,
  UserRound,
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

export default function ParentAreaScreen({ navigation }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerCard}>
        <View style={styles.headerIcon}>
          <ShieldCheck size={30} color={colors.primaryDark} />
        </View>

        <View style={styles.headerTextArea}>
          <Text style={styles.title}>Área dos Pais</Text>
          <Text style={styles.subtitle}>
            Organize o acompanhamento clínico, registre sintomas, acompanhe o uso da órtese
            e veja o progresso da criança.
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
        icon={<CalendarCheck size={24} color={colors.secondary} />}
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
        title="Crianças cadastradas"
        description="Veja perfis, dados principais e detalhes da criança."
        icon={<Baby size={24} color={colors.primaryDark} />}
        onPress={() => navigation.navigate('ChildList')}
      />

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

      <SectionTitle title="Relatórios e conta" />

      <ActionCard
        title="Relatório semanal"
        description="Veja informações organizadas para acompanhamento clínico."
        icon={<FileText size={24} color={colors.secondary} />}
        onPress={() => navigation.navigate('WeeklyReport')}
      />

      <ActionCard
        title="Perfil familiar"
        description="Atualize informações do responsável e configurações da conta."
        icon={<UserRound size={24} color={colors.textLight} />}
        onPress={() => navigation.navigate('Profile')}
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
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 26,
    padding: 22,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTextArea: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textLight,
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