<template>
  <div
    class="min-h-screen overflow-hidden p-3 md:p-10 bg-accent-tint pt-20 md:pt-24"
  >
    <div @click="router.go(-1)" class="flex items-center gap-2">
      <p class="w-[10px] h-[10px] cursor-pointer">
        <img
          class="w-[10px] h-[10px]"
          src="/icons/chevron-left-grey.svg"
          alt=""
        />
      </p>
      <p class="cursor-pointer hover:text-primary">Back to lists</p>
    </div>
    <div class="flex justify-between items-center mt-5">
      <HeaderComponent :title="'Edit QR Code'" />

      <div>
        <button
          @click="handleSingleQrcode"
          class="btnn-sm text-xs md:text-sm capitalize font-semibold flex items-center gap-1"
        >
          <span v-if="isLoading" class="animate-pulse">loading...</span>
          <span v-else>update</span>
        </button>
      </div>
    </div>

    <div v-if="loading" class="mt-5 md:mt-10">
      <PageAnimation />
    </div>
    <div v-else class="pt-5 flex flex-col md:flex-row gap-5 md:gap-10">
      <!-- QR Code Section -->
      <div class="w-full md:w-[40%]">
        <div v-if="details" class="mx-auto flex justify-center pt-5 md:pt-10">
          <div :id="'canvas-container-' + details?.id"></div>
        </div>
      </div>

      <!-- other details -->
      <div class="w-full md:w-[60%]">
        <h3
          class="font-bold text-black text-lg sm:text-xl md:text-2xl pt-5 md:pt-10"
        >
          Details
        </h3>
        <!-- Title Section -->
        <div class="pt-5 md:pt-10">
          <p class="font-bold text-black text-xs sm:text-sm md:text-base">
            Title
          </p>
          <input
            v-model="data.title"
            type="text"
            class="v-input md:w-[500px] capitalize"
          />
        </div>

        <!-- Short Link Section -->
        <div class="pt-5 md:pt-10">
          <p class="font-bold text-black text-xs sm:text-sm md:text-base">
            Short link
          </p>
          <div class="pt-2 flex gap-4 items-center">
            <p>{{ details?.short_url }}</p>
            <div
              v-if="details?.short_url"
              class="w-[20px] h-[20px] cursor-pointer"
              @click="copyToClipboard(details?.short_url)"
            >
              <img
                src="/icons/copy-grey.svg"
                class="w-[20px] h-[20px]"
                alt="copy
              icon"
              />
            </div>
          </div>
        </div>

        <!-- Scan Destination Section -->
        <div>
          <h3 class="font-bold text-black text-xl md:text-2xl pt-5 md:pt-10">
            More Informations
          </h3>

          <div>
            <p
              class="pt-5 font-bold text-sm md:text-base text-black capitalize"
            >
              scan destination
            </p>
            <div class="flex gap-3 pt-2 items-center">
              <div class="w-[20px] h-[20px]">
                <img
                  class="w-[20px] h-[20px]"
                  src="/icons/link.svg"
                  alt="link icon"
                />
              </div>
              <p class="font-medium capitalize">
                {{ details?.category == "url" ? "website" : details?.category }}
              </p>
            </div>
          </div>

          <!--  -->
          <div class="pt-5 md:pt-8">
            <p class="capitalize font-bold text-sm md:text-base text-black">
              destination
            </p>
            <p v-if="details?.url" class="w-[500px] truncate text-sm pt-2">
              {{ details?.url }}
            </p>
            <p v-else>{{ "None" }}</p>
            <div v-if="details?.url" class="text-black flex mt-5">
              <img
                src="/icons/direction.svg"
                alt=""
                class="w-[14px] md:w-[20px] h-20px"
              />
              <button class="btnn-sm text-xs py-2 px-1.5">Redirect Link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { getUpdateQrCode, updateQrCode } from "@/services/qrcode.service";
import QRCodeStyling from "qr-code-styling";
import PageAnimation from "@/components/actions/PageAnimation.vue";

const loading = ref(false);
const isLoading = ref(false);
const route = useRoute();
const router = useRouter();
const toast = useToast();
const editTitle = ref("");
const qrCode: any = ref<QRCodeStyling | null>(null);
const details: any = ref(null); // Updated to null for handling object

const data = ref({
  title: "",
  url: "",
});

const id = route?.params?.id;

const getSingleQrcode = async () => {
  loading.value = true;
  const result = await getUpdateQrCode(id);
  if (!result.error) {
    details.value = result?.data;
    data.value.title = details.value.title;
    loading.value = false;
  } else {
    if (result?.error) {
      toast.error(result?.error?.message);
      loading.value = false;
    }
  }
};

const handleSingleQrcode = async () => {
  isLoading.value = true;
  const result = await updateQrCode(id, data.value);
  if (!result.error) {
    toast.success(result.data.message);
    getSingleQrcode();
    isLoading.value = false;
  } else {
    if (result?.error) {
      toast.error(result?.error?.message);
      isLoading.value = false;
    }
  }
};

const copyToClipboard = async (text: string | undefined) => {
  if (text) {
    try {
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        toast.success("Copied to clipboard");
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy: ", err);
    }
  }
};

// MOUNTED
onMounted(async () => {
  await getSingleQrcode();
});

watch(details, async (newDetails) => {
  if (newDetails) {
    // Wait for DOM updates to complete
    await nextTick();

    const canvasContainer = document.getElementById(
      `canvas-container-${newDetails.id}`
    );

    if (canvasContainer) {
      // Clear any existing QR code in the container
      canvasContainer.innerHTML = "";

      const qrCodeInstance = new QRCodeStyling({
        width: newDetails.qr_style.width || 200, // Using width from data or fallback
        height: newDetails.qr_style.height || 200, // Using height from data or fallback
        data: newDetails.short_url,
        dotsOptions: newDetails.qr_style.dotsOptions,
        backgroundOptions: newDetails.qr_style.backgroundOptions,
        cornersSquareOptions: newDetails.qr_style.cornersSquareOptions,
        image: newDetails.qr_style.image,
        cornersDotOptions: newDetails.qr_style.cornersDotOptions,
        imageOptions: newDetails.qr_style.imageOptions,
        qrOptions: newDetails.qr_style.qrOptions,
      });

      // Append the new QR code
      qrCodeInstance.append(canvasContainer);
    } else {
      console.error(`Canvas container for code ID ${newDetails.id} not found`);
    }
  }
});
</script>

<style scoped></style>
