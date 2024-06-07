<template>
  <v-container>
    <v-form @submit.prevent="handleLogin">
      <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules" required></v-text-field>
      <v-btn type="submit">Login</v-btn>
      <v-btn @click="navigateToRegister">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const email = ref('')
const password = ref('')
const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]
const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 8 || 'Password must be at least 8 characters'
]

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    debugger
    await authStore.login({ email: email.value, password: password.value })

    router.push('/home')
  } catch (error) {
    alert(error.message) // Simplified error handling, can be improved
  }
}

const navigateToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
/* Add styles here */
</style>
