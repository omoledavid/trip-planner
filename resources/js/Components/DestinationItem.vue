<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  destination: Object
});
</script>
<template>
  <div class="p-2 border rounded bg-gray-50 mb-2">
    <h3 class="text-lg font-semibold">{{ destination.name.name }}</h3>
    <p>Latitude: {{ destination.name.latitude }}</p>
    <p>Longitude: {{ destination.name.longitude }}</p>
    <button @click="$emit('remove')" @touchstart="$emit('remove')" class="text-red-500 mt-2">Remove</button>

  </div>
</template>
<style scoped>
button {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
}
</style>


