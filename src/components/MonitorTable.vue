<template>
	<table class="table-auto border-collapse border border-gray-400 w-full">
	  <thead>
		<tr class="bg-gray-200">
		  <th class="border border-gray-400 px-4 py-2 text-left">Monitor</th>
		  <th class="border border-gray-400 px-4 py-2">FOUND</th>
		  <th class="border border-gray-400 px-4 py-2">BLOCKED</th>
		  <th class="border border-gray-400 px-4 py-2">IGNORED</th>
		</tr>
	  </thead>
	  <tbody>
		<tr v-for="(monitor, index) in monitors" :key="index">
		  <td class="border border-gray-400 px-4 py-2">{{ monitor.name }}</td>
		  <td class="border border-gray-400 text-center">
			<input
			  type="checkbox"
			  :checked="monitor.status === 'FOUND'"
			  @change="() => updateStatus(index, 'FOUND')"
			/>
		  </td>
		  <td class="border border-gray-400 text-center">
			<input
			  type="checkbox"
			  :checked="monitor.status === 'BLOCKED'"
			  @change="() => updateStatus(index, 'BLOCKED')"
			/>
		  </td>
		  <td class="border border-gray-400 text-center">
			<input
			  type="checkbox"
			  :checked="monitor.status === 'IGNORED'"
			  @change="() => updateStatus(index, 'IGNORED')"
			/>
		  </td>
		</tr>
	  </tbody>
	</table>
  </template>
  
  <script setup>
  import { reactive, watch, onMounted } from 'vue'
  const emit = defineEmits(['update'])

  onMounted( async () => {
	emit('update', monitors) // emitujemy zaktualizowane dane
  })
  
  const monitors = reactive([
	{ name: 'HASH', status: 'BLOCKED' },
	{ name: 'IP', status: 'BLOCKED' },
  ])
  
  function updateStatus(index, newStatus) {
	monitors[index].status = monitors[index].status === newStatus ? null : newStatus
	emit('update', monitors) // emitujemy zaktualizowane dane
  }
  </script>
  
  
  <style scoped>
  table {
	margin-top: 1rem;
	border-spacing: 0;
  }
  </style>
  