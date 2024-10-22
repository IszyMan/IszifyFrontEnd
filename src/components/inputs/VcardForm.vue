<template>
  <div>
    <h2 class="text-lg font-bold">VCard Form for QRcode</h2>
    <form @submit.prevent class="mt-5 grid">
      <div>
        <label for="firstName" class="mt-4 text-xs">First Name:</label>
        <input
          v-model="first_name"
          class="v-input"
          type="text"
          id="first_name"
          @input="handleInput"
          required
        />
      </div>

      <div>
        <label for="lastName" class="mt-4 text-xs">Last Name:</label>
        <input
          v-model="last_name"
          class="v-input"
          type="text"
          id="last_name"
          @input="handleInput"
          required
        />
      </div>

      <div>
        <label for="phone" class="mt-4 text-xs">Phone Number:</label>
        <input
          v-model="phone_number"
          class="v-input"
          type="tel"
          id="phone_number"
          @input="handleInput"
          required
        />
      </div>

      <div>
        <label for="email" class="mt-4 text-xs">Email:</label>
        <input
          v-model="email"
          class="v-input"
          type="email"
          id="email"
          @input="handleInput"
          required
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
const emit = defineEmits(["handle-submit"]);
const first_name = ref("");
const last_name = ref("");
const phone_number = ref("");
const email = ref("");

// Emit the event whenever the input changes
const handleInput = () => {
  const vcardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${first_name.value} ${last_name.value}\nTEL:${phone_number.value}\nEMAIL:${email.value}\nEND:VCARD`;
  emit("handle-submit", vcardData);
};

// Optionally, you can use watch to trigger the emit whenever the value changes
watch(
  [first_name, last_name, phone_number, email],
  ([newFirstName, newLastName, newPhone, newEmail]) => {
    const vcardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${newFirstName} ${newLastName}\nTEL:${newPhone}\nEMAIL:${newEmail}\nEND:VCARD`;
    emit("handle-submit", vcardData);
  }
);
</script>

<style scoped></style>
