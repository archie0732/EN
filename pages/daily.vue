<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">今日單字練習</h2>
      <div v-if="todayWords.length > 0" class="space-y-6">
        <div v-for="word in todayWords" :key="word.english" class="bg-white rounded-lg shadow-lg p-6">
          <img
            :src="word.imageUrl || '/api/placeholder/400/300'"
            :alt="word.english"
            class="w-full h-48 object-cover rounded mb-4"
          />
          <div class="text-center">
            <p class="text-2xl font-bold mb-2">{{ word.english }}</p>
            <p class="text-xl text-gray-600">{{ word.chinese }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-xl">今天還沒有新增單字！</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Word } from "../types/word";

const todayWords = ref<Word[]>([]);

const loadTodayWords = (): void => {
  const words: Word[] = JSON.parse(localStorage.getItem("words") || "[]");
  const today = new Date().toISOString().split("T")[0];
  todayWords.value = words.filter((word) => word.date === today);
};

onMounted(() => {
  loadTodayWords();
});
</script>
