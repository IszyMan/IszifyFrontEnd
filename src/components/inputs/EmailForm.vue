<template>
  <div>
    <h2 class="text-lg font-bold">Email Form for QRcode</h2>
    <div class="mt-5">
      <p class="text-xs font-bold">Email Address</p>
      <input
        v-model="email"
        type="email"
        id="email"
        @input="handleInput"
        required
        class="v-input"
      />
    </div>
    <div class="mt-5">
      <p class="text-xs font-bold">Subject</p>
      <input
        v-model="text"
        type="text"
        id="subject"
        @input="handleInput"
        class="v-input"
      />
    </div>
    <div class="mt-5">
      <p class="text-xs font-bold">Add Message</p>
      <textarea
        v-model="message"
        id="message"
        @input="handleInput"
        cols="30"
        rows="5"
        class="v-input placeholder:text-xs"
        placeholder="Enter text"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
const emit = defineEmits(["handle-submit"]);

const email = ref("");
const subject = ref("");
const message = ref("");

// Emit the event whenever any of the inputs change
const handleInput = () => {
  // Create the mailto link format
  let mailtoLink = `mailto:${email.value}`;

  // Add subject and message if provided
  if (subject.value) {
    mailtoLink += `?subject=${encodeURIComponent(subject.value)}`;
  }
  if (message.value) {
    mailtoLink += subject.value
      ? `&body=${encodeURIComponent(message.value)}`
      : `?body=${encodeURIComponent(message.value)}`;
  }

  emit("handle-submit", mailtoLink);
};

// Optionally, use watch to trigger the emit whenever any value changes
watch([email, subject, message], ([newEmail, newSubject, newMessage]) => {
  let mailtoLink = `mailto:${newEmail}`;

  if (newSubject) {
    mailtoLink += `?subject=${encodeURIComponent(newSubject)}`;
  }
  if (newMessage) {
    mailtoLink += newSubject
      ? `&body=${encodeURIComponent(newMessage)}`
      : `?body=${encodeURIComponent(newMessage)}`;
  }

  emit("handle-submit", mailtoLink);
});
</script>

<style scoped></style>
