<template>
  <section class="min-h-screen flex">
    <section class="w-full px-10 sm:px-20 py-5 md:p-10">
      <div class="flex flex-col justify-between h-full w-full mx-auto">
        <div class="flex gap-2 items-center">
          <img src="/icons/logo.svg" alt="" />
          <h1 class="text-xl font-extrabold text-black">ISZIFY</h1>
        </div>

        <div
          class="w-full md:w-[500px] flex flex-col mt-10 md:mt-20 gap-3 mx-auto h-full"
        >
          <h2 class="font-extrabold text-primary text-xl md:text-2xl">
            Reset Password
          </h2>

          <form
            @submit.prevent
            class="rounded-md w-full md:w-[500px] mx-auto mt-10"
          >
            <div>
              <p>New Password</p>
              <div class="flex relative w-full">
                <input
                  v-model="password"
                  class="v-input w-full"
                  :type="inputLogin"
                  name="password"
                  required
                />

                <img
                  @click="toggleLoginPassword()"
                  :src="`/icons/${switchLoginImage}`"
                  alt=""
                  class="absolute right-2 top-6"
                />
              </div>
            </div>

            <div class="mt-5">
              <p>Confirm New Password</p>
              <div class="flex relative w-full">
                <input
                  v-model="confirmPassword"
                  class="v-input w-full"
                  :type="inputLogin"
                  name="confirmPassword"
                  required
                />

                <img
                  @click="toggleLoginPassword()"
                  :src="`/icons/${switchLoginImage}`"
                  alt=""
                  class="absolute right-2 top-6"
                />
              </div>
            </div>

            <div class="pt-10">
              <button
                class="btn-full"
                @click="handleResettPassword"
                @keydown.enter="handleResettPassword"
              >
                <span v-if="isLoadingForgot"
                  ><button-loader :color="'white'"></button-loader
                ></span>
                <span class="text-sm">Reset Password</span>
              </button>
            </div>
          </form>
        </div>

        <div>
          <p class="text-center">
            &copy; {{ new Date().getFullYear() }}.
            <span class="text-info font-bold">Iszify.com. </span> All Rights
            Reversed
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { resetForgotPassword } from "@/services/auth.service";
import { useToast } from "vue-toastification";
import LoadingSpinner from "@/components/actions/LoadingSpinner.vue";

const route = useRoute();
const inputLogin = ref("password");
const switchLoginImage = ref("eye-close.svg");
const toast = useToast();
const password = ref("");
const isLoading = ref(false);
const confirmPassword = ref("");

const access = route.params.accesstoken;

const toggleLoginPassword = () => {
  inputLogin.value = inputLogin.value === "password" ? "text" : "password";
  switchLoginImage.value =
    switchLoginImage.value === "eye-close.svg"
      ? "eye-open.svg"
      : "eye-close.svg";
};

const handleResettPassword = async () => {
  const response = await resetForgotPassword(access, {
    new_password: password.value,
    confirm_password: confirmPassword.value,
  });

  if (response && response.status === 200) {
    toast.success(response?.data?.message);
    isLoading.value = false;
  } else {
    toast.error(response?.data?.message || "Network Error");
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
