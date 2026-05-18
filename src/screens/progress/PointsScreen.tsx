import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function PointsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>EXP e Moedas</Text>

        <Text style={styles.description}>
          Entenda como o Pé de Herói usa EXP, moedas de ouro, níveis e loja para
          motivar a criança no tratamento.
        </Text>

        <View style={styles.heroCard}>
          <Text style={styles.icon}>⭐</Text>
          <Text style={styles.heroTitle}>Sistema de evolução</Text>
          <Text style={styles.heroText}>
            A criança ganha EXP para evoluir o personagem e moedas de ouro para
            comprar itens na futura loja do jogo.
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.statBlue}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statTitle}>EXP</Text>
            <Text style={styles.statText}>
              Usado para subir de nível e melhorar o status do personagem.
            </Text>
          </View>

          <View style={styles.statYellow}>
            <Text style={styles.statIcon}>🪙</Text>
            <Text style={styles.statTitle}>Moedas</Text>
            <Text style={styles.statText}>
              Usadas para comprar itens, acessórios e melhorias na loja.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Como ganhar EXP e moedas?</Text>

          <Text style={styles.item}>
            🦶 Primeiro Passo do Herói: +25 EXP / +10 moedas
          </Text>

          <Text style={styles.item}>
            🌙 Sono dos Pés Mágicos: +30 EXP / +12 moedas
          </Text>

          <Text style={styles.item}>
            👣 Pegadas de Coragem: +60 EXP / +25 moedas
          </Text>

          <Text style={styles.item}>
            🛡️ Trilha do Pequeno Guardião: +100 EXP / +45 moedas
          </Text>

          <Text style={styles.item}>
            🏆 Semana do Pé de Herói: +250 EXP / +100 moedas
          </Text>

          <Text style={styles.item}>
            👑 Lenda dos Pés Mágicos: +1200 EXP / +500 moedas
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Balanceamento das missões</Text>

          <View style={styles.balanceItem}>
            <Text style={styles.balanceTitle}>Missões simples</Text>
            <Text style={styles.balanceText}>
              25–50 EXP e 10–20 moedas. Ideais para tarefas diárias.
            </Text>
          </View>

          <View style={styles.balanceItem}>
            <Text style={styles.balanceTitle}>Missões médias</Text>
            <Text style={styles.balanceText}>
              60–150 EXP e 25–60 moedas. Ideais para sequências de dias.
            </Text>
          </View>

          <View style={styles.balanceItem}>
            <Text style={styles.balanceTitle}>Missões difíceis</Text>
            <Text style={styles.balanceText}>
              250+ EXP e 100+ moedas. Ideais para metas semanais ou mensais.
            </Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Evolução do personagem</Text>
          <Text style={styles.infoText}>
            A cada 100 EXP, a criança sobe de nível. No futuro, esse nível poderá
            melhorar status do personagem, como velocidade, salto, resistência e
            coleta de moedas.
          </Text>
        </View>

        <View style={styles.shopBox}>
          <Text style={styles.shopTitle}>Loja futura</Text>
          <Text style={styles.shopText}>
            As moedas de ouro poderão ser usadas para comprar itens visuais,
            acessórios, melhorias do personagem e recompensas digitais.
          </Text>
        </View>

        <Button
          title="Ver progresso"
          onPress={() => navigation.navigate('LevelBonus')}
        />

        <Button
          title="Ver missões"
          variant="secondary"
          onPress={() => navigation.navigate('ActivityList')}
        />

        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 90 },
  title: { fontSize: 26, fontWeight: '900', marginBottom: 8 },
  description: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 14,
  },
  heroCard: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  icon: { fontSize: 48, marginBottom: 8 },
  heroTitle: {
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
  },
  heroText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  statBlue: {
    flex: 1,
    backgroundColor: colors.blue,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  statYellow: {
    flex: 1,
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 30,
    marginBottom: 6,
  },
  statTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 6,
  },
  statText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    fontSize: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  cardTitle: { fontSize: 18, fontWeight: '900', marginBottom: 10 },
  item: {
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 20,
  },
  balanceItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  balanceTitle: {
    fontWeight: '900',
    marginBottom: 4,
  },
  balanceText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
  },
  infoBox: {
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  infoTitle: { fontWeight: '900', marginBottom: 4 },
  infoText: { color: colors.textLight, fontWeight: '600', lineHeight: 19 },
  shopBox: {
    backgroundColor: colors.lilac,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  shopTitle: {
    fontWeight: '900',
    marginBottom: 4,
  },
  shopText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
  },
});