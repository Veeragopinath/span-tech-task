<!-- components/home.vue -->
<template>
  <div>
    <v-app-bar app>
      <v-img :src="authStore.logoUrl" alt="Company Logo" class="ml-5" max-width="100"></v-img>
      <v-app-bar-title class="text-h4 font-weight-bold"> {{ authStore.companyName }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="mx-3">
      <v-container fluid>
        <v-row dense class="my-6">
          <v-icon class="mt-1" icon="mdi-account-group"></v-icon>  
          <v-col class="ml-4 text-h6 font-weight-bold">Employees data
            List</v-col>
          <v-spacer></v-spacer>

          <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
          ></v-text-field>
          <v-btn   class="ml-8"
              prepend-inner-icon=""
                 variant="outlined"
                 flat
                 single-line @click="openAddEmployeeDialog('ADD')">Add Employee</v-btn>

        </v-row>
        <v-row>
          <v-data-table  :headers="headers" :items="employees" item-value="id" v-model:search="search">
            <template #no-data>
              <v-alert :value="true" class="mt-4 bg-white">
                No data available
              </v-alert>
            </template>
            <template #item.actions="{ item }">
              <v-icon class="me-2" size="small" @click="openAddEmployeeDialog('EDIT', item)">
                mdi-pencil
              </v-icon>
              <v-icon size="small" @click="deleteEmployee(item)">mdi-delete</v-icon>
            </template>
            <template #item.experience="{ item }">
              <v-row v-for="exp in item.experiences" :key="exp.title">{{ exp.companyName }} - {{ exp.position }}</v-row>
            </template>
          </v-data-table>
        </v-row>

        <!-- Add Employee Dialog -->
        <AddEmployeeDialog v-model="showAddEmployeeDialog" @add-employee="addEmployee" :form-mode="formMode" :employee-details="selectedEmployeeDetail" />


      </v-container>
    </v-main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useEmployeeStore } from '@/store/employees.js'
import AddEmployeeDialog from '@/components/AddEmployeeDialog.vue'

const router = useRouter()
const authStore = useAuthStore()
const employeeStore = useEmployeeStore()
const search = ref('')
const showAddEmployeeDialog = ref(false)

const formMode = ref('ADD')
const selectedEmployeeDetail = reactive({})
const selectedEmployeeId = ref("")
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'DOB', key: 'dob' },
  { title: 'Address', key: 'address' },
  { title: 'City', key: 'city' },
  { title: 'State', key: 'state' },
  { title: 'Experience', key: 'experience' },
  { title: 'Actions', key: 'actions', sortable: false }
]

onMounted(async () => {
  await employeeStore.fetchEmployees()
})

const employees = computed(() => employeeStore.employees.filter((emp) => emp.company === authStore.companyName))

const openAddEmployeeDialog = (mode, employee = null) => {
  debugger
  formMode.value = mode
  if (mode === 'EDIT' && employee) {
    selectedEmployeeId.value = employee.id 
    Object.assign(selectedEmployeeDetail, employee)
  } else {
    resetSelectedEmployeeDetail()
  }
  showAddEmployeeDialog.value = true
}

const resetSelectedEmployeeDetail = () => {
  Object.assign(selectedEmployeeDetail, {
    name: '',
    dob: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    experiences: []
  })
}

const addEmployee = (employee) => {
  if (formMode.value === 'ADD') {
    employeeStore.addEmployee(employee)
  } else {
    debugger
    employeeStore.updateEmployee(employee, selectedEmployeeId.value)
  }
  showAddEmployeeDialog.value = false
}

const deleteEmployee = (employee) => {
  employeeStore.removeEmployee(employee.id)
}

const logout = () => {
  if (confirm('Are you sure you want to log out?')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>


<style scoped>
v-btn {
  background-color: blue;
}
</style>
