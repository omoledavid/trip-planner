<script setup>
import { ref, defineEmits } from 'vue';
import LocationSearch from './LocationSearch.vue';

// Define the emit function to emit events to the parent component
const emit = defineEmits(['add']);

const location = ref('');

const submit = () => {
  if (location.value) {
    const newDestination = {
      name: location.value,
      latitude: 0,
      longitude: 0,
      order: Date.now(),
    };
    emit('add', newDestination);
    location.value = '';
  }
};
</script>
<template>
  <form @submit.prevent="submit">
    <LocationSearch v-model="location" />
    <button type="submit" class="bg-blue-500 mb-2 text-white px-4 py-2 rounded mt-2">Add Destination</button>
  </form>
</template>
