<template>
  <section>
    <div
      class="min-h-screen overflow-hidden p-5 md:p-10 bg-accent-tint pt-20 md:pt-24"
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
      <div class="rounded-md border bg-zinc-50 my-5 p-5 md:p-8">
        <div v-if="loading">
          <PulseAnimation />
        </div>
        <div v-else>
          <div
            class="flex flex-col imd:tems-center lg:flex-row justify-between"
          >
            <div class="flex flex-col xl:flex-row gap-1 md:gap-5 p-2">
              <div class="">
                <div :id="'canvas-container-' + details?.id"></div>
              </div>

              <div class="space-y-1">
                <h1
                  class="text-lg md:text-xl w-full md:w-[500px] capitalize font-extrabold capital text-black"
                >
                  {{ details?.title ? details?.title : "Untitled" }}
                </h1>
                <p class="text-black font-bold text-xs md:text-sm">
                  {{
                    details?.category === "url" ? "website" : details?.category
                  }}
                </p>
                <div class="text-black flex">
                  <img
                    src="/icons/direction.svg"
                    alt=""
                    class="w-[14px] md:w-[20px] h-20px"
                  />
                  <p class="text-xs md:text-sm truncate w-[400px]">
                    {{ details?.url }}
                  </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 md:gap-7 pt-5">
                  <div class="flex gap-2 items-center">
                    <img
                      src="/icons/chart.svg"
                      alt=""
                      class="h-[16px] w-[16px]"
                    />
                    <p
                      class="p-2 bg-accent-tint text-xs rounded text-accent font-medium"
                    >
                      Scan data
                    </p>
                  </div>
                  <div class="flex gap-2 items-center text-black">
                    <img
                      src="/icons/calender.svg"
                      alt=""
                      class="h-[16px] w-[16px]"
                    />
                    <p class="text-xs">
                      {{ details?.created }}
                    </p>
                  </div>
                  <div class="flex gap-2 items-center text-black">
                    <img
                      src="/icons/link.svg"
                      alt=""
                      class="h-[16px] w-[16px]"
                    />
                    <p class="text-xs md:text-sm">{{ details?.short_url }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Acions -->
            <div
              class="flex py-5 pl-2 md:pl-0 md:py-0 gap-5 self-start sm:mt-5 lg:mt-0"
            >
              <div
                class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades hover:cursor-pointer"
              >
                <Popper
                  :hover="true"
                  :placement="'bottom'"
                  class="animate__animated animate__zoomIn"
                >
                  <img src="/icons/dots.svg" class="w-[70%] h-[70%]" alt="" />

                  <template #content>
                    <div
                      class="w-[200px] bg-white rounded-lg mt-3 shadow-lg z-30"
                    >
                      <div
                        class="text-accent py-2 px-5 cursor-pointer hover:bg-accent-tint capitalize font-semibold hover:border-l hover:border-black"
                      >
                        duplicate
                      </div>
                      <div
                        class="text-accent py-2 px-5 cursor-pointer hover:bg-accent-tint capitalize font-semibold hover:border-l hover:border-black"
                      >
                        hide code
                      </div>
                    </div>
                  </template>
                </Popper>
              </div>
              <div
                class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades hover:cursor-pointer"
              >
                <div
                  @click="handleCustomiseQrcode(details)"
                  class="w-[70%] h-[70%]"
                >
                  <img src="/icons/customize-blue.svg" alt="" />
                </div>
              </div>
              <div
                class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades hover:cursor-pointer"
                @click="handleEditQrCode"
              >
                <div class="w-[70%] h-[70%]">
                  <img src="/icons/edit-blue.svg" alt="" />
                </div>
              </div>
              <div
                class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades hover:cursor-pointer"
                @click="handleDownload"
              >
                <div class="w-[70%] h-[70%]">
                  <img src="/icons/download.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <UpdateQrStyle
      :onLoading="isLoading"
      v-if="qrModal"
      :qrCodeData="selectedQrCode"
      @close="closeQrModal"
      @onSave="handleQrStylingSave"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { getUpdateQrCode, postStyleQrCode } from "@/services/qrcode.service";
import QRCodeStyling from "qr-code-styling";
import PulseAnimation from "@/components/actions/PulseAnimation.vue";
import { useToast } from "vue-toastification";
import UpdateQrStyle from "@/components/modals/UpdateQrStyle.vue";

const loading = ref(false);
const route = useRoute();
const toast = useToast();
const router = useRouter();
const isLoading = ref(false);
const modal = ref(false);
const editTitle = ref("");
const qrModal = ref(false);
const selectedQrCode: any = ref(null);
const qrCode: any = ref<QRCodeStyling | null>(null);
const details: any = ref(null); // Updated to null for handling object

const id = route?.params?.id;

const handleEditQrCode = () => {
  router.replace(`/admin/qrcode/edit/${id}`);
};

const handleDownload = () => {
  if (qrCode.value) {
    qrCode.value.download({
      name: details.value?.title || "qr_code",
      extension: "png", // You can also use "svg" or "jpeg" if needed
    });
  }
};

const handleCustomiseQrcode = (code: any) => {
  if (code && code.short_url) {
    selectedQrCode.value = code;
    qrModal.value = true;
  } else {
    console.error("QR code data is missing or incomplete", code);
  }
};

const closeQrModal = () => {
  qrModal.value = false;
};
const getSingleQrcode = async () => {
  loading.value = true;
  const result = await getUpdateQrCode(id);
  if (!result.error) {
    details.value = result?.data;
    editTitle.value = details.value.title;
  }
  loading.value = false;
};

// Handle saving of QR code styles
const handleQrStylingSave = async (updatedStyles: any) => {
  isLoading.value = true;
  const result = await postStyleQrCode(
    updatedStyles.id,
    updatedStyles.updatedData.qr_style
  );
  if (!result.error) {
    isLoading.value = false;
    toast.success(result.data.message);
    closeQrModal();
    await getSingleQrcode(); // Re-fetch the updated data
    regenerateQrCode(); // Call function to regenerate the QR code
  } else {
    toast.error(result.error.message);
    isLoading.value = false;
  }
};

const regenerateQrCode = () => {
  if (details.value) {
    const code = details.value;
    qrCode.value = new QRCodeStyling({
      width: 150,
      height: 150,
      data: code.short_url,
      dotsOptions: code.qr_style.dotsOptions,
      image: code.qr_style.image,
      backgroundOptions: code.qr_style.backgroundOptions,
      cornersSquareOptions: code.qr_style.cornersSquareOptions,
      cornersDotOptions: code.qr_style.cornersDotOptions,
      imageOptions: code.qr_style.imageOptions,
      qrOptions: code.qr_style.qrOptions,
    });

    const canvasContainer = document.getElementById(
      `canvas-container-${code.id}`
    );
    if (canvasContainer) {
      qrCode.value.append(canvasContainer);
    } else {
      console.error(`Canvas container for code ID ${code.id} not found`);
    }
  }
};

// MOUNTED
onMounted(async () => {
  await getSingleQrcode();

  // Ensure the DOM is fully updated before generating QR code
  nextTick(() => {
    if (details.value) {
      const code = details.value;
      qrCode.value = new QRCodeStyling({
        width: 150,
        height: 150,
        data: code.short_url,
        dotsOptions: code.qr_style.dotsOptions,
        image: code.qr_style.image,
        backgroundOptions: code.qr_style.backgroundOptions,
        cornersSquareOptions: code.qr_style.cornersSquareOptions,
        cornersDotOptions: code.qr_style.cornersDotOptions,
        imageOptions: code.qr_style.imageOptions,
        qrOptions: code.qr_style.qrOptions,
      });

      const canvasContainer = document.getElementById(
        `canvas-container-${code.id}`
      );
      if (canvasContainer) {
        qrCode.value.append(canvasContainer);
      } else {
        console.error(`Canvas container for code ID ${code.id} not found`);
      }
    }
  });
});
</script>

<style scoped></style>
