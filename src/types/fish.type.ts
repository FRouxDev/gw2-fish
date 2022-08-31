import type { Achievement } from './achievement.type';
import type { Bait } from './bait.type';
import type { Hole } from './hole.type';
import type { Rarity } from './rarity.type';

export interface Fish {
  itemId: number;
  icon: string;
  name: string;
  rarity: Rarity;
  time: string | null;
  power: string;
  strangeDiet: boolean;
  specialization: string | null;
  achievement: Achievement;
  hole: Hole | null;
  bait: Bait | null;
}
