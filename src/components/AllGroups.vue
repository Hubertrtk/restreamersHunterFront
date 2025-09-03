<template>
  <div class="group-wrapper">
    <h2 class="group-title">👥 Grupa: {{ groupName }}</h2>
    <div class="monitor-group-container">
      <div
        class="monitor-group"
        v-for="(items, type) in monitorTypes"
        :key="type"
      >
        <div class="monitor-header">
          <h3>{{ type }}</h3>
          <label class="license-filter">
            <input type="checkbox" v-model="licenseOnlyFilters[type]" />
            Tylko z licencją
          </label>
        </div>
        <ul class="monitor-list">
          <li
            class="list-element"
            v-for="item in filteredItems(type, items)"
            :key="item.email"
          >
            <div class="list-item">
              <input
                type="checkbox"
                :value="item"
                :checked="isChecked(item)"
                @change="toggleChecked(item)"
              />
              <span
                class="user-email"
                :class="{ licensed: item.isLicense }"
                @click="showUser(item)"
              >
                {{ item.email }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useGroupStore } from "../stores/groupStore";
import { usePopupStore } from "../stores/popupStore";
import { useRoute } from "vue-router";

const groupStore = useGroupStore();
const popupStore = usePopupStore();
const monitorTypes = ref({});
const checkedItems = ref(new Set());
const licenseOnlyFilters = ref({}); // <- tutaj trzymamy stan checkboxów
const route = useRoute();
const groupName = ref(route.params.groupName);

watch(
  () => groupStore.didChange,
  () => {
    saveUrl();
  },
  { deep: true }
);

async function saveUrl() {
  const data = await groupStore.getGroup(groupName.value.toUpperCase());
  if (data && data.length > 0) {
    monitorTypes.value = data;
  } else {
    await groupStore.updateGroup(groupName.value.toUpperCase());
    const newData = await groupStore.getGroup(groupName.value.toUpperCase());
    monitorTypes.value = newData;
  }

  // ustaw domyślne wartości dla filtrów
  for (const type in monitorTypes.value) {
    if (!(type in licenseOnlyFilters.value)) {
      licenseOnlyFilters.value[type] = false;
    }
  }
}

// filtracja itemów dla danego typu
function filteredItems(type, items) {
  if (licenseOnlyFilters.value[type]) {
    return items.filter((item) => item.isLicense);
  }
  return items;
}

// sprawdza czy item jest zaznaczony
function isChecked(item) {
  return checkedItems.value.has(item);
}

// przełącza stan zaznaczenia
function toggleChecked(item) {
  console.log("toggleChecked");
  console.log(item);
  if (checkedItems.value.has(item)) {
    checkedItems.value.delete(item);
  } else {
    checkedItems.value.add(item);
  }
  popupStore.setSelectedEmails(
    Array.from(checkedItems.value).map((i) => i.email)
  );
}

const showUser = (user) => {
  console.log("user");
  console.log(user);
  popupStore.setUserPopup(user.email);
};

onMounted(saveUrl);

watch(
  () => route.params.groupName,
  async (newVal) => {
    groupName.value = newVal;
    checkedItems.value.clear(); // reset zaznaczeń przy zmianie grupy
    await saveUrl();
  }
);
</script>
<style scoped>
/* ---- OGÓLNY WRAPPER ---- */
.group-wrapper {
  font-family: "Inter", system-ui, sans-serif;
  background: linear-gradient(135deg, #f0f4ff, #ffffff);
  color: #1e293b;
  padding: 2rem;
  min-height: 100vh;
  transition: background 0.3s ease;
}

/* ---- NAGŁÓWEK GRUPY ---- */
.group-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #0f172a;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

/* ---- SIATKA Z GRUPAMI ---- */
.monitor-group-container {
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.8rem; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}

/* ---- POJEDYNCZA KARTA GRUPY ---- */
.monitor-group {
  background: white;
  border-radius: 1rem;
  padding: 1.2rem;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
/* .monitor-group:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
} */

/* ---- NAGŁÓWEK TYPU + FILTR ---- */
.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.5rem;
}
.monitor-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
}
.license-filter {
  font-size: 0.9rem;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  user-select: none;
}
.license-filter input {
  accent-color: #3b82f6;
  width: 18px;
  height: 18px;
}

/* ---- LISTA UŻYTKOWNIKÓW ---- */
.monitor-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.list-element {
  background: #f1f5f9;
  padding: 0.6rem 0.9rem;
  border-radius: 0.7rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
}
.list-element:hover {
  background: #e0f2fe;
  transform: translateX(2px);
}
.list-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
}
.list-item input {
  accent-color: #3b82f6;
  transform: scale(1.2);
}
.user-email {
  flex: 1;
  font-size: 0.95rem;
  color: #1e293b;
  transition: color 0.2s ease;
}
.user-email.licensed {
  color: #16a34a;
  font-weight: 500;
}

/* ---- RESPONSYWNOŚĆ ---- */
@media (max-width: 640px) {
  .group-wrapper {
    padding: 1.5rem;
  }
  .group-title {
    font-size: 1.7rem;
  }
  .monitor-group {
    padding: 1rem;
  }
}

---- EFEKTY DODATKOWE ---- .monitor-group-container {
  animation: fadeIn 0.5s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
