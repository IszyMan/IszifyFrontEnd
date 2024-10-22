<template>
  <div>
    <div
      class="animate-spin border-4 border-dotted border-r-info-tint to-90% h-5 w-5 mr-3 rounded-full"
      :class="`border-${color}`"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    color: {
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
