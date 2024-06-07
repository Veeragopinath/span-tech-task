<template>
  <v-dialog v-model="modelValue" max-width="600px">
    <v-card>
      <v-card-title>
        Add Employee
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <v-text-field v-model="employee.name" label="Name" :rules="nameRules" required prepend-icon="mdi-map-marker"></v-text-field>
             {{employee.dob}}
          <v-date-input  v-model="employee.dob" label="DOB" type="date" required ></v-date-input>

          <v-text-field v-model="employee.address" label="Address" required prepend-icon="mdi-map-marker"></v-text-field>
          <v-select v-model="employee.city" :items="cities" label="City" required prepend-icon="mdi-map-marker"></v-select>
          <v-text-field v-model="employee.state" label="State" disabled value="Tamil Nadu" required prepend-icon="mdi-map-marker"></v-text-field>
          <v-btn type="button" @click="addExperience">Add Experience</v-btn>
          <div v-for="(exp, index) in employee.experiences" :key="index" class="mt-3">
            <v-text-field v-model="exp.title" label="Experience Title" required></v-text-field>
            <v-text-field v-model="exp.years" label="Years" type="number" required></v-text-field>
          </div>
          <v-btn type="submit">Add</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { useAuthStore } from '@/store/auth'

const props = defineProps({
  formMode : String,
  employeeDetails : Object
})
const emits =defineEmits(['add-employee'])

const modelValue = ref(false)
const form = ref(null)
let employee = reactive({
   name : '',
   dob : '',
   address : '',
   city : '',
   state : 'Tamil Nadu',
   experiences : [],
})
const authStore = useAuthStore()
const cities = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul']

const nameRules = [
  v => !!v || 'Name is required'
]
onMounted(()=>{
  debugger
  if(props.formMode==="ADD"){
    employee = {};
  }else{
    debugger
    employee = props.employeeDetails
  }
})

const addExperience = () => {
  employee.experiences.push({ title: '', years: '' })
}

const handleSubmit = () => {
  debugger
  // const employee = { name: name.value, dob: dob.value, address: address.value, city: city.value, state: state.value, experiences: experiences.value , company : authStore.companyName }


  if (form.value.validate()) {
    modelValue.value = false
    emits('add-employee', employee)
  }
}
</script>

<style scoped>
/* Add styles here */
</style>
