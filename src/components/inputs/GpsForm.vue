<template>
  <div>
    <h2 class="text-lg font-bold">GPS Form for QRcode</h2>
    <div class="mt-5">
      <p class="text-xs font-bold">Longitude</p>
      <input
        v-model="longitude"
        type="number"
        step="0.000001"
        id="latitude"
        @input="handleInput"
        required
        class="v-input"
      />
    </div>
    <div class="mt-5">
      <p class="text-xs font-bold">Latitude</p>
      <input
        v-model="latitude"
        type="number"
        step="0.000001"
        id="longitude"
        @input="handleInput"
        required
        class="v-input"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
const emit = defineEmits(["handle-submit"]);

const latitude = ref("");
const longitude = ref("");

// Emit the event whenever either input changes
const handleInput = () => {
  // Format the GPS data as a URL
  const gpsData = `geo:${latitude.value},${longitude.value}`;
  emit("handle-submit", gpsData);
};

// Optionally, use watch to trigger the emit whenever any value changes
watch([latitude, longitude], ([newLatitude, newLongitude]) => {
  const gpsData = `geo:${newLatitude},${newLongitude}`;
  emit("handle-submit", gpsData);
});
</script>
