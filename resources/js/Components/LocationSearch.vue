<script setup>
import {ref, onMounted, defineEmits} from 'vue';

// Define the emit function to emit events to the parent component
const emit = defineEmits(['update:modelValue']);

const query = ref('');

onMounted(() => {
  const input = document.getElementById('location-input');

  // Initialize the Google Places Autocomplete service
  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['geocode'], // Restrict the results to geographical results
  });

  // Event listener for place selection
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      // Update the query with the selected place's formatted address
      query.value = place.formatted_address;

      // Emit the selected place data to the parent component
      emit('update:modelValue', {
        name: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
    }
  });
});
</script>
<template>
  <div class="relative">
    <input
        id="location-input"
        type="text"
        v-model="query"
        class="border border-gray-300 rounded p-2 w-full"
        placeholder="Enter location..."
    />
  </div>
</template>
