<template>
  <section class="bg-white pt-10 md:pt-20 px-5">
    <div class="max-w-full w-[60%] mx-auto py-10 md:py-20">
      <div>
        <h2 class="text-accent font-bold text-3xl">Create New Link</h2>
      </div>

      <div class="mt-5 md:mt-10">
        <div>
          <p class="font-bold text-info">Destination</p>
          <input
            type="text"
            class="v-input"
            placeholder="hpps://example,com/my-long-url"
          />
        </div>

        <div class="mt-5 md:mt-10">
          <p><span class="font-bold text-info">Title </span> (optional)</p>
          <input type="text" class="v-input" />
        </div>

        <div class="mt-10 md:mt-20">
          <p>
            <span class="font-bold text-info text-lg md:text-xl">QR Code </span>
            (optional)
          </p>

          <div class="flex items-center gap-1 mt-4">
            <p><input type="checkbox" class="toggle" /></p>
            <p class="text-base">
              Generate a QR Code to share anywhere people can see it
            </p>
          </div>
        </div>

        <div class="mt-10 md:mt-20 flex justify-end gap-5 items-center">
          <div>
            <button class="font-semibold text-info">Cancel</button>
          </div>
          <div>
            <button class="btn-green-sm">Create</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
