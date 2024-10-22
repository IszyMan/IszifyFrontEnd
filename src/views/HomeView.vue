<template>
  <div>
    <AppBar />

    <!-- Hero bar -->
    <section class="pt-20">
      <div
        class="items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5"
        data-aos="fade-right"
        data-aos-duration="800"
      >
        <div class="pr-2 md:mb-14 py-14 md:py-0">
          <h1 class="text-3xl text-primary font-bold xl:text-5xl lg:text-5xl">
            QR Code, Short URL & Bio Link Generator
          </h1>
          <p class="py-4 text-lg text-gray-500 2xl:py-8 md:py-6 2xl:pr-5">
            Create and customize your QR Codes, shorten URLs, and build bio
            links effortlessly. Streamline sharing with personalized,
            eye-catching designs—all in one place!
          </p>
          <div class="mt-4">
            <a
              href="#contact"
              class="px-5 py-3 text-lg tracking-wider text-success hover:text-white bg-primary-shades rounded-lg md:px-8 hover:bg-primary group"
              ><span>Explore More</span>
            </a>
          </div>
        </div>

        <div class="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0">
          <img
            title="https://storyset.com/technology"
            class="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
            src="/icons/qr-code-animate.svg"
            alt="Technology illustrations by Storyset"
            width="500"
            height="488"
          />
        </div>
      </div>
    </section>

    <!-- choose us -->
    <div class="">
      <section
        id="features"
        class="relative block px-6 py-10 md:py-20 md:px-10"
      >
        <div class="relative mx-auto max-w-5xl text-center">
          <span
            class="my-3 flex items-center justify-center font-medium uppercase tracking-wider"
          >
            Why choose us
          </span>
          <h2
            class="block w-full bg-gradient-to-b from-primary-shades to-primary bg-clip-text font-bold text-transparent text-3xl sm:text-4xl"
          >
            Build a Website That Your Customers Love
          </h2>
          <p
            class="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400"
          >
            Our templates allow for maximum customization. No technical skills
            required – our intuitive design tools let you get the job done
            easily.
          </p>
        </div>

        <div
          class="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div class="rounded-md border p-8 text-center shadow">
            <div
              class="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-color-swatch"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"
                ></path>
                <path
                  d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"
                ></path>
                <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                <line x1="17" y1="17" x2="17" y2="17.01"></line>
              </svg>
            </div>
            <h3 class="mt-6 text-gray-400">Customizable</h3>
            <p
              class="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400"
            >
              Tailor your landing page's look and feel, from the color scheme to
              the font size, to the design of the page.
            </p>
          </div>

          <div class="rounded-md border p-8 text-center shadow">
            <div
              class="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-bolt"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <polyline
                  points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"
                ></polyline>
              </svg>
            </div>
            <h3 class="mt-6 text-gray-400">Fast Performance</h3>
            <p
              class="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400"
            >
              We build our templates for speed in mind, for super-fast load
              times so your customers never waver.
            </p>
          </div>

          <div class="rounded-md border p-8 text-center shadow">
            <div
              class="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-tools"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                <polyline points="12 8 7 3 3 7 8 12"></polyline>
                <line x1="7" y1="8" x2="5.5" y2="9.5"></line>
                <polyline points="16 12 21 17 17 21 12 16"></polyline>
                <line x1="16" y1="17" x2="14.5" y2="18.5"></line>
              </svg>
            </div>
            <h3 class="mt-6 text-gray-400">Fully Featured</h3>
            <p
              class="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400"
            >
              Everything you need to succeed and launch your landing page, right
              out of the box. No need to install anything else.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import FooterSection from "@/components/FooterSection.vue";
import AppBar from "@/components/AppBar.vue";
</script>

<style scoped></style>
