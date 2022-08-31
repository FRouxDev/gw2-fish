import httpRequestService from '@/services/httpRequest.service';
import type { Fish } from '@/types/fish.type';
import type { Hole } from '@/types/hole.type';
import { defineStore } from 'pinia';
import { useFishesStore } from './fishes';

export const useHolesStore = defineStore('holes', {
  state: () => ({
    holesList: [] as Hole[],
  }),
  actions: {
    async loadHolesData() {
      try {
        const { holes } = await httpRequestService.get('/holes');
        this.holesList = holes;
      } catch (e) {
        throw new Error('Could not reach the API');
      }
    },
    getFilteredHoles(achievementId: number | null = null) {
      const fishesStore = useFishesStore();
      if (!achievementId) {
        return this.holesList;
      }

      const holes = fishesStore.fishesList
        .filter((fish: Fish) => fish.achievement.id === achievementId && !!fish.hole)
        .map((fish: Fish) => fish.hole);
      const undupesHoles = [...new Map(holes.map((m) => [m?.id, m])).values()];
      return undupesHoles as Hole[];
    },
  },
});
