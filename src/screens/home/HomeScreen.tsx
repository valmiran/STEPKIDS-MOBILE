import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Baby,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react-native';

import { colors } from '../../theme';

type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Sparkles size={16} color={colors.primaryDark} />
          <Text style={styles.heroBadgeText}>Jornada Gamificada</Text>
        </View>

        <Text style={styles.heroTitle}>Bem-vindo ao{`\n`}Pé de Herói</Text>

        <Text style={styles.heroSubtitle}>
          Uma experiência acolhedora para acompanhar a órtese, evoluir hábitos de cuidado e transformar a rotina em uma jornada de coragem.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Escolha sua área</Text>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={() => navigation.navigate('ParentArea')}
      >
        <View style={styles.iconParent}>
          <ShieldCheck size={30} color={colors.primaryDark} />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Área dos Pais</Text>
          <Text style={styles.cardDescription}>
            Monitoramento diário, sintomas, uso da órtese, relatórios e acompanhamento da criança.
          </Text>
        </View>

        <ChevronRight size={22} color={colors.textLight} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={() => navigation.navigate('ChildArea')}
      >
        <View style={styles.iconChild}>
          <Baby size={30} color={colors.secondaryDark} />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Área da Criança</Text>
          <Text style={styles.cardDescription}>
            Missões, XP, moedas, recompensas e o jogo Monte a Órtese do Herói.
          </Text>
        </View>

        <ChevronRight size={22} color={colors.textLight} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 58,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 30,
    padding: 24,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 18,
  },
  heroBadgeText: {
    marginLeft: 8,
    color: colors.primaryDark,
    fontWeight: '900',
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '900',
    color: colors.white,
  },
  heroSubtitle: {
    marginTop: 14,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.86)',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconParent: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconChild: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: colors.secondarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 18,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textLight,
    fontWeight: '600',
  },
});