<template>
  <div>
    <h2 class="text-lg font-bold">Sms Form for QRcode</h2>
    <div class="mt-5">
      <p class="text-xs font-bold">Phone Number</p>
      <input
        v-model="phone_number"
        type="tel"
        id="phone-number"
        @input="handleInput"
        required
        class="v-input"
      />
    </div>

    <div class="mt-5">
      <p class="text-xs font-bold">Add Message</p>
      <textarea
        v-model="message"
        cols="30"
        rows="5"
        class="v-input placeholder:text-xs"
        placeholder="Enter text"
        id="message"
        @input="handleInput"
        required
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
const emit = defineEmits(["handle-submit"]);
const phone_number = ref("");
const message = ref("");

// Emit the event whenever the input changes
const handleInput = () => {
  emit("handle-submit", `SMSTO:${phone_number.value}:${message.value}`);
};

// Optionally, you can use watch to trigger the emit whenever the value changes
watch([phone_number, message], ([newPhone, newMessage]) => {
  emit("handle-submit", `SMSTO:${newPhone}:${newMessage}`);
});
</script>
