import httpRequestService from '@/services/httpRequest.service';
import type { Fish } from '@/types/fish.type';
import { defineStore } from 'pinia';

export const useFishesStore = defineStore('fishes', {
  state: () => ({
    fishesList: [] as Fish[],
  }),
  actions: {
    async loadFishData() {
      try {
        const { fishes } = await httpRequestService.get('/fishes');
        this.fishesList = fishes;
      } catch (e) {
        throw new Error('Could not reach the API');
      }
    },
    getFilteredFishes(achievementId: number | null = null, holeId: number | null = null, baitId: number | null = null) {
      if (!achievementId && !holeId && !baitId) {
        return this.fishesList;
      }

      return this.fishesList.filter((fish) => {
        if (achievementId && fish.achievement.id !== achievementId) {
          return false;
        }
        if (holeId && fish.hole?.id !== holeId) {
          return false;
        }
        if (baitId && fish.bait?.itemId !== baitId) {
          return false;
        }
        return true;
      });
    },
  },
});
