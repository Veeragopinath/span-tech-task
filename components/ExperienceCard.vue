<!-- components/ExperienceCard.vue -->
<template>
  <v-card>
    <v-card-title>
      <span class="text-h6">Experience</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="remove">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field
          v-model="experience.from"
          label="From Date"
          required
      ></v-text-field>
      <v-text-field
          v-model="experience.to"
          label="To Date"
          required
      ></v-text-field>
      <v-text-field
          v-model="experience.description"
          label="Description"
          required
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  experience: Object,
  index: Number,
  experiences: Array,
})

const { experience, index, experiences } = toRefs(props)

const remove = () => {
  experiences.value.splice(index, 1)
}
</script>
