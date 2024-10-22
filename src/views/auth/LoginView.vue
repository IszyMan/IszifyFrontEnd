<template>
  <section class="min-h-screen flex">
    <section class="w-full md:w-[60%] px-10 sm:px-20 py-5 md:p-10">
      <div class="flex flex-col justify-between h-full w-full mx-auto">
        <div class="flex gap-2 w-full items-center">
          <img src="/icons/logo.svg" alt="" />
          <h1 class="text-xl font-extrabold text-black">ISZIFY</h1>
        </div>

        <div class="w-full self-center h-full">
          <div class="mx-auto mt-10 md:mt-20 md:w-[400px]">
            <h2 class="text-info text-2xl md:text-3xl font-bold text-center">
              Login
            </h2>
            <form @submit.prevent class="flex flex-col gap-8 mt-10">
              <div>
                <p class="text-accent font-bold text-sm">Email</p>
                <input
                  v-model="store.form.email"
                  name="email"
                  class="v-input"
                  type="'email'"
                />
              </div>

              <div>
                <p class="text-accent font-bold text-sm">Password</p>
                <div class="flex relative w-full">
                  <img
                    @click="toggleLoginPassword()"
                    :src="`/icons/${switchLoginImage}`"
                    alt=""
                    class="absolute right-2 cursor-pointer top-5"
                  />
                  <input
                    v-model.trim="store.form.password"
                    name="password"
                    class="v-input"
                    :type="inputLogin"
                  />
                </div>
                <router-link to="/forgot-password"
                  ><p
                    @click="forgotPassword"
                    class="capitalize text-end mt-4 text-xs text-accent cursor-pointer hover:text-primary"
                  >
                    forgot password?
                  </p></router-link
                >
              </div>

              <div>
                <button
                  @click="login"
                  class="btn-full flex gap-2 justify-center items-center"
                >
                  <span v-if="store.isLoading"
                    ><button-loader :color="'success'"></button-loader
                  ></span>
                  <span class="text-sm md:text-base">Login</span>
                </button>
              </div>
            </form>
          </div>
          <p class="pt-5 text-center text-sm">
            Don't have an account?
            <router-link to="signup">
              <span
                class="font-bold text-primary underline underline-offset-1 underline-primary cursor-pointer"
                >SIGNUP</span
              ></router-link
            >
          </p>
        </div>

        <div class="w-full">
          <p class="text-center">
            &copy; {{ new Date().getFullYear() }}.
            <span class="text-info font-bold">Iszify.com. </span> All Rights
            Reversed
          </p>
        </div>
      </div>
    </section>

    <!--  -->
    <section class="bg-primary hidden md:flex w-[40%]">
      <div
        class="flex justify-center h-full items-center w-[400px] text-center mx-auto"
      >
        <div>
          <h2 class="text-white text-xl md:text-2xl font-bold">
            You don't have an account?
          </h2>
          <p class="py-2 text-base md:text-lg text-white">
            Initiate your marketing campaign today and actively connect with
            your customers.
          </p>

          <div class="mt-5">
            <router-link to="/signup"
              ><button class="btnn-sm">Sign Up</button>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import LoadingSpinner from "@/components/actions/LoadingSpinner.vue";
import ButtonLoader from "@/components/actions/ButtonLoader.vue";
import { signin } from "@/services/auth.service";
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

// Function to login to dashboard
const login = async () => {
  store.isLoading = true;
  const response = await signin({
    email: store.form.email.toLowerCase(),
    password: store.form.password,
  });

  if (response.status === 200) {
    store.form = {};
    session.set("sessionData", {
      access_token: response?.data?.access_token,
    }),
      store.setAdminProfile({
        access_token: response?.data?.access_token,
      }),
      (window.location.href = "/admin/dashboard");
    toast.success(response?.data?.message);
    store.isLoading = false;
  } else {
    if (response?.error) {
      if (response?.error?.email_verified === false) {
        router.push("/otp-verify");
        store.isLoading = false;
        store.form = {};
      } else {
        toast.error(response?.error?.message || "Network Error");
        store.isLoading = false;
      }
    }
  }
};
</script>
