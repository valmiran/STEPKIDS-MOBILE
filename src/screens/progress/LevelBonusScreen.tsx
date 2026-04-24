import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function LevelBonusScreen({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>VOCÊ ESTÁ NO NÍVEL</Text>

        <View style={styles.levels}>
          <Text style={styles.circleSmall}>6</Text>
          <Text style={styles.circleSmall}>7</Text>

          <View style={styles.currentLevel}>
            <Text style={styles.small}>VOCÊ ESTÁ NO NÍVEL</Text>
            <Text style={styles.levelNumber}>7</Text>
            <Text style={styles.face}>🙂</Text>
          </View>

          <Text style={styles.circle}>8</Text>
          <Text style={styles.circle}>9</Text>
          <Text style={styles.circleBig}>10</Text>
        </View>

        <Button title="Resgatar" onPress={() => setModalVisible(true)} />
      </View>

      <BottomNav navigation={navigation} active="home" />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.rewardModal}>
            <Text style={styles.modalTitle}>VOCÊ CHEGOU NO NÍVEL 10!</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton}>
                <Text>Resgatar Agora</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text>Agora não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 18 },
  back: { fontWeight: '700', marginBottom: 16 },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 20,
  },
  levels: {
    flex: 1,
    alignItems: 'center',
  },
  circleSmall: {
    backgroundColor: '#F8D6E7',
    borderRadius: 25,
    width: 50,
    height: 50,
    textAlign: 'center',
    paddingTop: 13,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.lilac,
  },
  circle: {
    backgroundColor: '#F8D6E7',
    borderRadius: 28,
    width: 56,
    height: 56,
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 14,
  },
  circleBig: {
    backgroundColor: colors.yellow,
    borderRadius: 42,
    width: 84,
    height: 84,
    textAlign: 'center',
    paddingTop: 24,
    fontSize: 26,
    fontWeight: '900',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.lilac,
  },
  currentLevel: {
    position: 'absolute',
    right: 22,
    top: 80,
    backgroundColor: colors.blue,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  small: { fontSize: 9, fontWeight: '900' },
  levelNumber: { fontSize: 28, fontWeight: '900' },
  face: { fontSize: 24 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  rewardModal: {
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 18,
  },
  modalTitle: {
    fontWeight: '900',
    marginBottom: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    backgroundColor: '#F8D6E7',
    padding: 10,
    borderRadius: 10,
  },
});