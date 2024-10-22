<template>
  <div>
    <h2 class="text-lg font-bold">Tel Form for QRcode</h2>
    <div class="mt-5">
      <p class="text-xs font-bold">Phone Number</p>
      <input
        v-model="phone_number"
        type="tel"
        id="phone"
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
const phone_number = ref("");

// Emit the event whenever the input changes
const handleInput = () => {
  emit("handle-submit", `TEL:${phone_number.value}`);
};

// Optionally, you can use watch to trigger the emit whenever the value changes
watch(phone_number, (newVal) => {
  emit("handle-submit", `TEL:${newVal}`);
});
</script>
