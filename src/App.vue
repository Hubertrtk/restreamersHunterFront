<template>
	<div>
	  <Modal v-if="configStore.showApiUrlModal" @save="handleSave" />
	  <UserInfo v-if="popupStore.userPopup" @close="handleCloseUserPopup" />
	  <!-- <template v-else> -->
      <!-- <AllGroups /> -->
      <router-view />
    <!-- </template> -->
	</div>
  </template>
  
  <script setup>
  import { useConfigStore } from './stores/configStore'
  import { usePopupStore } from './stores/popupStore'
  import { useUsersStore } from './stores/usersStore'
  import Modal from './components/Modal.vue'
  import UserInfo from './components/UserInfo.vue'
  
  const configStore = useConfigStore()
  const popupStore = usePopupStore()
  const usersStore = useUsersStore()
  
  function handleSave(url) {
	configStore.setApiUrl(url)
  }
  
  function handleCloseUserPopup() {
	console.log("closing user popup");
	popupStore.setUserPopup(false)
  }
  </script>
  