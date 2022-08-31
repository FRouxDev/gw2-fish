import type { Rarity } from './rarity.type';

export interface Bait {
  itemId: number;
  icon: string;
  name: string;
  power: number;
  rarity: Rarity;
}
