<script setup>
import {ref, computed, defineEmits} from 'vue';

const props = defineProps({
  totalDistance: Number,
  totalTime: Number,
  journeyDetails: Array, // Receive the journey details array as a prop
});


// Define the emit function
const emit = defineEmits(['add-destination']);

// Reactive state to keep track of the currently selected POI index
const showPOIIndex = ref(null);

// Function to toggle the display of POIs for a particular location pair
const togglePOI = (index) => {
  showPOIIndex.value = showPOIIndex.value === index ? null : index;
};

// Calculate the estimated fuel needed for the journey
const fuelNeeded = computed(() => {
  const fuelEfficiency = 15; // Example: 15 km/l fuel efficiency
  return (props.totalDistance / fuelEfficiency).toFixed(2);
});

// Function to add a POI as a new destination
const addPOIAsDestination = (poi) => {

  // Check if the required data is present
  if (!poi.name || !poi.latitude || !poi.longitude) {
    console.error("Incomplete POI data:", poi);
    alert("Failed to add destination: Incomplete data.");
    return;
  }

  // Emit an event to the parent component to add the POI as a destination
  emit('add-destination', {
    name: poi.name,
    latitude: poi.latitude,
    longitude: poi.longitude,
    address: poi.address,
  });
  alert(`${poi.name} has been added as a new destination!`);
};
</script>
<template>
  <div class="p-4 bg-white rounded text-center w-full  lg:w-1/2  mx-auto mb-96 justify-center">
    <h2 class="text-xl font-bold mb-4">Destination Details & POI</h2>
    <ul>
      <li v-for="(detail, index) in journeyDetails" :key="index">
        <div @click="togglePOI(index)" class="cursor-pointer bg-gray-100 mb-2 py-3 rounded">
          <strong>{{ detail.from }}</strong> to <strong>{{ detail.to }}</strong>: <br>
          {{ detail.distance }} km, {{ detail.time }} hours
          <span v-if="showPOIIndex === index">▼</span>
          <span v-else>►</span>
        </div>
        <ul v-if="showPOIIndex === index && detail.pointsOfInterest.length > 0">
          <li v-for="(poi, poiIndex) in detail.pointsOfInterest" :key="poiIndex" class="poi-item">
            <div
                class="lg:w-3/5 md:w-1/2 lg:h-full md:h-full h-80 sm:h-2/4 w-full mx-auto object-cover object-center rounded-lg md:mt-0 mt-12 items-center">
              <div class="md:flex md:items-center">
                <div
                    class="relative overflow-hidden md:shrink-0 md:rounded-md rounded-t-md shadow dark:shadow-gray-700 md:m-3 mx-3 mt-3">
                  <img v-if="poi.photo" :src="poi.photo"
                       class="h-40 w-full object-cover md:w-48 md:h-40 scale-125 group-hover:scale-100 duration-500"
                       alt="">
                </div>
                <div class="p-4 w-full">
                  <p class="flex text-slate-400 font-medium mb-2">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                         stroke-linecap="round" stroke-linejoin="round" class="text-red-500 size-4 me-1"
                         height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {{ poi.address }}
                  </p>
                  <p class="text-lg font-medium text-start duration-500 ease-in-out"
                  >{{ poi.name }}</p>
                  <div
                      class="mt-4 pt-4 flex justify-between items-center border-t border-slate-100 dark:border-gray-800">
                    <p class="text-lg font-medium text-start duration-500 ease-in-out"
                    >Types: {{ poi.types }}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p v-if="showPOIIndex === index && detail.pointsOfInterest.length === 0">No POIs found for this pair.</p>
      </li>
    </ul>
  </div>
</template>

