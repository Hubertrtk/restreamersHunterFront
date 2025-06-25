import { getMonitor } from '@/api/serviceApi'
import { defineStore } from 'pinia'

export const useMonitorStore = defineStore('monitors', {
  state: () => ({
    monitors: {
	},
	didChange: false,
  }),
  actions: {
    async updateMonitor(MONITOR) {
	  const data = await getMonitor(MONITOR)
      this.monitors[MONITOR] = data
    },
	async getMonitor(MONITOR) {
		return this.monitors[MONITOR]
	  },
	change() {
		this.didChange = !this.didChange
	}
  }
})
