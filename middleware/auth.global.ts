import { useAuthStore } from '@/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();  
  if (process.client) {
    if (!authStore.user && to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login');
    }
  }
});
