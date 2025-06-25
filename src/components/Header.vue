<template>
	<header class="header">
		<nav>
			<div class="groups">
				<h1>GROUPS:</h1>
				<router-link 
					v-for="group in groups" 
					:key="group" 
					:to="`/allGroups/${group.toLowerCase()}`" 
					class="group-link"
				>
					{{ group }}
				</router-link>
			</div>
			<div class="groups">
				<h1>MONITORS:</h1>
				<router-link 
					v-for="monitor in monitors" 
					:key="monitor" 
					:to="`/monitor/${monitor.toLowerCase()}`" 
					class="group-link"
				>
					{{ monitor }}
				</router-link>
			</div>
			<button @click="showActionModal">ACTION</button>
		</nav>
	</header>
</template>

<script setup>
import { usePopupStore } from '../stores/popupStore'

const popupStore = usePopupStore()

const showActionModal = () => {
	popupStore.setShowActionPopup(true)
}

const groups = ['FOUND', 'BLOCKED', 'IGNORED']
const monitors = ['HASH', 'IP']
</script>

<style scoped>
.header {
	background-color: #2c3e50;
	color: #fff;
	padding: 1rem;
	text-align: center;
}
nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.groups {
	display: flex;
	align-items: center;
	gap: 1rem;
}
.group-link {
	color: #fff;
	text-decoration: none;
	font-weight: bold;
	transition: color 0.2s;
}
.group-link:hover {
	color: #3498db;
}
</style>
