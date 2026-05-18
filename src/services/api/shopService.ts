import { Child } from '../../types/child';
import { PurchasedItem, ShopItem } from '../../types/shop';
import { userGet, userSet, userUpdate } from '../firebase/userDatabase';

export const defaultShopItems: ShopItem[] = [
  {
    id: 'hero_cap',
    name: 'Boné do Herói',
    description: 'Um boné especial para começar a jornada.',
    price: 100,
    icon: '🧢',
    rarity: 'common',
  },
  {
    id: 'magic_boots',
    name: 'Botas Mágicas',
    description: 'Botas que representam força e evolução.',
    price: 250,
    icon: '👟',
    rarity: 'rare',
  },
  {
    id: 'guardian_shield',
    name: 'Escudo Guardião',
    description: 'Um escudo para proteger o Pequeno Herói.',
    price: 500,
    icon: '🛡️',
    rarity: 'epic',
  },
  {
    id: 'golden_crown',
    name: 'Coroa dos Pés Mágicos',
    description: 'Item lendário para crianças muito dedicadas.',
    price: 1000,
    icon: '👑',
    rarity: 'legendary',
  },
];

export const shopService = {
  async getShopItems(): Promise<ShopItem[]> {
    return defaultShopItems;
  },

  async getPurchasedItems(childId: string): Promise<PurchasedItem[]> {
    const data = await userGet<Record<string, PurchasedItem>>(
      `children/${childId}/purchasedItems`
    );

    if (!data) return [];

    return Object.entries(data).map(([id, item]) => ({
      ...item,
      id,
    }));
  },

  async buyItem(childId: string, item: ShopItem): Promise<void> {
    const child = await userGet<Child>(`children/${childId}`);

    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const purchased = await userGet<PurchasedItem>(
      `children/${childId}/purchasedItems/${item.id}`
    );

    if (purchased) {
      throw new Error('Este item já foi comprado.');
    }

    const currentCoins = child.goldCoins || 0;

    if (currentCoins < item.price) {
      throw new Error('Moedas insuficientes para comprar este item.');
    }

    await userUpdate(`children/${childId}`, {
      goldCoins: currentCoins - item.price,
    });

    await userSet(`children/${childId}/purchasedItems/${item.id}`, {
      ...item,
      purchasedAt: new Date().toISOString(),
    });
  },
};