<template>
  <div>
    <h2>Grupa: {{ groupName }}</h2>
    <div class="monitor-group-container">
      <div
        class="monitor-group"
        v-for="(items, type) in monitorTypes"
        :key="type"
      >
        <div class="show-license-only">
          <p>Pokaz tylko zawierajace licencje</p>
          <input type="checkbox" v-model="licenseOnlyFilters[type]" />
        </div>
        <h3>{{ type }}</h3>
        <ul>
          <li
            class="list-element"
            v-for="item in filteredItems(type, items)"
            :key="item.email"
          >
            <input
              type="checkbox"
              :value="item"
              :checked="isChecked(item)"
              @change="toggleChecked(item)"
            />
            <p @click="showUser(item)">{{ item.email }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- debug -->
    <pre>
Zaznaczone: {{
        Array.from(checkedItems)
          .map((x) => x.email)
          .join(", ")
      }}</pre
    >
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
.show-license-only {
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: row;
}
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
