<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <h3>Informacje o użytkowniku {{ popupStore.userPopup }}</h3>

      <div class="user-field"><strong>Imię:</strong> {{ user.firstname }}</div>
      <div class="user-field">
        <strong>Nazwisko:</strong> {{ user.lastname }}
      </div>
      <div class="user-field"><strong>Kraj:</strong> {{ user.country }}</div>

      <details class="user-section">
        <summary>Ban Notes ({{ user.banNotes.length }})</summary>
        <div
          v-for="(note, index) in user.banNotes"
          :key="index"
          class="section-item"
        >
          <p><strong>Akcja:</strong> {{ note.action }}</p>
          <p><strong>By:</strong> {{ note.by }}</p>
          <p><strong>Custom Message:</strong> {{ note.customMessage }}</p>
        </div>
      </details>

      <details class="user-section">
        <summary>Licenses ({{ user.licenses.length }})</summary>
        <div
          v-for="(license, index) in user.licenses"
          :key="index"
          class="section-item"
        >
          <p>
            <strong>Produkt:</strong> {{ license.product.title }} ({{
              license.product.variantId
            }})
          </p>
          <p>
            <strong>Valid From:</strong> {{ formatDate(license.validFrom) }}
          </p>
          <p><strong>Valid To:</strong> {{ formatDate(license.validTo) }}</p>
        </div>
      </details>

      <details class="user-section">
        <summary>Transactions ({{ user.transactions.length }})</summary>
        <div
          v-for="(tx, index) in user.transactions"
          :key="index"
          class="section-item"
        >
          <p><strong>Produkt:</strong> {{ tx.product.title }}</p>
          <p><strong>Kwota:</strong> {{ tx.amount }} {{ tx.currency }}</p>
          <p><strong>Status:</strong> {{ tx.status }}</p>
          <p><strong>Data:</strong> {{ formatDate(tx.timeCreated) }}</p>
        </div>
      </details>

      <details class="user-section">
        <summary>Event 262</summary>
        <div v-if="user.events['262']" class="section-item">
          <p>
            <strong>Transaction ID:</strong>
            {{ user.events["262"].transaction.id }}
          </p>
          <p>
            <strong>Product:</strong>
            {{ user.events["262"].transaction.product.title }}
          </p>
          <p>
            <strong>Amount:</strong>
            {{ user.events["262"].transaction.amount }}
            {{ user.events["262"].transaction.currency }}
          </p>
          <p>
            <strong>Description:</strong>
            {{ user.events["262"].transaction.data.eventDate }}
          </p>
        </div>
      </details>

      <button @click="close" class="close-btn">Zamknij</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, onMounted, computed } from "vue";
import { useUsersStore } from "../stores/usersStore";
import { usePopupStore } from "../stores/popupStore";

const usersStore = useUsersStore();
const popupStore = usePopupStore();
const emits = defineEmits(["close"]);

const user = computed(
  () =>
    usersStore.users[popupStore.userPopup] || {
      firstname: "",
      lastname: "",
      country: "",
      banNotes: [],
      licenses: [],
      transactions: [],
      events: {},
    }
);

function close() {
  emits("close");
}

function formatDate(ts) {
  if (!ts) return "-";
  const d = new Date(ts);
  return d.toLocaleString();
}

onMounted(async () => {
  await usersStore.updateUser(popupStore.userPopup);
});
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

h3 {
  margin-top: 0;
  text-align: center;
}

.user-field {
  margin-bottom: 10px;
}

.user-section {
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
}

.user-section summary {
  cursor: pointer;
  font-weight: bold;
}

.section-item {
  padding: 5px 0;
  border-top: 1px dashed #ccc;
}

.section-item:first-child {
  border-top: none;
}

.close-btn {
  display: block;
  margin: 15px auto 0;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: #fff;
  cursor: pointer;
}

.close-btn:hover {
  background: #0056b3;
}
</style>
