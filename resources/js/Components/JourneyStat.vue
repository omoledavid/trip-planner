<script setup>
import {computed} from 'vue';

const props = defineProps({
  totalDistance: Number,
  totalTime: Number,
  journeyDetails: Array, // Receive the journey details array as a prop
});


const fuelNeeded = computed(() => {
  return (props.totalDistance / 15).toFixed(2); // Example: 15 km/l fuel efficiency
});
</script>
<template>
  <div class="p-4 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Journey Summary</h2>
    <p>Total Distance: {{ totalDistance.toFixed(2) }} km</p>
    <p>Total Time: {{ totalTime.toFixed(2) }} hours</p>
    <p v-if="fuelNeeded">Estimated Fuel: {{ fuelNeeded }} liters</p>
  </div>
</template>

