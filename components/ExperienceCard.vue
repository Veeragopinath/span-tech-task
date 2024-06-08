<!-- components/ExperienceCard.vue -->
<template>
  <div>
    <v-card v-for="(exp, index) in experiences" :key="index" class="mt-3">
      <v-card-text>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn icon @click="removeExperience(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-text-field v-model="exp.companyName" label="Company Name" required></v-text-field>
          <v-date-input v-model="exp.from" label="From Date" required></v-date-input>
          <v-date-input v-model="exp.to" label="To Date" required></v-date-input>
          <v-select v-model="exp.position" :items="positions" label="Position" required></v-select>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'

const props = defineProps({
  experiences: {
    type: Array,
    required: true
  }
})
const emits = defineEmits(['update:experiences'])

const positions = ['Quality Analyst', 'Developer', 'Business Analyst']

const removeExperience = (index) => {
  props.experiences.splice(index, 1)
  emits('update:experiences', [...props.experiences])
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>
