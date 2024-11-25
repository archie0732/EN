<template>
  <div class="min-h-screen bg-slate-500">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- title -->
        <div class="bg-gray-600 text-center mb-20 rounded-lg">
          <h1 class="text-4xl font-bold mb-4 text-white pt-5 pb-5">英文</h1>
        </div>

        <!-- 功能卡片區 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="card in cards"
            :key="card.id"
            class="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            @click="navigateToPage(card.path)"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="card.imgSrc"
                :alt="card.title"
                class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div class="p-6">
              <h2
                class="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300"
              >
                {{ card.title }}
              </h2>
              <p class="text-gray-600">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Card {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
  path: string;
}

const cards: Card[] = [
  {
    id: 1,
    title: "打造個人單字庫",
    description: "建立屬於您的單字集，輕鬆記憶和複習。智能複習系統幫助您確保學習效果。",
    imgSrc: "/img/fulina.jpg",
    path: "/addWord",
  },
  {
    id: 2,
    title: "互動式學習",
    description: "透過多樣化的選擇題測驗和互動練習，有效鞏固您的學習成果。",
    imgSrc: "/img/ayaka002.jpg",
    path: "/practice",
  },
  {
    id: 3,
    title: "查看單字列表",
    description: "瀏覽您所有儲存的單字，檢視學習進度和複習歷史。",
    imgSrc: "/img/aaa.jpg",
    path: "/viewWords",
  },
  {
    id: 4,
    title: "管理單字庫",
    description: "編輯或刪除您的單字，整理和維護您的個人單字庫。",
    imgSrc: "/img/yuki.jpg",
    path: "/manageWords",
  },
];

const navigateToPage = (path: string) => {
  navigateTo(path);
};
</script>
