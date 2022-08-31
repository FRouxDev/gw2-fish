import httpRequestService from '@/services/httpRequest.service';
import type { Fish } from '@/types/fish.type';
import type { Bait } from '@/types/bait.type';
import { defineStore } from 'pinia';
import { useFishesStore } from './fishes';

export const useBaitsStore = defineStore('baits', {
  state: () => ({
    baitsList: [] as Bait[],
  }),
  actions: {
    async loadBaitsData() {
      try {
        const { baits } = await httpRequestService.get('/baits');
        this.baitsList = baits;
      } catch (e) {
        throw new Error('Could not reach the API');
      }
    },
    getFilteredBaits(achievementId: number | null = null) {
      const fishesStore = useFishesStore();

      if (!achievementId) {
        return this.baitsList;
      }

      const baits = fishesStore.fishesList
        .filter((fish: Fish) => fish.achievement.id === achievementId && !!fish.bait)
        .map((fish: Fish) => fish.bait);
      const undupesBaits = [...new Map(baits.map((m) => [m?.itemId, m])).values()];
      return undupesBaits as Bait[];
    },
  },
});
