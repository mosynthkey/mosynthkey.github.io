import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products/wavy',
    name: 'wavy-product',
    component: () => import('../views/WavyProductView.vue')
  },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import('../views/ProductView.vue')
  }
]

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
    routes
  })
}

// Keep default export for compatibility
export default createRouter()
