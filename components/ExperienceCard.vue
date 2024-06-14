<!-- components/ExperienceCard.vue -->
<template>
  <div>
    <v-card v-for="(exp, index) in experiences" :key="index" class="mt-3">

      <v-card-actions>
        <v-col>Add your Experience</v-col>
        <v-spacer></v-spacer>
        <v-btn icon @click="removeExperience(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-text>

        <v-row >
          <v-col cols="6"><v-text-field variant="outlined" v-model="exp.companyName" label="Company Name" :rules="validationRules.companyName"></v-text-field></v-col>
          <v-col cols="6"> <v-select variant="outlined" v-model="exp.position" :items="positions" label="Position" :rules="validationRules.position"></v-select></v-col>


        </v-row>
        <v-row>
          <v-col cols="6"> <v-text-field type="date" variant="outlined" v-model="exp.from" label="From Date" :rules="validationRules.employement_start_date"></v-text-field></v-col>
          <v-col cols="6"> <v-text-field type="date" variant="outlined" v-model="exp.to" label="To Date" :rules="validationRules.employement_end_date"></v-text-field> </v-col>


        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { validationRules } from '@/helpers/formValidation.js';
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
/* styles  */
</style>
