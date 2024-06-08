<template>
  <v-app>
    <v-card
        class="ma-auto rounded-xl pa-6"
        color="#F2F2F2"
        max-width="auto"
        elevation="0"
    >
      <v-card-title><v-row class="d-flex justify-center mb-2"> SPAN TECHNOLOGY - TASK</v-row></v-card-title>
      <v-divider></v-divider>


        <v-form ref="form" @submit.prevent="handleLogin">
          <v-card-text>
          <v-text-field
              density="compact"
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              label="Username"
              type="text"
              v-model="email"
              :rules="emailRules"
              required
          ></v-text-field>
          <v-text-field
              density="compact"
              variant="outlined"
              prepend-inner-icon="mdi-lock-outline"
              hide-details
              label="phone Number"
              type="password"
              v-model="password"
              :rules="passwordRules"
              required
          ></v-text-field>
           </v-card-text>
          <v-divider></v-divider>
           <v-card-actions class="d-flex justify-center">

            <v-btn text color="primary" type="submit"> Login </v-btn>

            <v-btn text color="primary" @click="navigateToRegister">
              Sign up now
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>

          </v-card-actions>
        </v-form>


    </v-card>
  </v-app>

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
