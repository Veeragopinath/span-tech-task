<template>
  <v-container>
    <v-form @submit.prevent="handleRegister">
      <v-text-field v-model="companyName" label="Company Name" :rules="companyNameRules" required></v-text-field>
      <v-text-field v-model="logoUrl" label="Logo URL" :rules="logoUrlRules" required></v-text-field>
      <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules" required></v-text-field>
      <v-btn type="submit">Register</v-btn>
      <v-btn @click="navigateToLogin">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/store/auth'

const companyName = ref('')
const logoUrl = ref('')
const email = ref('')
const password = ref('')
const companyNameRules = [
  v => !!v || 'Company Name is required'
]
const logoUrlRules = [
  v => !!v || 'Logo URL is required'
]
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

const handleRegister = async () => {
  try {
    await authStore.register({
      companyName: companyName.value,
      logoUrl: logoUrl.value,
      email: email.value,
      password: password.value
    })
    router.push('/login')
  } catch (error) {
    alert(error.message) // Simplified error handling, can be improved
  }
}

const navigateToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* Add styles here */
</style>
