<template>
  <section
    class="min-h-screen overflow-hidden p-3 md:p-10 bg-accent-tint pt-20 md:pt-24"
  >
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between"
    >
      <div>
        <HeaderComponent :title="'My QR Codes'" />
      </div>
      <div class="flex py-5 md:pt-0 gap-3 items-center">
        <div>
          <button
            class="border px-5 text-xs md:text-sm rounded py-2 btnn-sm-outline border-accent text-accent"
          >
            Export
          </button>
        </div>

        <div>
          <popper>
            <div
              class="border cursor-pointer rounded flex text-xs md:text-sm justify-between items-center bg-white w-[150px] px-3 py-2.5 font-bold"
            >
              <p>Status: {{ filteredStatus }}</p>
              <div class="h[20px] w-[20px]">
                <img src="/icons/chevron-down.svg" alt="" />
              </div>
            </div>
            <template #content>
              <div class="shadow bg-white w-[150px] rounded-md">
                <div
                  v-for="(status, index) in statuss"
                  :key="index"
                  class="cursor-pointer hover:bg-accent-tint"
                >
                  <p class="py-2 px-3 font-medium text-xs md:text-sm">
                    {{ status }}
                  </p>
                </div>
              </div>
            </template>
          </popper>
        </div>
      </div>
    </div>

    <section class="h-[650px] scrollbar-hide overflow-y-auto">
      <div>
        <!-- <h2 class="fony-bold text-2xl">There is no active QR Codes</h2> -->
        <div class="">
          <div
            v-if="loading"
            class="flex min-h-[500px] justify-center items-center"
          >
            <div>
              <img src="/icons/logo.svg" alt="" />
            </div>
          </div>
          <div v-else v-for="code in generatedCodes" :key="code.id">
            <div
              class="flex flex-col lg:flex-row justify-between my-5 md:p-8 border overflow-x-scroll shadow-sm bg-zinc-50 rounded-md"
            >
              <div class="flex flex-col lg:flex-row gap-1 md:gap-5 p-2">
                <div class="h-[80px] w-[80px] md:h-[100px] md:w-[100px]">
                  <div
                    :id="'canvas-container-' + code.id"
                    class="h-[80px] w-[80px] md:h-[100px] md:w-[100px]"
                  ></div>
                </div>
                <div class="space-y-1">
                  <h1
                    class="text-lg md:text-xl w-full md:w-[500px] capitalize font-extrabold capital text-black"
                  >
                    {{ code?.title ? code?.title : "Untitled" }}
                  </h1>
                  <p class="text-black font-bold text-xs md:text-sm">
                    {{ code?.category === "url" ? "website" : code?.category }}
                  </p>
                  <div class="text-black flex">
                    <img
                      src="/icons/direction.svg"
                      alt=""
                      class="w-[14px] md:w-[20px] h-20px"
                    />
                    <p class="text-xs md:text-sm truncate w-[400px]">
                      {{ code?.url }}
                    </p>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-3 md:gap-7 pt-2">
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
                        {{ code?.created }}
                      </p>
                    </div>
                    <div class="flex gap-2 items-center text-black">
                      <img
                        src="/icons/link.svg"
                        alt=""
                        class="h-[16px] w-[16px]"
                      />
                      <p class="text-xs md:text-sm">{{ code?.short_url }}</p>
                    </div>
                  </div>
                </div>
              </div>
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
                        <div
                          @click="handleDelete(code)"
                          class="text-accent py-2 px-5 cursor-pointer hover:bg-accent-tint capitalize font-semibold hover:border-l hover:border-black"
                        >
                          delete
                        </div>
                      </div>
                    </template>
                  </Popper>
                </div>
                <div
                  class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades hover:cursor-pointer"
                  @click="handleCustomiseQrcode(code)"
                >
                  <div class="w-[70%] h-[70%]">
                    <img src="/icons/customize-blue.svg" alt="" />
                  </div>
                </div>
                <div
                  class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades hover:cursor-pointer"
                  @click="handleEditQrcode(code.id)"
                >
                  <div class="w-[70%] h-[70%]">
                    <img src="/icons/edit-blue.svg" alt="" />
                  </div>
                </div>
                <div
                  class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades hover:cursor-pointer"
                  @click="handleDownload(code.id)"
                >
                  <div class="w-[70%] h-[70%]">
                    <img src="/icons/download.svg" alt="" />
                  </div>
                </div>
                <div
                  @click="handleGoQrcode(code.id)"
                  class="p-2 hover:bg-accent-tint cursor-pointer rounded border border-accent-shades font-semibold flex gap-2 items-center hover:cursor-pointer"
                >
                  <div class="w-[70%] h-[70%]">
                    <img src="/icons/chart.svg" alt="" />
                  </div>
                  <p class="text-xs">view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <UpdateQrStyle
      :onLoading="onLoading"
      v-if="qrModal"
      :qrCodeData="selectedQrCode"
      @close="closeQrModal"
      @onSave="handleQrStylingSave"
    />

    <div v-if="modal">
      <DeleteModal
        @close-modall="closeModal"
        :data="data"
        :isLoading="isLoading"
        @delete-data="handleDeleteCode"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import QRCodeStyling from "qr-code-styling";
import {
  getAllQrCodes,
  deleteSingleQrcode,
  postStyleQrCode,
} from "@/services/qrcode.service";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import UpdateQrStyle from "@/components/modals/UpdateQrStyle.vue";
import { useToast } from "vue-toastification";
import moment from "moment";

const loading = ref(false);
const isLoading = ref(false);
const onLoading = ref(false);
const modal = ref(false);
const data = ref();
const qrModal = ref(false);
const router = useRouter();
const qrCode = ref<QRCodeStyling | null>(null);
const generatedCodes = ref([]);
const filteredStatus = ref("Active");
const toast = useToast();
const selectedQrCode = ref(null);
const statuss = ref(["Active", "Hidden", "Customized"]);

// Function to generate and append QR codes
const generateQRCodes = () => {
  generatedCodes.value.forEach((code: any) => {
    const qrCodeInstance = new QRCodeStyling({
      width: 80,
      height: 80,
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
      canvasContainer.innerHTML = ""; // Clear any previous QR codes
      qrCodeInstance.append(canvasContainer);
    } else {
      console.error(`Canvas container for code ID ${code.id} not found`);
    }
  });
};

// Fetch all QR codes
const getAllQrCode = async () => {
  loading.value = true;
  const result = await getAllQrCodes();
  if (!result.error) {
    generatedCodes.value = result?.data?.data;
    loading.value = false;
  } else {
    toast.error(result.error.message);
    loading.value = false;
  }
};

// Re-generate QR codes when `generatedCodes` updates
watch(generatedCodes, () => {
  nextTick(() => {
    generateQRCodes();
  });
});

// Handle edit and delete functions
const handleEditQrcode = (id: any) => {
  router.push(`qrcode/edit/${id}`);
};

const handleGoQrcode = (id: any) => {
  router.push(`qrcode/view/${id}`);
};

const handleDelete = (item: any) => {
  modal.value = true;
  data.value = item;
};

const handleDeleteCode = async (item: any) => {
  isLoading.value = true;
  const response = await deleteSingleQrcode(item.id);
  if (!response?.error) {
    toast.success(response?.data?.msg || "QR code deleted successfully");
    isLoading.value = false;
    data.value = "";
    modal.value = false;
    await getAllQrCode(); // Re-fetch QR codes after deletion
  } else {
    toast.error(response?.error?.msg || "Error! Try again");
    isLoading.value = false;
  }
};

const closeQrModal = () => {
  qrModal.value = false;
};

const handleCustomiseQrcode = (code: any) => {
  if (code && code.short_url) {
    selectedQrCode.value = code;
    qrModal.value = true;
  } else {
    console.error("QR code data is missing or incomplete", code);
  }
};

// Handle saving updated QR code styles
const handleQrStylingSave = async (updatedStyles: any) => {
  onLoading.value = true;
  const result = await postStyleQrCode(
    updatedStyles.id,
    updatedStyles.updatedData.qr_style
  );
  if (!result.error) {
    onLoading.value = false;
    toast.success(result.data.message);
    qrModal.value = false;
    await getAllQrCode(); // Re-fetch QR codes after saving
  } else {
    toast.error(result.error.message);
    onLoading.value = false;
  }
};

// Handle download function for QR code
const handleDownload = (id: any) => {
  const selectedCode = generatedCodes.value.find((code: any) => code.id === id);
  if (selectedCode) {
    const qrCodeInstance = new QRCodeStyling({
      width: 300,
      height: 300,
      data: selectedCode.short_url,
      dotsOptions: selectedCode.qr_style.dotsOptions,
      backgroundOptions: selectedCode.qr_style.backgroundOptions,
      image: selectedCode.qr_style.image,
      imageOptions: selectedCode.qr_style.imageOptions,
      qrOptions: selectedCode.qr_style.qrOptions,
    });

    qrCodeInstance.download({
      name: `qrcode-${selectedCode.title || "untitled"}`,
      extension: "png",
    });
  } else {
    toast.error("QR code not found.");
  }
};

// MOUNTED
onMounted(async () => {
  await getAllQrCode(); // Fetch initial QR codes

  // Ensure QR codes are generated once the DOM is ready
  nextTick(() => {
    generateQRCodes();
  });
});
</script>

<style scoped></style>
