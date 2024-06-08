<!-- components/home.vue -->
<template>
  <div>
    <v-app-bar app>
      <v-img :src="authStore.logoUrl" alt="Company Logo" class="ml-5" max-width="150"></v-img>
      <v-app-bar-title> {{ authStore.companyName }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="mx-3">
      <v-container fluid>
        <v-row dense class="my-6">
          <v-spacer></v-spacer>
          <v-btn @click="openAddEmployeeDialog('ADD')">Add Employee</v-btn>
          <v-btn @click="openSearchDialog">Search</v-btn>
        </v-row>
        <v-row>
          <v-data-table :headers="headers" :items="employees" item-value="id">
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
        <AddEmployeeDialog v-if="showAddEmployeeDialog" v-model:show="showAddEmployeeDialog" @add-employee="addEmployee" :form-mode="formMode" :employee-details="selectedEmployeeDetail" />

        <!-- Search Dialog -->
        <SearchDialog v-if="showSearchDialog" v-model="showSearchDialog" @search="searchEmployees" />
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
import SearchDialog from '@/components/SearchDialog.vue'

const router = useRouter()
const authStore = useAuthStore()
const employeeStore = useEmployeeStore()

const showAddEmployeeDialog = ref(false)
const showSearchDialog = ref(false)
const formMode = ref('ADD')
const selectedEmployeeDetail = reactive({})

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
  formMode.value = mode
  if (mode === 'EDIT' && employee) {
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
    employeeStore.updateEmployee(employee)
  }
  showAddEmployeeDialog.value = false
}

const deleteEmployee = (employee) => {
  employeeStore.removeEmployee(employee.id)
}

const searchEmployees = (criteria) => {
  employeeStore.searchEmployees(criteria)
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
