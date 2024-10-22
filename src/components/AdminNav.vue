<template>
  <div class="w-[250px] bg-secondary-tint h-screen py-5">
    <div @click="closeNav" class="md:hidden pl-5">
      <img src="/icons/close-black.svg" alt="" class="cursor-pointer" />
    </div>
    <div class="px-5 flex flex-col justify-between h-full w-full">
      <ul class="pt-14 space-y-1 text-sm w-full">
        <li class="pt-10 mb-10 w-full">
          <div class="w-full bg-primary">
            <popper
              :hover="true"
              :placement="'right'"
              class="cursor-pointer w-full"
            >
              <div class="pl-2 py-2 flex text-white w-full">
                <div class="flex items-center py-2 space-x-3">
                  <img
                    :src="'/icons/create.svg'"
                    class="h-[20px] w-[20px]"
                    alt=""
                  />
                  <span class="text-sm font-bold">Create New</span>
                </div>
              </div>

              <template #content>
                <div class="w-[150px] md:w-[200px] my-2 bg-white shadow-md">
                  <router-link to="/admin/qrcode/create-new">
                    <div
                      class="text-black py-3 px-5 cursor-pointer hover:bg-primary-shades hover:text-white border-primary-tint"
                    >
                      QR Code
                    </div></router-link
                  >
                  <router-link to="/admin/qrcode/bio-new">
                    <div
                      class="text-black py-3 px-5 cursor-pointer hover:bg-primary-shades hover:text-white border-primary-tint"
                    >
                      Bio Link
                    </div></router-link
                  >
                  <router-link to="/admin/qrcode/shortner-new">
                    <div
                      class="text-black py-3 px-5 cursor-pointer hover:bg-primary-shades hover:text-white border-primary-tint"
                    >
                      URL Shortner
                    </div></router-link
                  >
                </div>
              </template>
            </popper>
          </div>
        </li>
        <!-- Overview -->

        <li
          @click="gotoPageRoute('admin/dashboard')"
          class="py-2 text-sm hover:text-primary cursor-pointer"
          :class="
            active.includes('admin/dashboard')
              ? 'border-l-4  text-primary bg-secondary-tint  border-primary-shades '
              : ''
          "
        >
          <div class="pl-2">
            <div class="flex items-center py-2 space-x-3">
              <img
                :src="
                  active.includes('admin/dashboard')
                    ? '/icons/dashboard-green.svg'
                    : '/icons/dashboard.svg'
                "
                class="h-[20px] w-[20px]"
                alt=""
              />
              <span class="text-sm font-bold">Dashboard</span>
            </div>
          </div>
        </li>

        <!-- Qrcodes -->
        <li @click="gotoPageRoute('admin/qrcode')">
          <div
            class="py-2 text-sm hover:text-primary cursor-pointer mt-3"
            :class="
              active.includes('admin/qrcode')
                ? 'border-l-4  text-primary bg-secondary-tint  border-primary-shades '
                : ''
            "
          >
            <div class="pl-2">
              <div class="flex items-center py-2 space-x-3">
                <img
                  :src="
                    active.includes('admin/qrcode')
                      ? '/icons/qrcode-green.svg'
                      : '/icons/qrcode.svg'
                  "
                  class="h-[20px] w-[20px]"
                  alt=""
                />
                <span class="text-sm font-bold">My QR Codes</span>
              </div>
            </div>
          </div>
          <!-- <ul class="pl-6" v-if="qrcode">
            <li
              @click="gotoPageRoute('admin/qrcode/dynamic-Qrcode')"
              class="pl-6 text-sm cursor-pointer"
              :class="
                active.includes('/qrcode/dynamic-Qrcode')
                  ? 'bg-info text-info-tint border-r-4 rounded-l-lg border-white'
                  : 'rounded-r-lg'
              "
            >
              <div>
                <div class="flex items-center py-2 space-x-3 rounded-md">
                  <span class="text-xs capitalize">Dynamic Qrcode</span>
                </div>
              </div>
            </li>
            <li
              @click="gotoPageRoute('admin/qrcode/static-Qrcode')"
              class="pl-6 text-sm cursor-pointer"
              :class="
                active.includes('/qrcode/static-Qrcode')
                  ? 'bg-info text-info-tint border-r-4 rounded-l-lg border-white'
                  : 'rounded-r-lg'
              "
            >
              <div>
                <div class="flex items-center py-2 space-x-3 rounded-md">
                  <span class="text-xs capitalize">Static Qrcode</span>
                </div>
              </div>
            </li>
          </ul> -->
        </li>

        <!-- Bio Links -->
        <li
          @click="gotoPageRoute('admin/bio')"
          class="py-2 text-sm hover:text-primary cursor-pointer mt-3 md:mt-5"
          :class="
            active.includes('admin/bio')
              ? 'border-l-4  text-primary bg-secondary-tint  border-primary-shades '
              : ''
          "
        >
          <div class="pl-2">
            <div class="flex items-center py-2 space-x-3">
              <img
                :src="
                  active.includes('admin/bio')
                    ? '/icons/bio-green.svg'
                    : '/icons/bio.svg'
                "
                class="h-[24px] w-[24px]"
                alt=""
              />
              <span class="text-sm font-bold">Bio Links</span>
            </div>
          </div>
        </li>

        <!-- Url Shortner -->
        <li
          @click="gotoPageRoute('admin/links')"
          class="py-2 text-sm hover:text-primary cursor-pointer mt-3 md:mt-5"
          :class="
            active.includes('admin/links')
              ? 'border-l-4  text-primary bg-secondary-tint  border-primary-shades '
              : ''
          "
        >
          <div class="pl-2">
            <div class="flex items-center py-2 space-x-3">
              <img
                :src="
                  active.includes('admin/links')
                    ? '/icons/link-green.svg'
                    : '/icons/link.svg'
                "
                class="h-[20px] w-[20px]"
                alt=""
              />
              <span class="text-sm font-bold">URL Shortner</span>
            </div>
          </div>
        </li>
      </ul>

      <!-- Configurations -->
      <ul>
        <li
          @click="gotoPageRoute('admin/settings')"
          class="py-2 text-sm hover:text-primary cursor-pointer mt-3 md:mt-5"
          :class="
            active.includes('admin/settings')
              ? 'border-l-4  text-primary bg-secondary-tint  border-primary-shades '
              : ''
          "
        >
          <div class="pl-2">
            <div class="flex items-center py-2 space-x-3">
              <img
                :src="
                  active.includes('admin/settings')
                    ? '/icons/settings-green.svg'
                    : '/icons/settings.svg'
                "
                class="h-[20px] w-[20px]"
                alt=""
              />
              <span class="text-sm font-bold">Settings</span>
            </div>
          </div>
        </li>

        <li
          class="rounded-lg py-2 mt-5 text-sm bg-error-tint hover:bg-error-shades hover:text-white text-error cursor-pointer"
        >
          <div class="pl-2">
            <div @click="handleLogout" class="flex items-center py-2 space-x-3">
              <img src="/icons/logout.svg" class="h-[20px] w-[20px]" alt="" />
              <span class="text-xs uppercase font-bold">Logout</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";
import Popper from "vue3-popper";

const emit = defineEmits(["close-drawer"]);

const router = useRouter();
const route = useRoute();
const qrcode = ref(false);

// computed function for active route
const active = computed(() => route.path);

const closeNav = () => {
  emit("close-drawer");
};
const gotoPageRoute = (page: string) => {
  router.push(`/${page}`);
  emit("close-drawer");
};
const handleLogout = (page: string) => {
  sessionStorage.clear();
  router.push("/login");
};

// FUnction to open sub menus
const openMenu = (page: string) => {
  if (page === "qrcode") {
    qrcode.value = !qrcode.value;
  }
};
</script>

<style scoped></style>
