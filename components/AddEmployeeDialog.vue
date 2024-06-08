<template>
  <v-dialog v-model="modelValue" max-width="600px">
    <v-card>
      <v-card-title>
        Add Employee
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <!-- Use 'v-model.trim' to automatically trim whitespace -->
          <v-text-field v-model.trim="employee.name" label="Name" :rules="nameRules" required prepend-icon="mdi-map-marker"></v-text-field>

          <v-date-input
              v-model="employee.dob"
              label="Date of birth"
              required
          ></v-date-input>
          <v-text-field v-model.trim="employee.address" label="Address" required prepend-icon="mdi-map-marker"></v-text-field>
          <v-select v-model="employee.city" :items="cities" label="City" required prepend-icon="mdi-map-marker"></v-select>
          <!-- Removed 'value' attribute as 'v-model' is already binding the value -->
          <v-text-field v-model="employee.state" label="State" disabled required prepend-icon="mdi-map-marker"></v-text-field>
          <v-btn type="button" @click="addExperience">Add Experience</v-btn>
          <div v-for="(exp, index) in employee.experiences" :key="index" class="mt-3">
            <v-text-field v-model.trim="exp.title" label="Experience Title" required></v-text-field>
            <v-text-field v-model.number="exp.years" label="Years" type="number" required></v-text-field>
          </div>
          <v-btn type="submit">Add</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { useAuthStore } from '@/store/auth'

const props = defineProps({
  formMode: String,
  employeeDetails: Object
})
const emits = defineEmits(['add-employee'])

const modelValue = ref(false)
const form = ref(null)
let employee = reactive({
  name: '',
  dob: '',
  address: '',
  city: '',
  state: 'Tamil Nadu',
  experiences: [],
  company:''
})

const authStore = useAuthStore()
const cities = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul']

const nameRules = [
  v => !!v || 'Name is required'
]

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

const addExperience = () => {
  employee.experiences.push({ title: '', years: '' })
}

const handleSubmit = () => {
  if (form.value.validate()) {
    modelValue.value = false;
    employee.company = authStore.companyName
    emits('add-employee', employee)
  }
}
</script>
