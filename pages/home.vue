<template>
      <v-app-bar app>
        <v-img :src="authStore.logoUrl" alt="Company Logo" class="mr-4" width="50"></v-img>
        <v-app-bar-title> {{authStore.companyName}}</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
          logout
        </v-btn>
      </v-app-bar>
    <v-container style="background-color: black" class="mt-10">

    <v-btn @click="openAddEmployeeDialog">Add Employee</v-btn>
    <v-btn @click="openSearchDialog">Search</v-btn>

    <v-data-table :headers="headers" :items="employees"  item-value="id">
      <template v-slot:no-data>
        <v-alert :value="true" type="info" class="mt-4">
          No data available
        </v-alert>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editEmployee(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteEmployee(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <!-- Add Employee Dialog -->
    <AddEmployeeDialog v-model="showAddEmployeeDialog" @add-employee="addEmployee" :form-mode="formMode" :employee-details="SelectedEmployeeDetail"/>

    <!-- Search Dialog -->
    <SearchDialog v-model="showSearchDialog" @search="searchEmployees" />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
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
let formMode =ref('ADD')
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'DOB', key: 'dob' },
  { title: 'Address', key: 'address' },
  { title: 'City', key: 'city' },
  { title: 'State', key: 'state' },
  { title: 'Experience', key: 'experience' },
  { title: 'Actions', key: 'actions', sortable: false }
]
let SelectedEmployeeDetail = reactive({});

onMounted(async ()=>{
  debugger
 await employeeStore.fetchEmployees()
})

const employees = computed(() => employeeStore.employees.filter((emp)=> emp.company=== authStore.companyName))

const openAddEmployeeDialog = () => {
  showAddEmployeeDialog.value = true
}

const openSearchDialog = () => {
  showSearchDialog.value = true
}

const addEmployee = (employee) => {
  debugger

  employeeStore.addEmployee(employee)
}
const editEmployee= (employee)=> {
  formMode = 'EDIT'
  SelectedEmployeeDetail = employee;
  openAddEmployeeDialog()

}

const deleteEmployee= (employee)=> {
  debugger
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
v-btn{
  background-color: blue;
}
</style>
