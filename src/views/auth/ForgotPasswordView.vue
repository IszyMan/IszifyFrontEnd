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
            Forgot Password
          </h2>
          <p class="text-xs xl:text-sm">
            A link to change password has been sent to your email
          </p>
          <form
            @submit.prevent
            class="rounded-md w-full md:w-[500px] mx-auto mt-10"
          >
            <div>
              <p class="text-sm font-bold text-accent">Email</p>
              <input
                v-model="email"
                class="v-input w-full"
                type="'email'"
                name="email"
                required
              />
            </div>

            <div class="pt-10">
              <button
                class="btn-full"
                @click="handleForgotPassword"
                @keydown.enter="handleForgotPassword"
              >
                <span v-if="isLoadingForgot"
                  ><button-loader :color="'white'"></button-loader
                ></span>
                <span class="text-sm">Send Email</span>
              </button>
            </div>
          </form>

          <p class="pt-5 text-center text-sm">
            Already has an account
            <router-link to="login">
              <span
                class="font-bold text-primary underline underline-offset-1 underline-primary cursor-pointer"
                >LOGIN</span
              ></router-link
            >
          </p>
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
import LoadingSpinner from "@/components/actions/LoadingSpinner.vue";
import ButtonLoader from "@/components/actions/ButtonLoader.vue";
import { forgotPassword } from "@/services/auth.service";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();
const inputLogin = ref("password");
const switchLoginImage = ref("eye-close.svg");
const email = ref("");
const isLoading = ref(false);

const handleForgotPassword = async () => {
  isLoading.value = true;
  const response = await forgotPassword({
    frontend_url: "http://localhost:8081/reset-password",
    email: email.value.toLowerCase(),
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
