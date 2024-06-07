
// import { useAuthStore } from '@/store/auth'
// const authStore = useAuthStore()
export default defineNuxtRouteMiddleware((to, from) => {
  debugger
    const isAuthenticated = true; // Replace with your auth check

    // Check if the user is not authenticated and not already on the login page
    if (!isAuthenticated && to.path !== '/login') {
        // Redirect to the login page
        return navigateTo('/login');
    }

    // If the user is authenticated and trying to access the login page, redirect to the home page
    if (isAuthenticated && to.path === '/') {
        return navigateTo('/login');
    }

    // If none of the above conditions are met, do nothing and allow the navigation
})
