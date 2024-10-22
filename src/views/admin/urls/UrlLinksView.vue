<template>
  <section class="min-h-full px-5 md:px-10 pt-20 md:t-24 bg-accent-tint">
    <div class="flex flex-col md:flex-row md:items-center justify-between">
      <div class="flex justify-between md:justify-start items-center gap-5">
        <HeaderComponent :title="'My Links'" />
        <router-link :to="{ name: 'NewUrlLink' }">
          <button
            class="btn-green-sm py-2 text-xs md:text-sm px-1 flex items-center"
          >
            <img src="/icons/add-white.svg" alt="" />
            <span> Create Link</span>
          </button></router-link
        >
      </div>
      <div class="flex gap-3 self-end md:items-center mt-5">
        <div>
          <button
            class="border px-5 rounded text-xs md:text-sm py-2 btnn-sm-outline border-accent text-accent"
          >
            Export
          </button>
        </div>

        <div>
          <popper>
            <div
              class="border text-xs md:text-sm rounded flex justify-between items-center bg-white w-[150px] px-3 py-1.5 md:py-2 font-bold"
            >
              <p>Status: {{ filteredStatus }}</p>
              <div class="h-[20px] w-[20px]">
                <img src="/icons/chevron-down.svg" alt="" />
              </div>
            </div>
            <template #content>
              <div class="shadow bg-white w-[150px] rounded-md">
                <div
                  v-for="(status, index) in statuss"
                  :key="index"
                  class="cursor-pointer hover:bg-accent-tint"
                >
                  <p class="py-2 px-3 font-medium">{{ status }}</p>
                </div>
              </div>
            </template>
          </popper>
        </div>
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
            <div class="h-[30px] w-[30px]">
              <img src="/icons/website.svg" alt="" />
            </div>
            <div class="space-y-1">
              <h1 class="text-xl font-extrabold text-black">
                Laemmy Portfolio | Home
              </h1>

              <p class="text-accent flex">
                https://laemmy-portfolio.netlify.app/
              </p>

              <p class="flex gap-2 items-center text-black">bit.ly/4eg1n7o</p>

              <div class="flex gap-10 pt-5">
                <div class="flex gap-2 items-center">
                  <img
                    src="/icons/chart.svg"
                    alt=""
                    class="h-[16px] w-[16px]"
                  />
                  <p
                    class="p-1 bg-accent-tint text-xs rounded text-accent font-medium"
                  >
                    Click data
                  </p>
                </div>
                <div
                  class="flex gap-2 text-xs sm:text-sm items-center text-black"
                >
                  <img
                    src="/icons/calender.svg"
                    alt=""
                    class="h-[16px] w-[16px]"
                  />
                  Sep 9, 2024
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-5 self-end md:self-start mt-5">
            <div
              class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades"
            >
              <img src="/icons/edit-blue.svg" alt="" />
            </div>
            <div
              class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades"
            >
              <img src="/icons/copy.svg" alt="" />
            </div>
            <div
              class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades font-semibold flex gap-2 items-center"
            >
              <img src="/icons/share.svg" alt="" />Share
            </div>
            <div
              class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades"
            >
              <img src="/icons/dots.svg" alt="" />
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
