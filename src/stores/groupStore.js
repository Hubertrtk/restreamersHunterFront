import { getGroup } from '@/api/serviceApi'
import { defineStore } from 'pinia'

export const useGroupStore = defineStore('user', {
  state: () => ({
    groups: {
		FOUND: [],
		BLOCKED: [],
		IGONRED: [],
	},
	didChange: false,
  }),
  actions: {
    async getGroup(GROUP) {
      return this.groups[GROUP]
    },
    addUser(user) {
      this.users.push(user)
    },
    removeUser(email) {
      this.users = this.users.filter(u => u.email !== email)
    },
    async updateGroup(GROUP) {
	  const data = await getGroup(GROUP)
      this.groups[GROUP] = data
    },
	change() {
		this.didChange = !this.didChange
	}
  }
})
