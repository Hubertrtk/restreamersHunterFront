// src/stores/configStore.js
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    apiBaseUrl: localStorage.getItem('API_BASE_URL') || null,
    showApiUrlModal: false
  }),
  actions: {
    checkApiUrl() {
      if (!this.apiBaseUrl) {
        this.showApiUrlModal = true
      }
    },
    setApiUrl(url) {
      this.apiBaseUrl = url
      localStorage.setItem('API_BASE_URL', url)
      this.showApiUrlModal = false
    }
  }
})
