import httpRequestService from '@/services/httpRequest.service';
import type { Achievement } from '@/types/achievement.type';
import { defineStore } from 'pinia';

export const useAchievementsStore = defineStore('achievements', {
  state: () => ({
    achievementsList: [] as Achievement[],
  }),
  actions: {
    async loadAchievementsData() {
      try {
        const { achievements } = await httpRequestService.get('/achievements');
        this.achievementsList = achievements;
      } catch (e) {
        throw new Error('Could not reach the API');
      }
    },
  },
});
