<template>
	<div>
	  <h2>Grupa: {{ groupName }}</h2>
  
	  <div class="monitor-group-container">
		<div 
		  class="monitor-group" 
		  v-for="(items, type) in monitorTypes" 
		  :key="type"
		>
		  <h3>{{ type }}</h3>
		  <ul>
			<li 
			  class="list-element" 
			  v-for="item in items" 
			  :key="item"
			>
			  <input 
				type="checkbox" 
				:value="item" 
				:checked="isChecked(item)"
				@change="toggleChecked(item)"
			  />
			  <p @click="showUser(item)">{{ item }}</p>
			</li>
		  </ul>
		</div>
	  </div>
	  <!-- debug -->
	  <pre>Zaznaczone: {{ Array.from(checkedItems).join(', ') }}</pre>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useGroupStore } from '../stores/groupStore'
  import { usePopupStore } from '../stores/popupStore'
  import { useRoute } from 'vue-router'
  
  const groupStore = useGroupStore()
  const popupStore = usePopupStore()
  const monitorTypes = ref({})
  const checkedItems = ref(new Set()) // ✅ przechowuje zaznaczenia
  const route = useRoute()
  const groupName = ref(route.params.groupName)

  watch(() => groupStore.didChange, (newVal, oldVal) => {
  	saveUrl()
	console.log("change");
}, { deep: true })
  
  async function saveUrl() {
	const data = await groupStore.getGroup(groupName.value.toUpperCase())
	if (data && data.length > 0) {
	  monitorTypes.value = data
	} else {
	  await groupStore.updateGroup(groupName.value.toUpperCase())
	  const data = await groupStore.getGroup(groupName.value.toUpperCase())
	  monitorTypes.value = data
	}
  }
  
  // sprawdza czy item jest zaznaczony
  function isChecked(item) {
	return checkedItems.value.has(item)
  }
  
  // przełącza stan zaznaczenia
  function toggleChecked(item) {
	if (checkedItems.value.has(item)) {
	  checkedItems.value.delete(item)
	} else {
	  checkedItems.value.add(item)
	}
	popupStore.setSelectedEmails(Array.from(checkedItems.value))
  }

  const showUser = (user) => {
	console.log(user);
	popupStore.setUserPopup(user)
  }
  
  onMounted(saveUrl)
  
  watch(() => route.params.groupName, async (newVal) => {
	groupName.value = newVal
	checkedItems.value.clear() // reset zaznaczeń przy zmianie grupy
	await saveUrl()
  })
  </script>
  
  <style scoped>
  .monitor-group-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	border: 2px solid #ccc;
  }
  .monitor-group {
	flex: 1 1 30%;
	margin: 10px;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
	background-color: #f9f9f9;
	box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .list-element {
	margin: 10px 0;
	list-style-type: none;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
  }
  </style>
  