<!-- components/ExperienceCard.vue -->
<template>
  <v-card v-for="(exp, index) in experiences" :key="index" class="mt-3">
    <v-card-text>
      <v-row><v-spacer></v-spacer>
        <v-btn icon @click="removeExperince(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn></v-row>
      <v-row>
        <v-text-field  variant="outlined"
                       v-model.trim="exp.companyName"
                       label="Experience Title"
                       required></v-text-field>
        <v-text-field
            variant="outlined"
            v-model="exp.from"
            label="From Date"
            required
        ></v-text-field>
        <v-text-field
            variant="outlined"
            v-model="exp.to"
            label="To Date"
            required
        ></v-text-field>
        <v-select   variant="outlined"
                    v-model="exp.position"
                    :items="position" label="City"
                    required
                    prepend-icon="mdi-map-marker"></v-select>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {onMounted, reactive, toRefs} from 'vue';

// const props = defineProps({
//   experience: Object,
//   index: Number,
//   experiences: Array,
// })

onMounted(() => {
  debugger
  if (props.formMode === "ADD") {
    // Reset the employee object to its initial state
    employee = reactive({
      name: '',
      dob: '',
      address: '',
      city: '',
      state: 'Tamil Nadu',
      experiences: [],
      'company':''
    })
  } else {
    employee = reactive(props.employeeDetails)
  }
})

const experiences = reactive([]);

// const { experience, index, experiences } = toRefs(props)
const addExperience = () => {
  experiences.push({ companyName: '', from: '', to :'',position :'' })
}

const removeExperince=(index)=>{
  experiences.splice(index, 1)
}

</script>
