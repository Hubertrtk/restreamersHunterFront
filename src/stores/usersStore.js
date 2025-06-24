// src/stores/configStore.js
import { getUser } from '@/api/serviceApi'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: {}
  }),
  actions: {
    async updateUser(email) {
		const userData = await getUser(email)
		this.users[email] = userData
	}
  }
})
