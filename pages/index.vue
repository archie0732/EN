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
          <!-- 個人單字庫卡片 -->
          <div
            class="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            @click="navigateToVocabulary"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                src="/img/fulina.jpg"
                alt="個人單字庫"
                class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div class="p-6">
              <h2
                class="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300"
              >
                打造個人單字庫
              </h2>
              <p class="text-gray-600">建立屬於您的單字集，輕鬆記憶和複習。智能複習系統幫助您確保學習效果。</p>
            </div>
          </div>

          <!-- 互動式學習卡片 -->
          <div
            class="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            @click="navigateToQuiz"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                src="/img/ayaka002.jpg"
                alt="互動式學習"
                class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div class="p-6">
              <h2
                class="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300"
              >
                互動式學習
              </h2>
              <p class="text-gray-600">透過多樣化的選擇題測驗和互動練習，有效鞏固您的學習成果。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const navigateToVocabulary = () => {
  router.push("/addWord");
};

const navigateToQuiz = () => {
  router.push("/pratice");
};
</script>
