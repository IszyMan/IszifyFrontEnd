<template>
  <div>
    <h2 class="text-lg font-bold">2D Barcode Form for QRcode</h2>
    <div class="mt-5">
      <h2 class="font-bold">
        Enter the Global Trade Item Number (GTIN) for your product:
      </h2>

      <div class="mt-5">
        <p class="mt-4">Global Trade Item Number (01):</p>
        <input
          class="v-input mt-2"
          v-model="trade_number"
          type="text"
          id="trade-number"
          @input="handleInput"
          required
          placeholder="eg. 8977456387665"
        />
      </div>
    </div>

    <div class="mt-5">
      <h2 class="font-bold">
        Enter the destination to direct users when the code is scanned via a
        web-enabled device:
      </h2>

      <div class="">
        <p class="mt-4">Destination URL:</p>
        <input
          class="v-input mt-2"
          v-model="url"
          type="url"
          id="website-url"
          @input="handleInput"
          placeholder="eg. www.product-wesite.com"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
const emit = defineEmits(["handle-submit"]);

const trade_number = ref("");
const url = ref("");

// Emit the event whenever any of the inputs change
const handleInput = () => {
  // Combine trade number and website URL into a format suitable for 2D barcodes
  const barcodeData = `Trade Number: ${trade_number.value}, Website URL: ${url.value}`;
  emit("handle-submit", barcodeData);
};

// Optionally, use watch to trigger the emit whenever any value changes
watch([trade_number, url], ([newTradeNumber, newWebsiteUrl]) => {
  const barcodeData = `Trade Number: ${newTradeNumber}, Website URL: ${newWebsiteUrl}`;
  emit("handle-submit", barcodeData);
});
</script>
