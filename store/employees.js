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
    async addEmployee(employee) {
      await axios.post('/employees', employee)
      await this.fetchEmployees()
    },
    async removeEmployee(employeeId) {
      await axios.delete(`/employees/${employeeId}`)
      await this.fetchEmployees()
    },
    async updateEmployee(employee, id) {
      await axios.put(`/employees/${id}`, employee)
      await this.fetchEmployees()
    }
  }
})
