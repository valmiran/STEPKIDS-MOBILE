import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import ChildSelect from '../../components/common/ChildSelect';
import { colors } from '../../theme';

export default function ChildAreaScreen({ navigation }: any) {
  const [childId, setChildId] = useState('');

  function goToGame() {
    if (!childId) {
      Alert.alert('Atenção', 'Selecione uma criança antes de entrar no jogo.');
      return;
    }

    navigation.navigate('GamePlaceholder', { childId });
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Modo Criança</Text>

        <Text style={styles.description}>
          Área gamificada para jogar, cumprir missões, ganhar moedas e acompanhar conquistas.
        </Text>

        <View style={styles.selectCard}>
          <Text style={styles.label}>Quem vai jogar?</Text>
          <ChildSelect
            selectedChildId={childId}
            onSelect={(id) => setChildId(id)}
          />
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>🦸</Text>
          <Text style={styles.heroTitle}>Jornada do Herói</Text>
          <Text style={styles.heroText}>
            O jogo será desenvolvido aqui. A criança poderá coletar moedas,
            peças e evoluir seu personagem.
          </Text>
        </View>

        <TouchableOpacity style={styles.gameButton} onPress={goToGame}>
          <Text style={styles.gameButtonIcon}>🎮</Text>

          <View style={styles.gameButtonTextBox}>
            <Text style={styles.gameButtonTitle}>Entrar no jogo</Text>
            <Text style={styles.gameButtonText}>
              Espaço reservado para o minigame.
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.row}>
          <ChildCard
            icon="🎁"
            title="Recompensas"
            text="Resgatar prêmios desbloqueados"
            color={colors.white}
            onPress={() => navigation.navigate('Rewards')}
          />

          <ChildCard
            icon="📈"
            title="Nível"
            text="Ver pontos e evolução"
            color={colors.blue}
            onPress={() => navigation.navigate('LevelBonus')}
          />
        </View>

        <View style={styles.row}>
          <ChildCard
            icon="🎯"
            title="Missões"
            text="Atividades criadas pelos pais"
            color={colors.yellow}
            onPress={() => navigation.navigate('ChildMissions')}
          />

          <ChildCard
            icon="🛒"
            title="Loja"
            text="Comprar itens com moedas"
            color={colors.white}
            onPress={() => navigation.navigate('Shop')}
          />
        </View>

        <View style={styles.row}>
          <ChildCard
            icon="📜"
            title="Histórico"
            text="Missões concluídas"
            color={colors.white}
            onPress={() => navigation.navigate('ActivityHistory')}
          />

          <ChildCard
            icon="🪙"
            title="Moedas"
            text="EXP, ouro e evolução"
            color={colors.blue}
            onPress={() => navigation.navigate('Points')}
          />
        </View>

        <View style={styles.row}>
          <ChildCard
            icon="🏆"
            title="Ranking"
            text="Conquistas e medalhas"
            color={colors.white}
            onPress={() => navigation.navigate('Ranking')}
          />

          <ChildCard
            icon="👤"
            title="Personagem"
            text="Avatar e status futuros"
            color={colors.yellow}
            onPress={() => navigation.navigate('GamePlaceholder', { childId })}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Como será o jogo?</Text>
          <Text style={styles.infoText}>
            O personagem poderá correr, pular obstáculos, coletar moedas e peças
            mecânicas. Essa tela já prepara o caminho para desenvolver o
            minigame depois.
          </Text>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

function ChildCard({
  icon,
  title,
  text,
  color,
  onPress,
}: {
  icon: string;
  title: string;
  text: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.childCard, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.childIcon}>{icon}</Text>
      <Text style={styles.childTitle}>{title}</Text>
      <Text style={styles.childText}>{text}</Text>
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
  selectCard: {
    backgroundColor: colors.lilac,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  label: {
    fontWeight: '900',
    marginBottom: 8,
  },
  heroCard: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
  },
  heroText: {
    color: colors.textLight,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  gameButton: {
    backgroundColor: colors.yellow,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  gameButtonIcon: {
    fontSize: 38,
  },
  gameButtonTextBox: {
    flex: 1,
  },
  gameButtonTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  gameButtonText: {
    color: colors.textLight,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  childCard: {
    flex: 1,
    minHeight: 124,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  childIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  childTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  childText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 18,
    fontSize: 12,
  },
  infoBox: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 2,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 6,
  },
  infoText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
  },
});