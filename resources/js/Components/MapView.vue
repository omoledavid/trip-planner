<script setup>
import {onMounted, watch} from 'vue';

const props = defineProps({
  destinations: Array
});

onMounted(() => {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 0, lng: 0}, // Initial map center
  });

  const markers = [];
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({map: map});

  watch(
      () => props.destinations,
      (newDestinations) => {
        // Clear existing markers
        markers.forEach(marker => marker.setMap(null));
        markers.length = 0;

        if (newDestinations.length > 1) {
          const waypoints = newDestinations.slice(1, -1).map(dest => ({
            location: new google.maps.LatLng(dest.name.latitude, dest.name.longitude),
            stopover: true,
          }));

          const origin = new google.maps.LatLng(newDestinations[0].name.latitude, newDestinations[0].name.longitude);
          const destination = new google.maps.LatLng(newDestinations[newDestinations.length - 1].name.latitude, newDestinations[newDestinations.length - 1].name.longitude);

          directionsService.route(
              {
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  directionsRenderer.setDirections(response);

                  // Add markers for each destination
                  newDestinations.forEach(destination => {
                    const marker = new google.maps.Marker({
                      position: {lat: destination.name.latitude, lng: destination.name.longitude},
                      title: destination.name.name,
                      map: map,
                    });
                    markers.push(marker);
                  });
                } else {
                  console.error('Directions request failed due to ' + status);
                }
              }
          );
        } else if (newDestinations.length === 1) {
          const singleMarker = new google.maps.Marker({
            position: {lat: newDestinations[0].name.latitude, lng: newDestinations[0].name.longitude},
            title: newDestinations[0].name.name,
            map: map,
          });
          markers.push(singleMarker);
          map.setCenter(singleMarker.getPosition());
          map.setZoom(14);
        }
      },
      {immediate: true}
  );
});
</script>
<template>
  <div id="map" class="lg:w-3/5 md:w-1/2 lg:h-full md:h-full h-80 sm:h-2/4 w-full object-cover object-center rounded-lg md:mt-0 mt-12"></div>
</template>
