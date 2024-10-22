<template>
  <h2 class="text-lg font-bold">Url Form for QRcode</h2>
  <form @submit.prevent class="mt-5">
    <p class="text-xs font-bold">Enter Website URL</p>
    <input
      v-model="url"
      type="text"
      class="v-input"
      id="url"
      @input="handleInput"
      required
    />
  </form>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";
const emit = defineEmits(["handle-submit"]);
const url = ref("");

const handleSubmit = () => {
  emit("handle-submit", url.value);
};

// Optionally, you can use watch to trigger the emit whenever the value changes
watch(url, (newVal) => {
  emit("handle-submit", newVal);
});
</script>

<style scoped></style>
