<!-- components/AddEmployeeDialog.vue -->
<template>
  <v-dialog v-model="modelValue" max-width="600px">
    <v-card>
      <v-card-title>
        {{ employee.dob }}
        {{ formMode === 'ADD' ? 'Add Employee' : 'Edit Employee' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
          <v-text-field variant="outlined" v-model="employee.name" label="Name" :rules="validationRules.name"
                        ></v-text-field>
          <v-text-field variant="outlined" v-model="employee.dob" label="DOB" type="date" :rules="validationRules.dob" ></v-text-field>


          <v-text-field variant="outlined" v-model="employee.address" label="Address" :rules="validationRules.address" ></v-text-field>
          <v-select variant="outlined" v-model="employee.city" :items="cities" label="City" :rules="validationRules.city"></v-select>
          <v-text-field variant="outlined" v-model="employee.state" label="State" disabled :rules="validationRules.state"></v-text-field>


          <experience-card :experiences.sync="employee.experiences"></experience-card>
          <v-row class="mt-5 ml-1">

            <v-btn variant="outlined"
                   flat type="button" @click="addExperience">Add Experience
            </v-btn>
            <v-btn variant="outlined" class="ml-4"
                   flat type="submit">{{ formMode === 'ADD' ? 'Submit' : 'Update' }}
            </v-btn>
          </v-row>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, reactive, watch, onMounted} from 'vue';
import ExperienceCard from '@/components/ExperienceCard.vue';
import {useAuthStore} from '@/store/auth';
import { validationRules } from '@/helpers/formValidation.js';
const props = defineProps({
  formMode: {
    type: String,
    default: 'ADD',
  },
  employeeDetails: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(['add-employee']);

const modelValue = ref(false);
const form = ref(null);
const employee = reactive({
  name: '',
  dob: '',
  address: '',
  city: '',
  state: 'Tamil Nadu',
  experiences: [],
});
const valid = ref(false);
const authStore = useAuthStore();
const cities = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Tiruchirappalli',
  'Salem',
  'Tirunelveli',
  'Vellore',
  'Erode',
  'Thoothukudi',
  'Dindigul'];



watch(
    () => props.employeeDetails,
    (newDetails) => {
      Object.assign(employee, newDetails);
    },
    {immediate: true, deep: true},
);

const resetEmployee = () => {
  employee.name = '';
  employee.dob = '';
  employee.address = '';
  employee.city = '';
  employee.state = 'Tamil Nadu';
  employee.experiences = [];
};



const addExperience = () => {

  const newExperiences = [...employee.experiences];
  newExperiences.push({ companyName: '', from: '', to: '', position: '' });
  employee.experiences = newExperiences;
};


const handleSubmit = () => {
  
  if (valid.value) {
    employee.company = authStore.companyName;
    emits('add-employee', {...employee});
  }
};
</script>

<style scoped>
/*  styles */
</style>
