<template>
  <section class="min-h-full px-5 md:px-10 pt-20 md:pt-24 bg-accent-tint">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-5">
        <HeaderComponent :title="'My BioLinks'" />
      </div>
      <div class="flex gap-3 items-center">
        <router-link :to="{ name: 'NewBioLink' }">
          <button class="btn-green-sm py-2 px-2 flex items-center">
            <img src="/icons/add-white.svg" alt="" />
            <span> Create New Bio</span>
          </button></router-link
        >
      </div>
    </div>

    <section class="h-full">
      <div
        v-if="loading"
        class="flex min-h-[500px] justify-center items-center"
      >
        loading
      </div>

      <div v-else>
        <!-- <h2 class="fony-bold text-2xl">There is no active QR Codes</h2> -->
        <div
          class="flex flex-col md:flex-row justify-between my-10 p-5 md:p-10 bg-white rounded-md"
        >
          <div class="flex gap-5">
            <div class="h-[100px] w-[100px]">
              <img src="/icons/mockup.svg" alt="" />
            </div>
            <div class="space-y-1">
              <h1 class="text-xl font-extrabold text-black">bit.ly/m/Laemmy</h1>

              <div class="flex gap-10 pt-3">
                <div class="flex gap-2 items-center text-black">
                  <img
                    src="/icons/calender.svg"
                    alt=""
                    class="h-[16px] w-[16px]"
                  />
                  Sep 9, 2024
                </div>
              </div>

              <div class="flex gap-4 md:gap-10 pt-3">
                <div class="flex gap-2 items-center">
                  <img
                    src="/icons/chart.svg"
                    alt=""
                    class="h-[16px] w-[16px]"
                  />
                  <p class="p-1 text-xs rounded text-accent font-medium">
                    <span class="font-bold">0 </span>
                    <span class="">Clicks</span>
                  </p>
                </div>
                <div class="flex gap-2 items-center">
                  <img
                    src="/icons/eye-open-black.svg"
                    alt=""
                    class="h-[16px] w-[16px]"
                  />
                  <p
                    class="p-1 bg-accent-tint text-xs rounded text-accent font-medium"
                  >
                    <span class="font-bold">0 </span>
                    <span class="">Views</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-5 self-end md:self-start mt-5 md:mt-0">
            <div
              class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades"
            >
              <img src="/icons/edit-blue.svg" class="" alt="" />
            </div>

            <div
              class="p-2 hover:bg-accent-tint text-xs md:text-sm cursor-pointer rounded border border-accent-shades font-semibold flex gap-2 items-center"
            >
              <img src="/icons/chart.svg" class="" alt="" />Activity
            </div>
            <div
              class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades"
            >
              <img src="/icons/dots.svg" class="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import Popper from "vue3-popper";

const loading = ref(false);
const filteredStatus = ref("Active");
const statuss = ref(["Active", "Hidden"]);
</script>

<style scoped></style>
