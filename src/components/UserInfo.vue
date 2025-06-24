<template>
	<div class="overlay" @click.self="close">
	  <div class="modal">
		<h3>Informacje o użytkowniku {{ popupStore.userPopup }}</h3>
		<textarea readonly rows="10" cols="50" :value="formattedUser" />
		<button @click="close">Zamknij</button>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { computed, defineProps, defineEmits, onMounted } from 'vue'
  import { useUsersStore } from '../stores/usersStore'
  import { usePopupStore } from '../stores/popupStore'

  const usersStore = useUsersStore()
  const popupStore = usePopupStore()
  
  const emits = defineEmits(['close'])
  
  const formattedUser = computed(() => JSON.stringify(usersStore.users[popupStore.userPopup], null, 2))
  
  function close() {
	emits('close')
  }

  onMounted( async () => {
	await usersStore.updateUser(popupStore.userPopup)
  })

  </script>
  
  <style scoped>
  .overlay {
	position: fixed;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0,0,0,0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
  }
  .modal {
	background: white;
	padding: 20px;
	border-radius: 8px;
	max-width: 600px;
	width: 90%;
	box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }
  textarea {
	width: 100%;
	height: 500px;
	font-family: monospace;
	resize: none;
	margin-bottom: 1em;
  }
  button {
	padding: 0.5em 1em;
	cursor: pointer;
  }
  </style>
  