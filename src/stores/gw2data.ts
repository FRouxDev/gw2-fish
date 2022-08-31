import GW2APIService from '@/services/guildWars2API.service';
import { defineStore } from 'pinia';
import { useAchievementsStore } from './achievements';

export const useGW2Store = defineStore('gw2', {
  state: () => ({
    achievements: [] as any[],
    accountAchievements: [] as any[],
  }),
  actions: {
    async loadGW2Data() {
      const achievementsStore = useAchievementsStore();
      try {
        const achievementsIds = [
          ...achievementsStore.achievementsList.map((achievement) => achievement.id),
          ...achievementsStore.achievementsList.map((achievement) => achievement.repeatId),
        ];
        const achievements = await GW2APIService.get('/achievements', {
          ids: achievementsIds.join(','),
        });
        const accountAchievements = await GW2APIService.get('/account/achievements');
        this.achievements = achievements;
        this.accountAchievements = accountAchievements.filter((achievement: any) =>
          achievementsIds.includes(achievement.id),
        );
      } catch (e) {
        throw new Error('Could not reach the API');
      }
    },
  },
});
