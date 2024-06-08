<template>
  <v-container class="d-flex justify-center align-center"
               style="height:100vh ">

    <v-card class="mx-auto pa-12 " elevation="8" rounded="lg">
      <v-form @submit.prevent="handleLogin">
        <div class="text-subtitle-1 text-medium-emphasis">User Login</div>
        <v-text-field
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="email" label="Email" :rules="emailRules" required
        ></v-text-field>

        <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
        </div>

        <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="password" label="Password" type="password" :rules="passwordRules" required
        ></v-text-field>

        <v-btn color="blue" size="large" variant="tonal" block type="submit">
          Log In
        </v-btn>

        <v-card-text class="text-center">
          <a
              class="text-blue text-decoration-none"
              @click="navigateToRegister"
          >
            Sign up now
            <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-form>
    </v-card>
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
