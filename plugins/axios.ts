// plugins/axios.ts
import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    axios.defaults.baseURL = 'http://localhost:3001/' // Modify this base URL according to your setup

    nuxtApp.provide('axios', axios)
})
