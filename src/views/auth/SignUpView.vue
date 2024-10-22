<template>
  <section class="min-h-screen flex">
    <section class="w-full px-10 sm:px-20 py-5 md:p-10">
      <div class="flex flex-col justify-between h-full w-full mx-auto">
        <div class="flex gap-2 items-center">
          <img src="/icons/logo.svg" alt="" />
          <h1 class="text-xl font-extrabold text-black">ISZIFY</h1>
        </div>

        <div class="w-full md:w-[500px] mx-auto mt-5 h-full">
          <h2 class="text-info text-xl md:text-3xl font-bold text-center">
            Create Your Account
          </h2>
          <p class="text-center text-xs md:text-base mt-2">
            Initiate your marketing campaign today and actively connect with
            your customers.
          </p>
          <form @submit.prevent class="flex flex-col gap-5 mt-5 md:mt-10">
            <div class="flex gap-5">
              <div class="w-full">
                <p class="text-accent font-bold text-xs md:text-sm">
                  Firstname
                </p>
                <input
                  v-model="store.form.first_name"
                  name="firstname"
                  class="v-input text-sm"
                  type="text"
                />
              </div>
              <div class="w-full">
                <p class="text-accent font-bold text-xs md:text-sm">Lastname</p>
                <input
                  v-model="store.form.last_name"
                  name="lastname"
                  class="v-input text-sm"
                  type="text"
                />
              </div>
            </div>
            <div class="w-full">
              <p class="text-accent font-bold text-xs md:text-sm">Username</p>
              <input
                v-model="store.form.username"
                name="username"
                class="v-input text-sm"
                type="text"
              />
            </div>
            <div>
              <p class="text-accent font-bold text-xs md:text-sm">Email</p>
              <input
                v-model="store.form.email"
                name="email"
                class="v-input"
                type="'email'"
              />
            </div>

            <div>
              <p class="text-accent font-bold text-xs md:text-sm">Password</p>
              <div class="flex relative w-full">
                <img
                  @click="toggleLoginPassword()"
                  :src="`/icons/${switchLoginImage}`"
                  alt=""
                  class="absolute right-2 cursor-pointer top-5"
                />
                <input
                  v-model="store.form.password"
                  name="password"
                  class="v-input"
                  :type="inputLogin"
                />
              </div>
            </div>

            <div>
              <p class="text-accent font-bold text-xs md:text-sm">
                Confirm Password
              </p>
              <div class="flex relative w-full">
                <img
                  @click="toggleLoginPassword()"
                  :src="`/icons/${switchLoginImage}`"
                  alt=""
                  class="absolute right-2 cursor-pointer top-5"
                />
                <input
                  v-model="store.form.confirmPassword"
                  name="password"
                  class="v-input"
                  :type="inputLogin"
                />
              </div>
            </div>

            <div>
              <button
                @click="handleRegister"
                class="btn-full flex gap-2 justify-center items-center"
              >
                <span v-if="store.isLoading"
                  ><button-loader :color="'success'"></button-loader
                ></span>
                <span class="text-sm md:text-base">Sign Up</span>
              </button>
            </div>
          </form>

          <p class="text-center text-xs md:text-sm pt-3 pb-10">
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
          <p class="text-center text-xs md:text-sm">
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
import { register } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { session, getStorageData } from "@/utils";

const toast = useToast();
const store = useAuthStore();
const router = useRouter();
const inputLogin = ref("password");
const switchLoginImage = ref("eye-close.svg");

const toggleLoginPassword = () => {
  inputLogin.value = inputLogin.value === "password" ? "text" : "password";
  switchLoginImage.value =
    switchLoginImage.value === "eye-close.svg"
      ? "eye-open.svg"
      : "eye-close.svg";
};

// Function to register to dashboard
const handleRegister = async () => {
  store.isLoading = true;
  const response = await register({
    username: store.form.username,
    first_name: store.form.first_name,
    last_name: store.form.last_name,
    email: store.form.email.toLowerCase(),
    password: store.form.password,
  });

  if (!response?.error) {
    session.set("sessionData", {
      email: response?.data?.user_email,
    }),
      toast.success(response?.data?.message);
    router.push("/otp-verify");

    store.isLoading = false;
  } else {
    toast.error(response?.error?.message || "Network Error");
    store.isLoading = false;
  }
};
</script>

<style scoped></style>
