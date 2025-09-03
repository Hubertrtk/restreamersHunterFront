<template>
  <div>
    <Modal v-if="configStore.showApiUrlModal" @save="handleSave" />
    <UserInfo v-if="popupStore.userPopup" @close="handleCloseUserPopup" />
    <ActionModal
      v-if="popupStore.showActionPopup"
      @close="handleCloseActionPopup"
    />
    <Header />
    <!-- <template v-else> -->
    <!-- <AllGroups /> -->
    <router-view />
    <!-- </template> -->
  </div>
</template>

<script setup>
import { useConfigStore } from "./stores/configStore";
import { usePopupStore } from "./stores/popupStore";
import { useUsersStore } from "./stores/usersStore";
import Modal from "./components/Modal.vue";
import Header from "./components/Header.vue";
import UserInfo from "./components/UserInfo.vue";
import ActionModal from "./components/ActionModal.vue";

const configStore = useConfigStore();
const popupStore = usePopupStore();
const usersStore = useUsersStore();

function handleSave(url) {
  configStore.setApiUrl(url);
}

function handleCloseUserPopup() {
  popupStore.setUserPopup(false);
}

function handleCloseActionPopup() {
  popupStore.setShowActionPopup(false);
}
</script>
<style>
body {
  margin: 0;
}
</style>
