<template>
	<div class="overlay" @click.self="close">
	  <div class="modal">
		<div class="wrapper-modal">
			<textarea class="textarea-users" v-model="usersToAction" rows="10" cols="50"></textarea>
			<textarea class="textarea-description" v-model="description" rows="2" cols="50"></textarea>
			<div class="select-wrapper">
				<select v-model="selectedUserType" class="border p-2 rounded-md">
      				<option disabled value="">Wybierz opcję</option>
      				<option v-for="option in options" :key="option" :value="option">
      				  {{ option }}
      				</option>
    		    </select>
				<button @click="assignUsers">assignUsers</button>
			</div>
			<MonitorTable @update="handleUpdate" />
		<button @click="close">Zamknij</button>
		</div>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { computed, defineProps, defineEmits, onMounted, ref  } from 'vue'
  import { useUsersStore } from '../stores/usersStore'
  import { usePopupStore } from '../stores/popupStore'
  import { useGroupStore } from '../stores/groupStore'
  import { useMonitorStore } from '../stores/monitorStore'
  import { converToAssignUsers } from '../utils/helpers'
  import MonitorTable from './MonitorTable.vue'
  import { assignUsers as assignUsersApi } from "../api/serviceApi"

  const usersStore = useUsersStore()
  const popupStore = usePopupStore()
  const groupStore = useGroupStore()
  const monitorStore = useMonitorStore()
  
  const emits = defineEmits(['close'])

  const selectedUserType = ref('EMAIL')
  const usersToAction = ref('')
  const description = ref('')
  const options = ['WMTID', 'EMAIL']


  const selectedMonitors = ref([])

  function close() {
	emits('close')
  }

  onMounted( async () => {
	await usersStore.updateUser(popupStore.userPopup)
	usersToAction.value = popupStore.selectedEmails.join(' ')
  })

  function handleUpdate(data) {
	selectedMonitors.value = data.map(m => ({ name: m.name, status: m.status }))
  }

  const  assignUsers = async () => {
	const data = converToAssignUsers(usersToAction.value.split(' '), selectedMonitors.value, selectedUserType.value)
	await assignUsersApi(data, description.value)
	groupStore.change()
	monitorStore.change()
  }

  function updateUser() {
  }

  </script>
  
  <style scoped>

  .select-wrapper{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	justify-content: space-around;
  }

  .wrapper-modal{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  }

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

  .textarea-users {
	width: 100%;
	height: 300px;
	resize: none;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: #f9f9f9;
	padding: 10px;
	margin-bottom: 10px;
	}

  .textarea-description{
	width: 100%;
	resize: none;
	margin-bottom: 10px;
	}

  button {
	padding: 0.5em 1em;
	cursor: pointer;
  }
  </style>
  