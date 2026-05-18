import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import ChildSelect from '../../components/common/ChildSelect';
import { useShop } from '../../hooks/useShop';
import { ShopItem } from '../../types/shop';
import { colors } from '../../theme';

export default function ShopScreen({ navigation }: any) {
  const [childId, setChildId] = useState('');
  const { items, purchasedItems, loading, buyItem } = useShop(childId);

  const purchasedIds = purchasedItems.map((item) => item.id);

  async function handleBuy(item: ShopItem) {
    if (!childId) {
      Alert.alert('Atenção', 'Selecione uma criança antes de comprar.');
      return;
    }

    try {
      await buyItem(item);

      Alert.alert(
        'Compra realizada!',
        `${item.name} foi adicionado aos itens da criança.`
      );
    } catch (error: any) {
      Alert.alert(
        'Aviso',
        error?.message || 'Não foi possível comprar este item.'
      );
    }
  }

  function getRarityLabel(rarity: string) {
    if (rarity === 'common') return 'Comum';
    if (rarity === 'rare') return 'Raro';
    if (rarity === 'epic') return 'Épico';
    if (rarity === 'legendary') return 'Lendário';
    return rarity;
  }

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.title}>Loja do Herói</Text>

        <Text style={styles.description}>
          Use moedas de ouro para comprar itens visuais e preparar a evolução do personagem.
        </Text>

        <View style={styles.selectCard}>
          <Text style={styles.label}>Selecione a criança</Text>
          <ChildSelect selectedChildId={childId} onSelect={(id) => setChildId(id)} />
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.lilacDark} />
            <Text style={styles.loadingText}>Carregando loja...</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const purchased = purchasedIds.includes(item.id);

              return (
                <View style={styles.card}>
                  <View style={styles.iconBox}>
                    <Text style={styles.icon}>{item.icon}</Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.itemName}>{item.name}</Text>

                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>

                    <View style={styles.badgeRow}>
                      <View style={styles.priceBadge}>
                        <Text style={styles.badgeText}>🪙 {item.price}</Text>
                      </View>

                      <View style={styles.rarityBadge}>
                        <Text style={styles.badgeText}>
                          {getRarityLabel(item.rarity)}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.buyButton,
                        purchased && styles.disabledButton,
                      ]}
                      disabled={purchased}
                      onPress={() => handleBuy(item)}
                    >
                      <Text style={styles.buyText}>
                        {purchased ? 'Comprado' : 'Comprar'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>

      <BottomNav navigation={navigation} active="tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 18, paddingBottom: 90 },
  title: { fontSize: 26, fontWeight: '900', marginBottom: 8 },
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
  label: { fontWeight: '900', marginBottom: 8 },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.textLight,
    fontWeight: '700',
  },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 12,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 30 },
  info: { flex: 1 },
  itemName: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  itemDescription: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  priceBadge: {
    backgroundColor: colors.yellow,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  rarityBadge: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontWeight: '900',
    fontSize: 12,
  },
  buyButton: {
    backgroundColor: colors.lilacDark,
    borderRadius: 10,
    padding: 10,
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  buyText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '900',
  },
});