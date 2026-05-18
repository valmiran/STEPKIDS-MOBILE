import { useEffect, useState } from 'react';
import { shopService } from '../services/api/shopService';
import { PurchasedItem, ShopItem } from '../types/shop';

export function useShop(childId?: string) {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadShop() {
    try {
      setLoading(true);

      const shopItems = await shopService.getShopItems();
      setItems(shopItems);

      if (childId) {
        const purchased = await shopService.getPurchasedItems(childId);
        setPurchasedItems(purchased);
      } else {
        setPurchasedItems([]);
      }
    } finally {
      setLoading(false);
    }
  }

  async function buyItem(item: ShopItem) {
    if (!childId) return;

    await shopService.buyItem(childId, item);
    await loadShop();
  }

  useEffect(() => {
    loadShop();
  }, [childId]);

  return {
    items,
    purchasedItems,
    loading,
    reload: loadShop,
    buyItem,
  };
}