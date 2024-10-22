<template>
  <section>
    <header
      :class="{ scrolled: isScrolled }"
      ref="header"
      class="fixed top-0 right-0 left-0 z-50 bg-white animate__animated animate__fadeInDown"
    >
      <div
        class="h-[100px] flex justify-between items-center container mx-auto pr-5"
      >
        <div class="flex gap-2 items-center">
          <img src="/icons/logo.svg" alt="" />
          <h1 class="text-xl font-extrabold text-black">ISZIFY</h1>
        </div>

        <nav class="flex items-center md:gap-20">
          <ul class="hidden md:flex gap-10 font-light uppercase items-center">
            <li
              @click="activeLink('faq')"
              class="text-sm font-bold cursor-pointer hover:text-accent"
              :class="
                active === 'awards'
                  ? 'text-accent underline underline-offset-4 decoration-4 decoration-primary'
                  : 'text-primary '
              "
            >
              FAQ
            </li>
            <li
              @click="activeLink('contact')"
              class="text-sm font-bold cursor-pointer hover:text-accent"
              :class="
                active === 'contact'
                  ? 'text-accent underline underline-offset-4 decoration-4 decoration-primary'
                  : 'text-primary '
              "
            >
              Support
            </li>
          </ul>
          <div class="flex gap-2 items-center">
            <div class="hidden md:block">
              <router-link to="login">
                <button class="btnn-sm">Login</button></router-link
              >
            </div>
            <div class="hidden md:block">
              <router-link to="/signup">
                <button class="btnn-sm-outline">Sign Up</button></router-link
              >
            </div>
            <div v-if="modal !== true" @click="openNav" class="md:hidden">
              <img src="/icons/menu.svg" alt="" />
            </div>
            <div v-else @click="closeNav" class="md:hidden">
              <img src="/icons/close.svg" alt="" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    let isButtonVisible = ref(false);
    const header = ref(null);
    const spacer = ref("shadow-md");
    const isScrolled = ref("shadow-none");
    const modal = ref(false);
    const active = ref("home");

    const activeLink = (item) => {
      active.value = item;
    };

    const openNav = () => {
      modal.value = true;
    };
    const closeNav = () => {
      modal.value = false;
    };

    return {
      header,
      spacer,
      isScrolled,
      active,
      activeLink,
      modal,
      openNav,
      closeNav,
    };
  },
};
</script>

<style>
header.scrolled {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.spacer {
  height: 50vh;
}
</style>
