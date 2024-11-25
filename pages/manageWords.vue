<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- 頁面標題和返回按鈕 -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold text-gray-800 tracking-tight">管理單字庫</h1>
          <button
            @click="navigateToHome"
            class="px-6 py-2.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 hover:text-gray-900 flex items-center space-x-2"
          >
            <span>返回首頁</span>
          </button>
        </div>

        <!-- 搜尋框 -->
        <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg mb-6">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="搜尋英文或中文..."
            class="w-full px-6 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/90"
          />
        </div>

        <!-- 單字列表 -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    新增日期
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">英文</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">中文</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">圖片</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody class="bg-white/40 divide-y divide-gray-100">
                <tr
                  v-for="(word, index) in filteredWords"
                  :key="index"
                  class="hover:bg-purple-50/50 transition-colors duration-150"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatDate(word.date) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ word.english }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ word.chinese }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <img
                      v-if="word.imageUrl"
                      :src="word.imageUrl"
                      alt="單字圖片"
                      class="h-12 w-12 object-cover rounded-lg shadow-sm"
                    />
                    <span v-else class="text-sm text-gray-500">無圖片</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="space-x-3">
                      <button
                        @click="openEditModal(word, index)"
                        class="px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors duration-300"
                      >
                        編輯
                      </button>
                      <button
                        @click="confirmDelete(index)"
                        class="px-4 py-1.5 bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition-colors duration-300"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 編輯單字對話框 -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">編輯單字</h2>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">英文</label>
            <input
              v-model="editingWord.english"
              type="text"
              required
              class="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">中文</label>
            <input
              v-model="editingWord.chinese"
              type="text"
              required
              class="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">圖片網址</label>
            <input
              v-model="editingWord.imageUrl"
              type="text"
              class="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div class="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-6 py-2.5 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              儲存
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 刪除確認對話框 -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">確認刪除</h2>
        <p class="mb-6 text-gray-600">確定要刪除這個單字嗎？此操作無法復原。</p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-6 py-2.5 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            取消
          </button>
          <button
            @click="deleteWord"
            class="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Word } from "../types/word";

const router = useRouter();
const searchTerm = ref("");
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const editingWord = ref<Word>({
  english: "",
  chinese: "",
  imageUrl: "",
  date: new Date().toISOString().split("T")[0],
});
const editingIndex = ref<number>(-1);
const deleteIndex = ref<number>(-1);

// 初始化空數組
const words = ref<Word[]>([]);

// 在組件掛載後再讀取 localStorage
onMounted(() => {
  try {
    const savedWords = localStorage.getItem("words");
    if (savedWords) {
      words.value = JSON.parse(savedWords);
    }
  } catch (e) {
    console.error("Error loading words from localStorage:", e);
  }
});

// 過濾後的單字列表
const filteredWords = computed(() => {
  const searchLower = searchTerm.value.toLowerCase();
  return words.value.filter(
    (word) => word.english.toLowerCase().includes(searchLower) || word.chinese.includes(searchTerm.value)
  );
});

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

// 導航到首頁
const navigateToHome = () => {
  router.push("/");
};

// 打開編輯對話框
const openEditModal = (word: Word, index: number) => {
  editingWord.value = { ...word };
  editingIndex.value = index;
  showEditModal.value = true;
};

// 保存編輯
const saveEdit = () => {
  if (editingIndex.value > -1) {
    words.value[editingIndex.value] = { ...editingWord.value };
    try {
      localStorage.setItem("words", JSON.stringify(words.value));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
    showEditModal.value = false;
  }
};

// 確認刪除
const confirmDelete = (index: number) => {
  deleteIndex.value = index;
  showDeleteModal.value = true;
};

// 執行刪除
const deleteWord = () => {
  if (deleteIndex.value > -1) {
    words.value.splice(deleteIndex.value, 1);
    try {
      localStorage.setItem("words", JSON.stringify(words.value));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
    showDeleteModal.value = false;
  }
};
</script>
