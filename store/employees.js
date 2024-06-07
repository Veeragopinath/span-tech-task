// store/employee.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: []
  }),
  actions: {
    async fetchEmployees() {
      const response = await axios.get('/employees')
      this.employees = response.data
    },
    addEmployee(employee) {
      this.employees.push(employee)
      axios.post('/employees', employee)
    },
   async removeEmployee(employeeId) {
      debugger
     await axios.delete(`/employees/${employeeId}`)
     await this.fetchEmployees()
    },
    async updateEmployee(employeeId) {
      await axios.put(`/employees/${employeeId}`)
      await this.fetchEmployees()
    },
    searchEmployees(criteria) {
      this.fetchEmployees().then(() => {
        this.employees = this.employees.filter(employee => employee[criteria.by].includes(criteria.term))
      })
    }
  }
})
