<template>
  <div
    class="bg-gradient-to-r from-[#79d38585] to-[#79d38585] h-screen flex justify-center items-center px-5 sm:px-0"
  >
    <div class="text-center flex flex-col gap-3 items-center">
      <div>
        <img src="/icons/404.svg" alt="" />
      </div>
      <p class="text-2xl font-semibold">Oops! Why you’re here?</p>
      <p class="text-sm">
        We are very sorry for inconvenience. It looks like you’re try to access
        <br />
        a page that never existed.
      </p>
      <div class="mt-5">
        <router-link to="/">
          <button class="btn-sm capitalize">back to home</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NotFoundView",
};
</script>
