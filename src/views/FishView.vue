<script setup lang="ts">
import { useFishesStore } from '@/stores/fishes';
import { useAchievementsStore } from '@/stores/achievements';
import { useHolesStore } from '@/stores/holes';
import { useBaitsStore } from '@/stores/baits';
import type { Achievement } from '@/types/achievement.type';
import type { Bait } from '@/types/bait.type';
import type { Hole } from '@/types/hole.type';
import { nextTick, onMounted, ref } from 'vue';
import type { Fish } from '@/types/fish.type';

const achievementFilter = ref<Achievement | null>(null);
const holeFilter = ref<Hole | null>(null);
const baitFilter = ref<Bait | null>(null);
const fishList = ref<Fish[]>([]);
const holesList = ref<Hole[]>([]);
const baitsList = ref<Bait[]>([]);

const fishesStore = useFishesStore();
const achievementsStore = useAchievementsStore();
const holesStore = useHolesStore();
const baitsStore = useBaitsStore();

const loadFishes = () => {
  fishList.value = fishesStore.getFilteredFishes(
    achievementFilter.value?.id,
    holeFilter.value?.id,
    baitFilter.value?.itemId,
  );
  holesList.value = holesStore.getFilteredHoles(achievementFilter.value?.id);
  baitsList.value = baitsStore.getFilteredBaits(achievementFilter.value?.id);
};

onMounted(async () => {
  await fishesStore.loadFishData();
  await achievementsStore.loadAchievementsData();
  await holesStore.loadHolesData();
  await baitsStore.loadBaitsData();
  fishList.value = fishesStore.fishesList;
  holesList.value = holesStore.holesList;
  baitsList.value = baitsStore.baitsList;
});
</script>
<template>
  <div>
    <select v-model="achievementFilter" @change="loadFishes">
      <option :value="null">&nbsp;-&nbsp;</option>
      <option v-for="achievement of achievementsStore.achievementsList" :key="achievement.id" :value="achievement">
        {{ achievement.name }}
      </option>
    </select>
    <select v-model="holeFilter" @change="loadFishes">
      <option :value="null">&nbsp;-&nbsp;</option>
      <option v-for="hole of holesList" :key="hole.id" :value="hole">
        {{ hole.name }}
      </option>
    </select>
    <select v-model="achievementFilter" @change="loadFishes">
      <option :value="null">&nbsp;-&nbsp;</option>
      <option v-for="bait of baitsList" :key="bait.itemId" :value="bait">
        {{ bait.name }}
      </option>
    </select>
  </div>
  <table>
    <tr v-for="fish of fishList" :key="fish.itemId">
      <td>{{ fish.name }}</td>
      <td>{{ fish.rarity }}</td>
      <td>{{ fish.achievement.name }}</td>
      <td>{{ fish.hole?.name }}</td>
      <td>{{ fish.bait?.name }}</td>
    </tr>
  </table>
</template>
<style lang="scss" scoped></style>
