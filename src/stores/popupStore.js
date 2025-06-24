import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
	userPopup: false,
  }),
  actions: {
	setUserPopup(email) {
		console.log("setting user popup to", email);
	  return this.userPopup = email
	},
	getUserPopup() {
	  return this.userPopup
	},
  }
})
