import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import { colors } from '../../theme';

const moods = ['😄', '🙂', '😐', '😟', '😢'];

export default function HomeScreen({ navigation }: any) {
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  function handleSelectMood(mood: string) {
    setSelectedMood(mood);

    setTimeout(() => {
      setShowMoodModal(false);
      navigation.navigate('Symptoms', { mood });
    }, 350);
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Olá, Responsável!</Text>
          <Text style={styles.greetingSub}>Bem-vindo ao StepKids</Text>
        </View>

        <View style={styles.childSelector}>
          <Text style={styles.childText}>Lua</Text>
          <Text>⌄</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.moduleLarge}
            onPress={() => navigation.navigate('ChildList')}
          >
            <Text style={styles.moduleTitle}>Gestão da Criança</Text>
            <Text style={styles.moduleText}>Cadastrar, editar e visualizar crianças</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.module}
            onPress={() => navigation.navigate('RegisterOrthosisUsage')}
          >
            <Text style={styles.moduleTitle}>Uso da Órtese</Text>
            <Text style={styles.moduleText}>Registrar uso diário da órtese</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.module}
            onPress={() => navigation.navigate('DailyChecklist')}
          >
            <Text style={styles.moduleTitle}>Checklist Diário</Text>
            <Text style={styles.moduleText}>Uso, dor e sono com a órtese</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.module}
            onPress={() => setShowMoodModal(true)}
          >
            <Text style={styles.moduleTitle}>Sintomas</Text>
            <Text style={styles.moduleText}>Registrar desconfortos da criança</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.module}
            onPress={() => navigation.navigate('LevelBonus')}
          >
            <Text style={styles.moduleTitle}>Progresso</Text>
            <Text style={styles.moduleText}>Nível, pontos e evolução</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.moduleLargeYellow}
            onPress={() => navigation.navigate('Rewards')}
          >
            <Text style={styles.moduleTitle}>Recompensas</Text>
            <Text style={styles.moduleText}>Visualizar e resgatar conquistas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressArea}>
          <View style={styles.levelCard}>
            <Text style={styles.smallTitle}>VOCÊ ESTÁ NO NÍVEL</Text>
            <Text style={styles.levelNumber}>7</Text>
          </View>

          <TouchableOpacity
            style={styles.rewardCard}
            onPress={() => navigation.navigate('LevelBonus')}
          >
            <Text style={styles.smallTitle}>LISTA DAS ATIVIDADES</Text>
            <Text style={styles.face}>🙂</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} active="home" />

      <Modal visible={showMoodModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.moodBox}>
            <Text style={styles.moodTitle}>Como você está se sentindo?</Text>

            <View style={styles.moodRow}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood}
                  style={[
                    styles.moodButton,
                    selectedMood === mood && styles.moodSelected,
                  ]}
                  onPress={() => handleSelectMood(mood)}
                >
                  <Text style={styles.moodText}>{mood}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={() => setShowMoodModal(false)}>
              <Text style={styles.cancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  greeting: {
    marginBottom: 14,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '900',
  },
  greetingSub: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
    fontWeight: '600',
  },
  childSelector: {
    backgroundColor: colors.pink,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  childText: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  module: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 112,
  },
  moduleLarge: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  moduleLargeYellow: {
    flex: 1,
    backgroundColor: colors.yellow,
    borderRadius: 14,
    padding: 16,
  },
  moduleTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 8,
  },
  moduleText: {
    color: colors.textLight,
    lineHeight: 19,
    fontWeight: '600',
  },
  progressArea: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  levelCard: {
    flex: 1,
    backgroundColor: colors.blue,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  rewardCard: {
    flex: 1,
    backgroundColor: colors.yellow,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  smallTitle: {
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
  },
  levelNumber: {
    fontSize: 36,
    fontWeight: '900',
  },
  face: {
    fontSize: 36,
    marginTop: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  moodBox: {
    width: '100%',
    backgroundColor: colors.blue,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
  },
  moodTitle: {
    fontWeight: '900',
    marginBottom: 16,
    fontSize: 16,
  },
  moodRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  moodButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E9F7FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodSelected: {
    borderWidth: 3,
    borderColor: colors.lilacDark,
    transform: [{ scale: 1.12 }],
  },
  moodText: {
    fontSize: 22,
  },
  cancel: {
    fontWeight: '700',
    marginTop: 4,
  },
});