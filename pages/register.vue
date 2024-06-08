<template>
  <v-card
      class="  ma-auto rounded-xl pa-6 "
      min-width="400"
      elevation="0"
      variant="outlined"
  >
    <v-card-title>Register User</v-card-title>
   <v-container>
    <v-form ref="form" v-model="valid" @submit.prevent="handleRegister">
      <v-text-field variant="outlined" v-model="companyName" label="Company Name" :rules="validationRules.companyName" required></v-text-field>
      <v-text-field variant="outlined" v-model="logoUrl" label="Logo URL" :rules="validationRules.logoUrl" required></v-text-field>
      <v-text-field variant="outlined" v-model="email" label="Email" :rules="validationRules.email" required></v-text-field>
      <v-text-field variant="outlined" v-model="password" label="Password" type="password" :rules="validationRules.password" required></v-text-field>
    <v-row class="mt-4 ml-1">
      <v-btn variant="outlined" type="submit">Register</v-btn>
      <v-btn class="ml-4" variant="outlined" @click="navigateToLogin">Login</v-btn>

    </v-row>
    </v-form>
  </v-container>
  </v-card>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/store/auth'
import { validationRules } from '@/helpers/formValidation.js';
const companyName = ref('')
const logoUrl = ref('')
const email = ref('')
const password = ref('')
const valid = ref(false);
const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async () => {
  try {
    if (valid.value) {
      await authStore.register({
        companyName: companyName.value,
        logoUrl: logoUrl.value,
        email: email.value,
        password: password.value
      })
      router.push('/login')
    }

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
