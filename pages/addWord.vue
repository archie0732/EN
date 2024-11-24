<template>
  <body>
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <button
            @click="navigateToHome"
            class="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
          >
            <span class="inline-block transform rotate-180">➜</span>
            返回首頁
          </button>
          <div class="bg-cyan-700 p-2 rounded-lg">
            <h2 class="text-2xl font-bold text-center text-white">新增單字</h2>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="bg-slate-400 rounded-lg shadow-lg p-6">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="english"> 英文單字 </label>
            <input
              v-model="word.english"
              type="text"
              id="english"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="chinese"> 中文翻譯 </label>
            <input
              v-model="word.chinese"
              type="text"
              id="chinese"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="imageType"> 圖片上傳方式 </label>
            <select
              v-model="imageType"
              id="imageType"
              class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3"
            >
              <option value="link">圖片連結</option>
              <option value="file">上傳圖片</option>
            </select>
          </div>
          <div v-if="imageType === 'link'" class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="imageUrl"> 圖片連結 </label>
            <input
              v-model="word.imageUrl"
              type="url"
              id="imageUrl"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div v-else class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="imageFile"> 上傳圖片 </label>
            <input
              @change="handleFileUpload"
              type="file"
              id="imageFile"
              accept="image/*"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
            >
              新增單字
            </button>
          </div>
        </form>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import type { Word } from "../types/word";

type ImageType = "link" | "file";

const router = useRouter();
const imageType = ref<ImageType>("link");
const word = reactive<Word>({
  english: "",
  chinese: "",
  imageUrl: "",
  date: new Date().toISOString().split("T")[0],
});

const navigateToHome = () => {
  router.push("/");
};

const handleFileUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        word.imageUrl = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = (): void => {
  const words: Word[] = JSON.parse(localStorage.getItem("words") || "[]");
  words.push({ ...word });
  localStorage.setItem("words", JSON.stringify(words));
  alert("單字新增成功！");

  // 重置表單
  word.english = "";
  word.chinese = "";
  word.imageUrl = "";
};
</script>
