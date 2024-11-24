<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto">
        <!-- title -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-4">單字練習</h2>
          <div class="flex justify-center gap-8">
            <div class="text-center">
              <p class="text-lg font-semibold text-green-600">答對</p>
              <p class="text-2xl font-bold">{{ correctCount }}</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-semibold text-red-600">答錯</p>
              <p class="text-2xl font-bold">{{ incorrectCount }}</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-semibold text-blue-600">剩餘題目</p>
              <p class="text-2xl font-bold">{{ remainingWords.length }}</p>
            </div>
          </div>
        </div>

        <div v-if="currentWord" class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <!-- aaaa -->
          <div class="relative h-64 bg-gray-100">
            <img
              :src="currentWord.imageUrl || commonImg"
              :alt="currentWord.english"
              class="w-full h-full object-cover"
            />
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <p class="text-2xl font-bold text-center">{{ currentWord.english }}</p>
            </div>
          </div>

          <!-- aaaa -->
          <div class="p-6 bg-gray-50">
            <div class="grid grid-cols-2 gap-4">
              <button
                v-for="option in options"
                :key="option"
                @click="checkAnswer(option)"
                :disabled="showResult"
                class="transform transition-all duration-300 text-lg font-semibold rounded-lg py-3 px-4 hover:scale-105"
                :class="getOptionClass(option)"
              >
                {{ option }}
              </button>
            </div>

            <!-- result -->
            <div
              v-if="showResult"
              class="mt-6 text-center p-4 rounded-lg"
              :class="isCorrect ? 'bg-green-100' : 'bg-red-100'"
            >
              <p :class="isCorrect ? 'text-green-700' : 'text-red-700'" class="text-xl font-bold mb-2">
                {{ isCorrect ? "答對了！" : "答錯了！正確答案是：" + currentWord.chinese }}
              </p>
              <button
                @click="nextQuestion"
                class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
              >
                下一題
              </button>
            </div>
          </div>
        </div>

        <!-- aaaa -->
        <div v-else class="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <p class="text-xl mb-4">
            {{ remainingWords.length === 0 ? "已完成所有題目！" : "暫無單字可供練習，請先新增單字！" }}
          </p>
          <div class="flex justify-center gap-4">
            <button
              v-if="remainingWords.length === 0"
              @click="resetQuiz"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              重新開始
            </button>
            <button
              @click="navigateToAdd"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              新增單字
            </button>
          </div>
        </div>

        <!-- button -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex justify-center gap-6">
            <button
              @click="navigateToHome"
              class="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <span class="inline-block transform rotate-180">➜</span>
              返回首頁
            </button>
            <button
              @click="confirmReset"
              class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              重新開始測驗
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Word } from "../types/word";
import commonImg from "../public/img/ayaka012.jpg";

const router = useRouter();
const words = ref<Word[]>([]);
const remainingWords = ref<Word[]>([]);
const currentWord = ref<Word | null>(null);
const options = ref<string[]>([]);
const showResult = ref<boolean>(false);
const isCorrect = ref<boolean>(false);
const correctCount = ref<number>(0);
const incorrectCount = ref<number>(0);

const loadWords = (): void => {
  words.value = JSON.parse(localStorage.getItem("words") || "[]");
  resetQuiz();
};

const resetQuiz = (): void => {
  remainingWords.value = [...words.value];
  correctCount.value = 0;
  incorrectCount.value = 0;
  showResult.value = false;
  nextQuestion();
};

const confirmReset = (): void => {
  if (confirm("確定要重新開始測驗嗎？這將清除目前的進度。")) {
    resetQuiz();
  }
};

const generateOptions = (correct: string): string[] => {
  const allOptions = words.value.map((w) => w.chinese).filter((c) => c !== correct);
  const shuffled = allOptions.sort(() => 0.5 - Math.random());
  const wrongOptions = shuffled.slice(0, 3);
  return [...wrongOptions, correct].sort(() => 0.5 - Math.random());
};

const nextQuestion = (): void => {
  showResult.value = false;
  if (remainingWords.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingWords.value.length);
    currentWord.value = remainingWords.value[randomIndex];
    remainingWords.value.splice(randomIndex, 1);
    if (currentWord.value) {
      options.value = generateOptions(currentWord.value.chinese);
    }
  } else {
    currentWord.value = null;
  }
};

const checkAnswer = (selected: string): void => {
  showResult.value = true;
  isCorrect.value = selected === currentWord.value?.chinese;
  if (isCorrect.value) {
    correctCount.value++;
  } else {
    incorrectCount.value++;
  }
};

const getOptionClass = (option: string): string => {
  if (!showResult.value) {
    return "bg-white hover:bg-gray-100 text-gray-800 shadow-md";
  }
  if (option === currentWord.value?.chinese) {
    return "bg-green-500 text-white";
  }
  return "bg-gray-200 text-gray-600";
};

const navigateToAdd = () => {
  router.push("/add");
};

const navigateToHome = () => {
  router.push("/");
};

onMounted(() => {
  loadWords();
});
</script>
