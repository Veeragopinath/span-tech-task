<!-- components/AddEmployeeDialog.vue -->
<template>
  <v-dialog v-model="modelValue" max-width="600px">
    <v-card>
      <v-card-title>
        Add Employee
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <v-text-field v-model="employee.name" label="Name" :rules="nameRules" required></v-text-field>
          <v-date-input v-model="employee.dob" label="Date of Birth" required></v-date-input>
          <v-text-field v-model="employee.address" label="Address" required></v-text-field>
          <v-select v-model="employee.city" :items="cities" label="City" required></v-select>
          <v-text-field v-model="employee.state" label="State" disabled required></v-text-field>
          <v-btn type="button" @click="addExperience">Add Experience</v-btn>


          <experience-card :experiences.sync="employee.experiences"></experience-card>

          <v-btn type="submit">Add</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import ExperienceCard from '@/components/ExperienceCard.vue'
import { useAuthStore } from '@/store/auth'

const props = defineProps({
  formMode: {
    type: String,
    default: 'ADD'
  },
  employeeDetails: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['add-employee'])

const modelValue = ref(false)
const form = ref(null)
const employee = reactive({
  name: '',
  dob: '',
  address: '',
  city: '',
  state: 'Tamil Nadu',
  experiences: []
})
const authStore = useAuthStore()
const cities = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul']

const nameRules = [
  v => !!v || 'Name is required'
]

onMounted(() => {
  if (props.formMode === 'ADD') {
    resetEmployee()
  } else {
    Object.assign(employee, props.employeeDetails)
  }
})

const resetEmployee = () => {
  employee.name = ''
  employee.dob = ''
  employee.address = ''
  employee.city = ''
  employee.state = 'Tamil Nadu'
  employee.experiences = []
}

const addExperience = () => {
  employee.experiences.push({ companyName: '', from: '', to: '', position: '' })
}

const handleSubmit = () => {
  if (form.value.validate()) {
    employee.company = authStore.companyName
    modelValue.value = false
    emits('add-employee', { ...employee })
  }
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>
