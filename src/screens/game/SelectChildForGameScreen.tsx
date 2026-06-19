import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CheckCircle2,
  Gamepad2,
  Plus,
  ShieldCheck,
} from 'lucide-react-native';

import AppHeader from '../../components/common/AppHeader';
import KeyboardAwareScreen from '../../components/common/KeyboardAwareScreen';
import Button from '../../components/common/Button';
import { useChildren } from '../../hooks/useChildren';
import { Child } from '../../types/child';
import { colors } from '../../theme';

export default function SelectChildForGameScreen({ navigation }: any) {
  const { children, loading } = useChildren();
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  function handleStartGame() {
    if (!selectedChild) return;

    navigation.navigate('GamePlaceholder', {
      childId: selectedChild.id,
      childName: selectedChild.name,
    });
  }

  function handleSelectHero(child: Child) {
    setSelectedChild((current) => (current?.id === child.id ? null : child));
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Escolha o Herói"
        subtitle="Monte a Órtese do Herói"
        fallbackRoute="ChildArea"
      />

      <KeyboardAwareScreen contentStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Gamepad2 size={36} color={colors.white} />
          </View>

          <Text style={styles.title}>Quem vai iniciar a aventura?</Text>

          <Text style={styles.description}>
            Escolha o herói ou heroína que vai jogar agora. Assim, XP, moedas e medalhas serão enviados para o perfil correto.
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>Carregando heróis...</Text>
          </View>
        ) : children.length === 0 ? (
          <View style={styles.emptyCard}>
            <Plus size={34} color={colors.primaryDark} />

            <Text style={styles.emptyTitle}>Nenhum herói cadastrado</Text>

            <Text style={styles.emptyText}>
              Cadastre uma criança antes de iniciar o jogo Monte a Órtese do Herói.
            </Text>

            <Button
              title="Cadastrar criança"
              onPress={() => navigation.navigate('CreateChild')}
            />
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Heróis cadastrados</Text>

            <Text style={styles.sectionDescription}>
              Toque no herói ou heroína para selecionar. Toque novamente no mesmo perfil para remover a seleção.
            </Text>

            {children.map((child) => {
              const isSelected = selectedChild?.id === child.id;

              return (
                <TouchableOpacity
                  key={child.id}
                  style={[
                    styles.childCard,
                    isSelected && styles.childCardSelected,
                  ]}
                  activeOpacity={0.84}
                  onPress={() => handleSelectHero(child)}
                >
                  <View style={styles.avatarBox}>
                    <Text style={styles.avatarText}>
                      {child.name?.charAt(0)?.toUpperCase() || 'H'}
                    </Text>
                  </View>

                  <View style={styles.childInfo}>
                    <Text style={styles.childName}>{child.name}</Text>

                    <Text style={styles.childDetails}>
                      {child.age} anos • Nível {child.level || 1}
                    </Text>

                    <Text style={styles.childRewardInfo}>
                      XP: {child.totalExp || 0} • Moedas: {child.goldCoins || 0}
                    </Text>
                  </View>

                  {isSelected ? (
                    <CheckCircle2 size={26} color={colors.success} />
                  ) : (
                    <ShieldCheck size={24} color={colors.muted} />
                  )}
                </TouchableOpacity>
              );
            })}

            {selectedChild && (
              <View style={styles.selectedBox}>
                <Text style={styles.selectedTitle}>Herói selecionado</Text>
                <Text style={styles.selectedText}>
                  As recompensas do jogo serão enviadas para {selectedChild.name}.
                </Text>
              </View>
            )}

            <Button
              title="Começar aventura"
              onPress={handleStartGame}
              disabled={!selectedChild}
              style={!selectedChild ? styles.disabledButton : undefined}
            />
          </>
        )}
      </KeyboardAwareScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 18,
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
  },
  heroIcon: {
    width: 70,
    height: 70,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  loadingBox: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  loadingText: {
    marginTop: 10,
    color: colors.textLight,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 8,
    marginBottom: 12,
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 6,
  },
  sectionDescription: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 12,
  },
  childCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  childCardSelected: {
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  avatarBox: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 3,
  },
  childDetails: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '700',
  },
  childRewardInfo: {
    fontSize: 12,
    color: colors.primaryDark,
    fontWeight: '900',
    marginTop: 4,
  },
  selectedBox: {
    backgroundColor: colors.accentSoft,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.accent,
    marginTop: 4,
    marginBottom: 4,
  },
  selectedTitle: {
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  selectedText: {
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 19,
  },
  disabledButton: {
    opacity: 0.5,
  },
});