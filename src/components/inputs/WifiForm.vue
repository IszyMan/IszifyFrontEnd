<template>
  <div>
    <h2 class="text-lg font-bold">Wi-Fi Form for QRcode</h2>
    <div class="mt-5">
      <label for="ssid" class="font-bold text-sm">SSID:</label>
      <input
        id="ssid"
        v-model="ssid"
        type="text"
        @input="handleInput"
        required
        class="v-input"
      />
    </div>
    <div class="mt-5">
      <label class="font-bold text-sm" for="password">Password:</label>
      <input
        v-model="password"
        class="v-input"
        type="password"
        id="password"
        @input="handleInput"
      />
    </div>
    <div class="mt-5">
      <label class="font-bold text-sm" for="encryption">Encryption:</label>
      <select
        id="encryption"
        @change="handleInput"
        v-model="encryption"
        class="v-input"
      >
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="nopass">None</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
const emit = defineEmits(["handle-submit"]);

const ssid = ref("");
const password = ref("");
const encryption = ref("WPA"); // Default to WPA

// Emit the event whenever any of the inputs change
const handleInput = () => {
  const wifiData = `WIFI:S:${ssid.value};T:${encryption.value};P:${password.value};;`;
  emit("handle-submit", wifiData);
};

// Optionally, use watch to trigger the emit whenever any value changes
watch([ssid, password, encryption], ([newSsid, newPassword, newEncryption]) => {
  const wifiData = `WIFI:S:${newSsid};T:${newEncryption};P:${newPassword};;`;
  emit("handle-submit", wifiData);
});
</script>
