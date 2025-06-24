<!-- src/components/Modal.vue -->
<template>
	<div class="modal-overlay">
	  <div class="modal-content">
		<h2>Ustaw API Base URL</h2>
		<input v-model="url" placeholder="https://api.example.com" />
		<button @click="saveUrl" :disabled="!url">Zapisz</button>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emit = defineEmits(['save'])
  const url = ref('')
  
  function saveUrl() {
	if (url.value) {
	  emit('save', url.value)
	}
  }
  </script>
  
  <style scoped>
  .modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
  }
  .modal-content {
	background: white;
	padding: 2rem;
	border-radius: 10px;
	min-width: 300px;
  }
  input {
	width: 100%;
	padding: 0.5rem;
	margin: 1rem 0;
  }
  button {
	padding: 0.5rem 1rem;
  }
  </style>
  