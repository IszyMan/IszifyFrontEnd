<template>
  <div>
    <!-- <div
      class="animate-spin border-4 border-dotted border-primary-shades border-r-slate-400 to-90% h-5 w-5 mr-3 rounded-full"
    ></div> -->
    <div class="animate-pulse">
      <img src="/images/load.png" class="h-[50px] w-[50px]" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
