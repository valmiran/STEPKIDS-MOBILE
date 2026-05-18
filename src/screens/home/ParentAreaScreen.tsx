import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme';

export default function ParentAreaScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Área dos Pais</Text>

        <Text style={styles.description}>
          Gerencie crianças, acompanhamento clínico, atividades, recompensas e relatórios.
        </Text>

        <View style={styles.highlightCard}>
          <Text style={styles.highlightIcon}>👨‍👩‍👧</Text>
          <Text style={styles.highlightTitle}>Painel de acompanhamento</Text>
          <Text style={styles.highlightText}>
            Esta área concentra tudo que o responsável precisa para acompanhar o tratamento.
          </Text>
        </View>

        <View style={styles.row}>
          <MenuCard
            title="Crianças"
            text="Cadastrar, editar e visualizar crianças"
            icon="👶"
            color={colors.white}
            onPress={() => navigation.navigate('ChildList')}
          />

          <MenuCard
            title="Uso da Órtese"
            text="Registrar uso diário"
            icon="🦶"
            color={colors.white}
            onPress={() => navigation.navigate('RegisterOrthosisUsage')}
          />
        </View>

        <View style={styles.row}>
          <MenuCard
            title="Checklist"
            text="Rotina diária do tratamento"
            icon="✅"
            color={colors.blue}
            onPress={() => navigation.navigate('DailyChecklist')}
          />

          <MenuCard
            title="Sintomas"
            text="Dor, desconforto e observações"
            icon="😟"
            color={colors.white}
            onPress={() => navigation.navigate('Symptoms')}
          />
        </View>

        <View style={styles.row}>
          <MenuCard
            title="Histórico Clínico"
            text="Órtese, checklist e sintomas"
            icon="📋"
            color={colors.white}
            onPress={() => navigation.navigate('History')}
          />

          <MenuCard
            title="Relatórios"
            text="Resumo semanal e evolução"
            icon="📊"
            color={colors.yellow}
            onPress={() => navigation.navigate('WeeklyReport')}
          />
        </View>

        <View style={styles.row}>
        <MenuCard
            title="Missões"
            text="Criar e concluir missões"
            icon="🎯"
            color={colors.white}
            onPress={() => navigation.navigate('ActivityList')}
        />

        <MenuCard
            title="Histórico de Missões"
            text="EXP, moedas e missões concluídas"
            icon="📜"
            color={colors.white}
            onPress={() => navigation.navigate('ActivityHistory')}
        />
        </View>

        <View style={styles.row}>
        <MenuCard
            title="Recompensas"
            text="Ver e configurar recompensas"
            icon="🎁"
            color={colors.white}
            onPress={() => navigation.navigate('Rewards')}
        />

        <MenuCard
            title="Loja"
            text="Itens com moedas de ouro"
            icon="🛒"
            color={colors.yellow}
            onPress={() => navigation.navigate('Shop')}
        />
        </View>

        <TouchableOpacity
          style={styles.fullCard}
          onPress={() => navigation.navigate('LevelBonus')}
        >
          <Text style={styles.fullIcon}>📈</Text>
          <View style={styles.fullTextBox}>
            <Text style={styles.fullTitle}>Progresso da criança</Text>
            <Text style={styles.fullText}>
              Ver nível, pontos, horas totais de uso da órtese e checklists concluídos.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav navigation={navigation} active="children" />
    </View>
  );
}

function MenuCard({
  title,
  text,
  icon,
  color,
  onPress,
}: {
  title: string;
  text: string;
  icon: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={[styles.menuCard, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: 18,
    paddingBottom: 90,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  description: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 14,
  },
  highlightCard: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
  },
  highlightIcon: {
    fontSize: 42,
    marginBottom: 8,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
  },
  highlightText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  menuCard: {
    flex: 1,
    minHeight: 132,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  menuText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 18,
    fontSize: 12,
  },
  fullCard: {
    backgroundColor: colors.yellow,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 2,
  },
  fullIcon: {
    fontSize: 36,
  },
  fullTextBox: {
    flex: 1,
  },
  fullTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 4,
  },
  fullText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
  },
});