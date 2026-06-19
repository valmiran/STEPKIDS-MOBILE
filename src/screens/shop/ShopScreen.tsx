import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CheckCircle2,
  Coins,
  Lock,
  Shield,
  ShoppingBag,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react-native';

import AppHeader from '../../components/common/AppHeader';
import Button from '../../components/common/Button';
import { useChildren } from '../../hooks/useChildren';
import { childService } from '../../services/api/childService';
import { colors } from '../../theme';

type StoreItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  coinsCost: number;
  expCost: number;
  requiredLevel: number;
  motivationalMessage: string;
};

const STORE_ITEMS: StoreItem[] = [
  {
    id: 'cape_courage',
    name: 'Capa da Coragem',
    description: 'Um item simbólico para lembrar que cada passo da rotina exige coragem.',
    icon: '🦸',
    coinsCost: 30,
    expCost: 0,
    requiredLevel: 1,
    motivationalMessage:
      'Parabéns! A Capa da Coragem representa a força do herói ou heroína para continuar cuidando da órtese todos os dias.',
  },
  {
    id: 'shield_care',
    name: 'Escudo do Cuidado',
    description: 'Representa proteção, atenção e responsabilidade durante o tratamento.',
    icon: '🛡️',
    coinsCost: 50,
    expCost: 20,
    requiredLevel: 1,
    motivationalMessage:
      'O Escudo do Cuidado foi desbloqueado! Ele representa dedicação, proteção e compromisso com a jornada.',
  },
  {
    id: 'boots_journey',
    name: 'Botas da Jornada',
    description: 'Simbolizam os passos firmes que o herói ou heroína dá em direção à evolução.',
    icon: '🥾',
    coinsCost: 80,
    expCost: 40,
    requiredLevel: 2,
    motivationalMessage:
      'As Botas da Jornada mostram que cada passo conta. Continue firme na rotina com a órtese.',
  },
  {
    id: 'routine_star',
    name: 'Estrela da Rotina',
    description: 'Um símbolo para quem mantém constância nas missões e cuidados.',
    icon: '⭐',
    coinsCost: 100,
    expCost: 60,
    requiredLevel: 3,
    motivationalMessage:
      'A Estrela da Rotina foi conquistada! A constância é uma das maiores forças da jornada.',
  },
  {
    id: 'evolution_crystal',
    name: 'Cristal da Evolução',
    description: 'Marca o crescimento do herói ou heroína ao cumprir missões e acompanhar o tratamento.',
    icon: '💎',
    coinsCost: 140,
    expCost: 100,
    requiredLevel: 4,
    motivationalMessage:
      'O Cristal da Evolução mostra que o esforço está virando progresso real na jornada.',
  },
  {
    id: 'persistence_medal',
    name: 'Medalha da Persistência',
    description: 'Uma conquista para quem continua tentando mesmo nos dias difíceis.',
    icon: '🏅',
    coinsCost: 180,
    expCost: 140,
    requiredLevel: 5,
    motivationalMessage:
      'A Medalha da Persistência foi desbloqueada! Persistir também é uma forma de vencer.',
  },
  {
    id: 'hero_bracelet',
    name: 'Bracelete do Herói',
    description: 'Representa compromisso com a saúde, o cuidado e a evolução diária.',
    icon: '📿',
    coinsCost: 240,
    expCost: 180,
    requiredLevel: 6,
    motivationalMessage:
      'O Bracelete do Herói representa compromisso com a saúde, o cuidado e a evolução da jornada.',
  },
];

export default function ShopScreen({ navigation }: any) {
  const { children, loading, reload } = useChildren();

  const [selectedChildId, setSelectedChildId] = useState('');
  const [buyingItemId, setBuyingItemId] = useState('');

  const selectedChild = useMemo(() => {
    return children.find((child) => child.id === selectedChildId);
  }, [children, selectedChildId]);

  async function handleBuyItem(item: StoreItem) {
    if (!selectedChildId || !selectedChild) {
      Alert.alert(
        'Selecione o herói ou heroína',
        'Escolha quem vai usar moedas e XP para desbloquear uma conquista da jornada.'
      );
      return;
    }

    if ((selectedChild.level || 1) < item.requiredLevel) {
      Alert.alert(
        'Nível insuficiente',
        `Essa conquista precisa do nível ${item.requiredLevel}. Continue cumprindo missões para evoluir.`
      );
      return;
    }

    try {
      setBuyingItemId(item.id);

      await childService.spendChildResources(selectedChildId, {
        coins: item.coinsCost,
        exp: item.expCost,
        itemId: item.id,
        itemName: item.name,
        message: item.motivationalMessage,
      });

      Alert.alert('Conquista desbloqueada!', item.motivationalMessage);

      await reload();
    } catch (error: any) {
      Alert.alert(
        'Atenção',
        error?.message || 'Não foi possível desbloquear esta conquista.'
      );
    } finally {
      setBuyingItemId('');
    }
  }

  function canBuyItem(item: StoreItem) {
    if (!selectedChild) return false;

    const hasCoins = (selectedChild.goldCoins || 0) >= item.coinsCost;
    const hasExp = (selectedChild.totalExp || 0) >= item.expCost;
    const hasLevel = (selectedChild.level || 1) >= item.requiredLevel;

    return hasCoins && hasExp && hasLevel;
  }

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        title="Loja da Jornada"
        subtitle="Conquistas da Jornada"
        fallbackRoute="ChildArea"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <ShoppingBag size={34} color={colors.white} />
          </View>

          <View style={styles.heroTextBox}>
            <Text style={styles.title}>Loja da Jornada</Text>

            <Text style={styles.description}>
              Escolha o herói ou heroína, veja seus recursos em tempo real e desbloqueie conquistas que representam cuidado, rotina e evolução.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Escolha o herói ou heroína</Text>

        <Text style={styles.sectionDescription}>
          Role para o lado para selecionar quem vai usar moedas e XP na Loja da Jornada.
        </Text>

        {loading ? (
          <View style={styles.loadingChildrenBox}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>Carregando heróis...</Text>
          </View>
        ) : (
          <FlatList
            data={children}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.childrenList}
            renderItem={({ item }) => {
              const selected = selectedChildId === item.id;

              return (
                <TouchableOpacity
                  style={[
                    styles.childSelectorCard,
                    selected && styles.childSelectorCardActive,
                  ]}
                  activeOpacity={0.86}
                  onPress={() => setSelectedChildId(item.id)}
                >
                  <View
                    style={[
                      styles.childAvatar,
                      selected && styles.childAvatarActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.childAvatarText,
                        selected && styles.childAvatarTextActive,
                      ]}
                    >
                      {item.name?.charAt(0)?.toUpperCase() || 'H'}
                    </Text>
                  </View>

                  <View style={styles.childInfo}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.childName,
                        selected && styles.childNameActive,
                      ]}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={[
                        styles.childMeta,
                        selected && styles.childMetaActive,
                      ]}
                    >
                      Nível {item.level || 1} • {item.totalExp || 0} XP
                    </Text>
                  </View>

                  {selected && (
                    <CheckCircle2 size={18} color={colors.white} />
                  )}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyChildrenBox}>
                <Text style={styles.emptyChildrenText}>
                  Nenhum herói cadastrado.
                </Text>
              </View>
            }
          />
        )}

        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View>
              <Text style={styles.walletTitle}>Recursos da Jornada</Text>
              <Text style={styles.walletSubtitle}>
                {selectedChild
                  ? selectedChild.name
                  : 'Selecione o herói ou heroína para carregar os recursos'}
              </Text>
            </View>

            <View style={styles.walletIcon}>
              <Coins size={24} color={colors.primaryDark} />
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Zap size={20} color={colors.primaryDark} />
              <Text style={styles.statNumber}>{selectedChild?.totalExp || 0}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.coinEmoji}>🪙</Text>
              <Text style={styles.statNumber}>{selectedChild?.goldCoins || 0}</Text>
              <Text style={styles.statLabel}>Moedas</Text>
            </View>

            <View style={styles.statBox}>
              <Trophy size={20} color={colors.accent} />
              <Text style={styles.statNumber}>{selectedChild?.level || 1}</Text>
              <Text style={styles.statLabel}>Nível</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Conquistas da Jornada</Text>

        <Text style={styles.sectionDescription}>
          Cada conquista representa uma parte simbólica da evolução no tratamento. Desbloqueie usando XP, moedas e nível.
        </Text>

        {STORE_ITEMS.map((item) => {
          const available = canBuyItem(item);
          const isBuying = buyingItemId === item.id;
          const levelBlocked =
            selectedChild && (selectedChild.level || 1) < item.requiredLevel;

          return (
            <View
              key={item.id}
              style={[
                styles.itemCard,
                available && styles.itemCardAvailable,
              ]}
            >
              <View style={styles.itemIconBox}>
                <Text style={styles.itemIcon}>{item.icon}</Text>
              </View>

              <View style={styles.itemContent}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>

                  {available ? (
                    <Sparkles size={18} color={colors.primary} />
                  ) : (
                    <Lock size={18} color={colors.muted} />
                  )}
                </View>

                <Text style={styles.itemDescription}>{item.description}</Text>

                <View style={styles.requirementsBox}>
                  <View style={styles.requirementPill}>
                    <Text style={styles.requirementText}>
                      🪙 {item.coinsCost}
                    </Text>
                  </View>

                  <View style={styles.requirementPill}>
                    <Text style={styles.requirementText}>
                      {item.expCost} XP
                    </Text>
                  </View>

                  <View style={styles.requirementPill}>
                    <Text style={styles.requirementText}>
                      Nível {item.requiredLevel}
                    </Text>
                  </View>
                </View>

                <View style={styles.messageBox}>
                  <Shield size={15} color={colors.primaryDark} />
                  <Text style={styles.messageText}>
                    {item.motivationalMessage}
                  </Text>
                </View>

                {levelBlocked ? (
                  <Text style={styles.blockedText}>
                    Precisa chegar ao nível {item.requiredLevel} para desbloquear.
                  </Text>
                ) : null}

                <TouchableOpacity
                  style={[
                    styles.buyButton,
                    !available && styles.buyButtonDisabled,
                  ]}
                  activeOpacity={0.86}
                  disabled={!available || isBuying}
                  onPress={() => handleBuyItem(item)}
                >
                  {isBuying ? (
                    <ActivityIndicator color={colors.white} />
                  ) : available ? (
                    <Text style={styles.buyButtonText}>Desbloquear conquista</Text>
                  ) : (
                    <Text style={styles.buyButtonDisabledText}>
                      Recursos insuficientes
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <Button
          title="Atualizar recursos"
          variant="secondary"
          onPress={reload}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: 18,
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 26,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroIcon: {
    width: 66,
    height: 66,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  heroTextBox: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 6,
  },
  description: {
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '600',
    lineHeight: 20,
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
  loadingChildrenBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loadingText: {
    marginTop: 8,
    color: colors.textLight,
    fontWeight: '700',
  },
  childrenList: {
    paddingBottom: 14,
    gap: 10,
  },
  childSelectorCard: {
    width: 260,
    minHeight: 72,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  childSelectorCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  childAvatar: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  childAvatarActive: {
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  childAvatarText: {
    color: colors.primaryDark,
    fontSize: 20,
    fontWeight: '900',
  },
  childAvatarTextActive: {
    color: colors.white,
  },
  childInfo: { flex: 1 },
  childName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 3,
  },
  childNameActive: { color: colors.white },
  childMeta: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '700',
  },
  childMetaActive: {
    color: 'rgba(255,255,255,0.84)',
  },
  emptyChildrenBox: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    width: 260,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyChildrenText: {
    color: colors.textLight,
    fontWeight: '700',
    textAlign: 'center',
  },
  walletCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    alignItems: 'center',
  },
  walletTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  walletSubtitle: {
    marginTop: 3,
    color: colors.textLight,
    fontWeight: '700',
    fontSize: 12,
  },
  walletIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceSoft,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  coinEmoji: {
    fontSize: 20,
  },
  statNumber: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 4,
  },
  statLabel: {
    color: colors.textLight,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 12,
  },
  itemCardAvailable: {
    borderColor: colors.primary,
  },
  itemIconBox: {
    width: 56,
    height: 56,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIcon: {
    fontSize: 28,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 5,
  },
  itemDescription: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 10,
  },
  requirementsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  requirementPill: {
    backgroundColor: colors.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  requirementText: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 12,
  },
  messageBox: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  messageText: {
    flex: 1,
    color: colors.textLight,
    fontWeight: '700',
    lineHeight: 18,
    fontSize: 12,
  },
  blockedText: {
    color: colors.danger,
    fontWeight: '800',
    fontSize: 12,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyButtonDisabled: {
    backgroundColor: '#DADADA',
  },
  buyButtonText: {
    color: colors.white,
    fontWeight: '900',
  },
  buyButtonDisabledText: {
    color: colors.textLight,
    fontWeight: '900',
  },
});