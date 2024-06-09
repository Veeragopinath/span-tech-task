
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    logoUrl: '',
    companyName: '',
  }),
  actions: {
    async login(credentials) {
      
      const users = await axios.get('/users')
      const user = users.data.find(user => user.email === credentials.email)
      if (!user) throw new Error('Email is not registered')
      if (user.password !== credentials.password) throw new Error('Incorrect Password')
      this.user = user
      this.logoUrl = user.logoUrl
      this.companyName = user.companyName
      localStorage.setItem('userToken', JSON.stringify(user));
    },
    async register(details) {
      
      const users = await axios.get('/users')
      const exists = users.data.some(user => user.email === details.email)
      if (exists) throw new Error('Email is already registered')
      await axios.post('/users', details)
      this.logoUrl = details.logoUrl
      this.companyName = details.companyName
    },
    logout() {
      this.user = null
      this.logoUrl = ''
      this.companyName = ''
    }
  }
})
