import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/index.vue'
import AddWordView from './pages/addWord.vue'
import PracticeView from './pages/pratice.vue'
import DailyView from './pages/addWord.vue'

import type { RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'add',
    component: AddWordView
  },
  {
    path: '/practice',
    name: 'practice',
    component: PracticeView
  },
  {
    path: '/daily',
    name: 'daily',
    component: DailyView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router