<template>
  <form @submit.prevent @key.enter="submit">
    <h2 class="text-lg font-bold">App Form for QRcode</h2>
    <div class="mt-5">
      <p class="text-xs font-bold">iOS URL</p>
      <input
        v-model="ios_url"
        type="text"
        class="v-input"
        id="app-ios"
        @input="handleInput"
        required
      />
    </div>
    <div class="mt-5">
      <p class="text-xs font-bold">Android URL</p>
      <input
        v-model="android_url"
        type="text"
        class="v-input"
        id="app-android"
        @input="handleInput"
        required
      />
    </div>
    <div class="mt-5">
      <p class="text-xs font-bold">Other Devices Url</p>
      <input
        v-model="other_device_url"
        type="text"
        class="v-input"
        id="app-others"
        @input="handleInput"
        required
      />
    </div>
  </form>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
const emit = defineEmits(["handle-submit"]);

const ios_url = ref("");
const android_url = ref("");
const other_device_url = ref("");

// Emit the event whenever any of the inputs change
const handleInput = () => {
  // Check if URLs are valid and emit them
  if (ios_url.value || android_url.value || other_device_url.value) {
    const appUrls = {
      ios: ios_url.value,
      android: android_url.value,
      other: other_device_url.value,
    };
    emit("handle-submit", appUrls);
  }
};

// Optionally, use watch to trigger the emit whenever any value changes
watch(
  [ios_url, android_url, other_device_url],
  ([newIosUrl, newAndroidUrl, newOtherUrl]) => {
    if (newIosUrl || newAndroidUrl || other_device_url.value) {
      const appUrls = {
        ios: newIosUrl,
        android: newAndroidUrl,
        other: newOtherUrl,
      };
      emit("handle-submit", appUrls);
    }
  }
);
</script>
