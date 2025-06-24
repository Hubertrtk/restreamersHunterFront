// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // 👉 import routera

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router) // 👉 zarejestruj router

import { useConfigStore } from './stores/configStore'

// Sprawdź API URL przed mountem
const configStore = useConfigStore()
configStore.checkApiUrl()

app.mount('#app')
