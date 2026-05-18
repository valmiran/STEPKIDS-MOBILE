import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function GamePlaceholderScreen({ navigation }: any) {
  const route = useRoute<any>();
  const childId = route.params?.childId;

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.icon}>🎮</Text>
          <Text style={styles.title}>Minigame em construção</Text>

          <Text style={styles.description}>
            Este espaço será usado para o jogo da criança. Por enquanto, ele está preparado para receber a lógica do personagem, moedas, obstáculos e peças.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Criança selecionada</Text>

          <Text style={styles.cardText}>
            ID interno: {childId || 'Nenhuma criança selecionada'}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Plano do jogo</Text>

          <Text style={styles.infoText}>• Personagem estilo stickman</Text>
          <Text style={styles.infoText}>• Pular obstáculos</Text>
          <Text style={styles.infoText}>• Coletar moedas</Text>
          <Text style={styles.infoText}>• Coletar peças mecânicas</Text>
          <Text style={styles.infoText}>• Evoluir personagem com peças</Text>
          <Text style={styles.infoText}>• Relacionar bônus ao uso da órtese</Text>
        </View>

        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Importante</Text>
          <Text style={styles.warningText}>
            O jogo será desenvolvido depois da organização do app e da estrutura do gerenciador web.
          </Text>
        </View>

        <Button
          title="Voltar ao Modo Criança"
          onPress={() => navigation.navigate('ChildArea')}
        />
      </ScrollView>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: 18,
    paddingBottom: 90,
  },
  heroCard: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  icon: {
    fontSize: 52,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 6,
  },
  cardText: {
    color: colors.textLight,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: colors.yellow,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 8,
  },
  infoText: {
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 5,
  },
  warningBox: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  warningTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 6,
  },
  warningText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
  },
});