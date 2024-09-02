<script setup>
import { defineProps, defineEmits } from 'vue';
import DestinationItem from './DestinationItem.vue';
import draggable from "vuedraggable";

// Props received from the parent component
const props = defineProps({
  destinations: Array
});

// Emit function to emit events back to the parent component
const emit = defineEmits(['update:destinations']);

// Emit the updated list after reordering
const onEnd = () => {
  emit('update:destinations', props.destinations);
};

// Remove a destination from the list
const removeDestination = (index) => {
  props.destinations.splice(index, 1);
  emit('update:destinations', props.destinations);
};
</script>
<template>
  <div v-if="destinations.length > 0">
    <draggable
        :list="destinations"
        @end="onEnd"
        item-key="id"
        :animation="200"
    >
      <template #item="{ element, index }">
        <div :key="element.id" class="mb-2">
          <DestinationItem :destination="element" @remove="removeDestination(index)" />
        </div>
      </template>
    </draggable>
  </div>
  <p v-else>No destinations added yet.</p>
</template>

