<template>
  <v-dialog v-model="modelValue" max-width="600px">
    <v-card>
      <v-card-title>
        Search Employees
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSearch">
          <v-select v-model="searchBy" :items="searchOptions" label="Search By" required></v-select>
          <v-text-field v-model="searchTerm" label="Search Term" required></v-text-field>
          <v-btn type="submit">Search</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from 'vue'

const modelValue = ref(false)
const searchBy = ref('')
const searchTerm = ref('')
const searchOptions = ['Name', 'DOB', 'City']

const handleSearch = () => {
  emit('search', {by: searchBy.value, term: searchTerm.value})
  modelValue.value = false
}
</script>

<style scoped>
/* Add styles here */
</style>
