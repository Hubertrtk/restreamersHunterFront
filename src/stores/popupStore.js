import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
	userPopup: false,
	showActionPopup: false,
	selectedEmails: [],
  }),
  actions: {
	setUserPopup(email) {
		console.log("setting user popup to", email);
	  return this.userPopup = email
	},
	setUserPopup(email) {
		console.log("setting user popup to", email);
	  return this.userPopup = email
	},
	setShowActionPopup(value) {
	  return this.showActionPopup = !!value
	},
	getUserPopup() {
	  return this.userPopup
	},
	setSelectedEmails(emails) {
		this.selectedEmails = emails
	},
  }
})
