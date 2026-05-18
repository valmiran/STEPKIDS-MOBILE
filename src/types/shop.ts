export type ShopItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  rarity: ShopItemRarity;
};

export type PurchasedItem = ShopItem & {
  purchasedAt: string;
};