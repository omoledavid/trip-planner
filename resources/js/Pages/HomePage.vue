<script setup>
import {ref, onMounted, watch, computed} from 'vue';
import DestinationForm from '@/Components/DestinationForm.vue';
import DestinationList from '@/Components/DestinationList.vue';
import MapView from '@/Components/MapView.vue';
import JourneySummary from '@/Components/JourneySummary.vue';
import JourneyStat from "@/Components/JourneyStat.vue";

const destinations = ref([]);
const totalDistance = ref(0);
const totalTime = ref(0);
const summaryKey = ref(0);

// Load saved destinations from localStorage when the page is loaded
onMounted(() => {
    const savedDestinations = JSON.parse(localStorage.getItem('destinations') || '[]');
    destinations.value = savedDestinations;
    calculateJourneyData();
});

// Save destinations to localStorage whenever the destinations list changes
watch(destinations, (newDestinations) => {
    localStorage.setItem('destinations', JSON.stringify(newDestinations));
    calculateJourneyData();
}, {deep: true});

const addDestination = (destination) => {
    destinations.value.push(destination); // Add new destination
    calculateJourneyData();
};

const updateDestinations = (newList) => {
    destinations.value = newList; // Update the list after reordering
    calculateJourneyData();
};

const journeyDetails = ref([]); // Array to store the distance and time between each pair of locations

const calculateJourneyData = async () => {

    if (destinations.value.length > 1) {
        const service = new google.maps.DistanceMatrixService();
        const placesService = new google.maps.places.PlacesService(document.createElement('div'));

        journeyDetails.value = []; // Reset the journey details array
        let totalDistanceValue = 0;
        let totalTimeValue = 0;

        // Loop through each consecutive pair of destinations
        for (let i = 0; i < destinations.value.length - 1; i++) {
            const origin = new google.maps.LatLng(destinations.value[i].name.latitude, destinations.value[i].name.longitude);
            const destination = new google.maps.LatLng(destinations.value[i + 1].name.latitude, destinations.value[i + 1].name.longitude);

            await new Promise((resolve, reject) => {
                service.getDistanceMatrix(
                    {
                        origins: [origin], // Current location
                        destinations: [destination], // Next location
                        travelMode: google.maps.TravelMode.DRIVING,
                    },
                    async (response, status) => {

                        if (status === "OK" && response.rows && response.rows[0].elements[0].status === "OK") {
                            const element = response.rows[0].elements[0];
                            const distance = element.distance.value / 1000; // Convert meters to kilometers
                            const time = element.duration.value / 3600; // Convert seconds to hours

                            totalDistanceValue += distance;
                            totalTimeValue += time;

                            const fromLocation = destinations.value[i].name.name;
                            const toLocation = destinations.value[i + 1].name.name;

                            // Ensure uniqueness and prevent duplicates
                            if (!journeyDetails.value.some(detail => detail.from === fromLocation && detail.to === toLocation)) {
                                const detail = {
                                    from: fromLocation,
                                    to: toLocation,
                                    distance: distance.toFixed(2), // Keep two decimal places
                                    time: time.toFixed(2),
                                    pointsOfInterest: [], // Array to hold points of interest
                                };

                                journeyDetails.value = [...journeyDetails.value, detail]; // Use spread operator to ensure reactivity

                                await fetchPointsOfInterest(placesService, destination, detail);
                            }
                        } else {
                            console.warn("No route found for this destination pair.");
                            const fromLocation = destinations.value[i].name.name;
                            const toLocation = destinations.value[i + 1].name.name;

                            // Avoid duplicates in case of errors
                            if (!journeyDetails.value.some(detail => detail.from === fromLocation && detail.to === toLocation)) {
                                journeyDetails.value = [
                                    ...journeyDetails.value,
                                    {
                                        from: fromLocation,
                                        to: toLocation,
                                        distance: "0.00", // No distance available
                                        time: "0.00", // No time available
                                        pointsOfInterest: [],
                                    },
                                ];
                            }
                        }

                        // Resolve the promise after processing this pair
                        resolve();
                    }
                );
            });
        }

        // Update total distance and time after processing all pairs, including the last one
        totalDistance.value = totalDistanceValue;
        totalTime.value = totalTimeValue;
        summaryKey.value += 1;
    } else {
        totalDistance.value = 0;
        totalTime.value = 0;
        journeyDetails.value = []; // Reset if there are not enough destinations
    }
};

// Function to fetch points of interest near the destination
const fetchPointsOfInterest = (placesService, location, detail) => {
    return new Promise((resolve) => {
        const request = {
            location: location,
            radius: '10000', // 10 km radius
            type: ['lodging', 'hotel', 'bar',], // Search for lodging options
        };


        placesService.nearbySearch(request, (results, status) => {

            if (status === google.maps.places.PlacesServiceStatus.OK) {
                results.forEach((place) => {

                    // Retrieve the first photo reference, if available
                    const photoReference = place.photos && place.photos.length > 0 ? place.photos[0].getUrl({
                        maxWidth: 150,
                        maxHeight: 150
                    }) : null;

                    // Check if the POI is already in the list to prevent duplicates
                    if (!detail.pointsOfInterest.some(poi => poi.name === place.name && poi.vicinity === place.vicinity)) {
                        detail.pointsOfInterest.push({
                            name: place.name,
                            address: place.vicinity, // Add address
                            latitude: place.geometry.location.lat(), // Add latitude
                            longitude: place.geometry.location.lng(), // Add longitude
                            photo: photoReference, // Add photo URL if available
                            types: place.types.join(', ') || 'Not available', // Rating (if available)
                        });
                    }
                });
            } else {
                console.warn("No lodging found for this location. ");
            }
            resolve(); // Resolve the promise after fetching POIs
        });
    });
};


</script>
<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
            <p class="bg-red-300 mb-3 py-3 text-white inline-block w-full mx-auto text-center rounded">Note: The map's TravelMode is set to "driving," so routes between points that aren't drivable won't return data.</p>
            <div class="flex flex-wrap w-full">
                <div class="lg:w-2/5 md:w-1/2 w-full sm:w-full md:pr-10 md:py-6">
                    <DestinationForm @add="addDestination"/>
                    <DestinationList :destinations="destinations" @update:destinations="updateDestinations"/>
                    <JourneyStat :key="summaryKey" :destinations="destinations" :totalDistance="totalDistance"
                                 :totalTime="totalTime" :journeyDetails="journeyDetails"/>
                </div>
                <MapView :key="summaryKey" :destinations="destinations"/>
            </div>
        </div>
    </section>
    <div>
        <JourneySummary :key="summaryKey" :destinations="destinations" :totalDistance="totalDistance"
                        :totalTime="totalTime" :journeyDetails="journeyDetails"/>
    </div>
</template>
