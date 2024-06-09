<template>
  <v-app>
    <v-card
        class="ma-auto rounded-xl pa-6"
        min-width="400"
        elevation="0"
        variant="outlined"
    >
      <v-card-title><v-row class="d-flex justify-center mb-2"> SPAN TECHNOLOGY - TASK</v-row></v-card-title>
        <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
          <v-card-text>
          <v-text-field
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              label="Username"
              type="text"
              v-model="email"
              :rules="validationRules.email"

          ></v-text-field>
          <v-text-field

              variant="outlined"
              prepend-inner-icon="mdi-lock-outline"
              hide-details
              label="phone Number"
              type="password"
              v-model="password"
              :rules="validationRules.password"

          ></v-text-field>
           </v-card-text>

          <v-row class="my-4 ml-4">
            <v-btn variant="outlined"  type="submit"> Login </v-btn>

            <v-btn class="ml-4" variant="outlined"  @click="navigateToRegister">
              Sign up now

            </v-btn>
          </v-row>

        </v-form>


    </v-card>
  </v-app>

</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { validationRules } from '@/helpers/formValidation.js';
const email = ref('')
const password = ref('')
const valid = ref(false);
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    if (valid.value) {
      await authStore.login({ email: email.value, password: password.value })

      router.push('/home')
    }

  } catch (error) {
    alert(error.message) 
  }
}

const navigateToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>

</style>
