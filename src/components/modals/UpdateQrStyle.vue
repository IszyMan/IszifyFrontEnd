<template>
  <section
    class="z-50 h-screen fixed w-full bg-[#333] bg-opacity-70 overflow-y-auto inset-0 outline-none focus:outline-none"
  >
    <div class="max-w-full mx-auto px-3 flex items-center">
      <div
        class="bg-white flex flex-col gap-5 md:gap-8 sm:w-[80%] mx-auto my-5 relative pb-10 pt-5 rounded-lg animate__animated animate__zoomIn px-5 w-full"
      >
        <div class="flex justify-end">
          <p
            @click="closeModal"
            class="p-2 bg-accent hover:bg-info-tint rounded-full cursor-pointer"
          >
            <img src="/icons/close-white.svg" alt="Close" />
          </p>
        </div>

        <h2 class="font-bold text-lg sm:text-xl md:text-2xl text-black">
          Customize QR Code
        </h2>
        <!-- qrOptions for QR Code customization -->
        <div class="flex flex-col md:flex-row gap-10">
          <div class="w-full md:w-[60%]">
            <h3 class="font-bold text-info">Main Options</h3>
            <div class="py-5">
              <div class="grid grid-cols-2 gap-4 w-full">
                <div>
                  <label class="text-accent">Width: </label>

                  <select v-model="qrOptions.width" class="v-input w-[100px]">
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                  </select>
                </div>

                <div>
                  <label class="text-accent">Height: </label>
                  <select v-model="qrOptions.height" class="v-input w-[100px]">
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                  </select>
                </div>

                <!-- Image section -->
                <div class="col-span-2 mt-3">
                  <div>
                    <label
                      class="relative flex gap-2 text-accent hover:cursor-pointer"
                    >
                      Choose an Image:
                      <input type="file" hidden @change="handleImageChange" />
                      <span>
                        <img
                          src="/icons/image-grey.svg"
                          alt=""
                          class="border border-accent p-2 rounded-md"
                        />
                      </span>
                    </label>
                  </div>

                  <!--  -->

                  <div
                    class="flex gap-5 mt-3 justify-between w-full items-center"
                  >
                    <div class="flex items-center w-full gap-2">
                      <label class="text-accent">Background Color: </label>
                      <input
                        type="color"
                        v-model="qrOptions.backgroundOptions.color"
                      />
                    </div>
                    <div class="flex items-center w-full gap-2">
                      <label class="text-accent">Image Size: </label>
                      <input
                        class="v-input w-[100px]"
                        type="number "
                        v-model="qrOptions.imageOptions.imageSize"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Start of Dot Options -->
            <div>
              <div
                class="py-3 bg-accent-shades px-3 flex justify-between items-center"
              >
                <h3>Dots Options</h3>
                <div class="font-bold text-lg">
                  <p
                    @click="toggleDots"
                    v-if="dots == false"
                    class="cursor-pointer hover:text-info"
                  >
                    +
                  </p>
                  <p
                    @click="toggleDots"
                    v-else
                    class="cursor-pointer hover:text-info"
                  >
                    -
                  </p>
                </div>
              </div>
              <div class="py-5" v-if="dots">
                <div class="gap-4 w-full">
                  <div>
                    <label class="text-accent font-semibold">Patterns: </label>

                    <div class="flex gap-2 pt-2 items-center">
                      <div
                        @click="handlePattern(parttern.name)"
                        v-for="parttern in partterns"
                        :key="parttern"
                      >
                        <div
                          class="w-[40px] sm:w-[50px] md:w-[70px] h-[40px] sm:h-[50px] md:h-[70px] border border-accent cursor-pointer hover:bg-slate-100 rounded-md p-2"
                        >
                          <img
                            :src="parttern.image"
                            alt=""
                            class="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mt-5">
                      <label class="text-accent font-semibold"
                        >Dot Option Colors:
                      </label>
                      <div class="flex gap-3 mt-3 w-full overflow-scroll">
                        <div
                          @click="handlecolorPreset(color)"
                          v-for="color in presetColors"
                          :key="color"
                          :style="{ backgroundColor: color }"
                          class="h-[20px] md:h-[40px] w-[20px] cursor-pointer md:w-[40px] rounded-full border"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- End of Dot Options -->

            <!-- Start of corners style -->

            <div class="mt-3">
              <div
                class="py-3 bg-accent-shades px-3 flex justify-between items-center"
              >
                <h3>Corners Options</h3>
                <div class="font-bold text-lg">
                  <p
                    @click="toggleCorners"
                    v-if="corners == false"
                    class="cursor-pointer hover:text-info"
                  >
                    +
                  </p>
                  <p
                    @click="toggleCorners"
                    v-else
                    class="cursor-pointer hover:text-info"
                  >
                    -
                  </p>
                </div>
              </div>

              <div v-if="corners" class="mt-5">
                <div class="flex gap-5 items-center">
                  <div>
                    <label class="text-accent">Corner Square Type: </label>
                    <select
                      v-model="qrOptions.cornersSquareOptions.type"
                      class="v-input w-[150px]"
                    >
                      <option value="extra-rounded">Extra-rounded</option>
                      <option value="square">Square</option>
                      <option value="dot">Dot</option>
                    </select>
                  </div>
                  <div>
                    <label class="text-accent">Corners Dot Style: </label>
                    <select
                      v-model="qrOptions.cornersDotOptions.type"
                      class="v-input w-[150px]"
                    >
                      <option value="">None</option>
                      <option value="square">Square</option>
                      <option value="dot">Dot</option>
                    </select>
                  </div>
                </div>

                <div class="mt-3">
                  <div>
                    <label class="text-accent">Corner Dot Color: </label>
                    <div class="flex gap-3 mt-3 w-full overflow-scroll">
                      <div
                        @click="handlecolorDotColor(color)"
                        v-for="color in presetColors"
                        :key="color"
                        :style="{ backgroundColor: color }"
                        class="h-[20px] md:h-[40px] w-[20px] md:w-[40px] rounded-full border"
                      ></div>
                    </div>
                  </div>

                  <!--  -->
                  <div class="mt-5">
                    <label class="text-accent">Corner Square Color: </label>

                    <div class="flex gap-3 mt-3 w-full overflow-scroll">
                      <div
                        @click="handleCornerSquare(color)"
                        v-for="color in presetColors"
                        :key="color"
                        :style="{ backgroundColor: color }"
                        class="h-[20px] md:h-[40px] w-[20px] md:w-[40px] rounded-full border"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- QR code preview -->
          <div class="w-full md:w-[40%] h-[300px]">
            <div v-if="loading">Loading...</div>
            <div
              v-else
              class="mx-auto flex justify-center"
              :id="'preview-container'"
            ></div>

            <!-- Download Button -->
            <div>
              <button
                @click="updateQrCode"
                class="btnn-sm px-5 md:px-10 flex gap-2 items-center justify-center mx-auto mt-3"
              >
                <span v-if="onLoading"><LoadingSpinner :color="'info'" /></span>
                Create your code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineProps, defineEmits, nextTick } from "vue";
import LoadingSpinner from "@/components/actions/LoadingSpinner.vue";
import QRCodeStyling from "qr-code-styling";

const emit = defineEmits(["onClose", "onSave", "getQr"]);

const props = defineProps({
  qrCodeData: Object, // QR Code styling data to be passed as prop
  onLoading: Boolean,
});

const isLoading = ref(false);
const loading = ref(false);
const dots = ref(false);
const corners = ref(false);
const qrOptions = ref(props.qrCodeData?.qr_style);

const qrCodeInstance = ref<QRCodeStyling | null>(null);

const partterns: any = ref([
  {
    name: "square",
    image: "/images/square.png",
  },
  {
    name: "dots",
    image: "/images/dots.png",
  },
  {
    name: "rounded",
    image: "/images/rounded.png",
  },
  {
    name: "classy",
    image: "/images/classy.png",
  },
  {
    name: "classy-rounded",
    image: "/images/classy-rounded.png",
  },
  {
    name: "extra-rounded",
    image: "/images/classy-extra.png",
  },
]);

const presetColors: any = ref([
  "#000000",
  "#DE3121",
  "#EF8000",
  "#198639",
  "#229CE0",
  "#2A5BD7",
  "#6B52D1",
  "#D84280",
]);

// Function to input image to Qrcode
const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      qrOptions.value.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const handlePattern = (item: string) => {
  qrOptions.value.dotsOptions.type = item;
};
const handlecolorPreset = (item: string) => {
  qrOptions.value.dotsOptions.color = item;
};
const handlecolorDotColor = (item: string) => {
  qrOptions.value.cornersDotOptions.color = item;
};
const handleCornerSquare = (item: string) => {
  qrOptions.value.cornersSquareOptions.color = item;
};

const toggleDots = () => {
  dots.value = !dots.value;
};
const toggleCorners = () => {
  corners.value = !corners.value;
};

// Function to close the modal
const closeModal = () => {
  emit("close");
};

// Function to update QR code and emit event
const updateQrCode = () => {
  isLoading.value = true;
  if (!props.qrCodeData.category) {
    console.error("Category is required but missing in qrCodeData.");
    return;
  }
  // Here you can add any logic to handle QR code updates if necessary
  emit("onSave", { id: props.qrCodeData.id, updatedData: props?.qrCodeData });
  isLoading.value = false;
};

// Watch for changes in the QR options and update the QR code preview
watch(
  qrOptions,
  () => {
    if (qrCodeInstance.value) {
      qrCodeInstance.value.update({
        category: props.qrCodeData?.category,
        data: props?.qrCodeData?.short_url,
        ...qrOptions.value,
      });
    }
  },
  { deep: true }
);

// Initialize the QR code when the component is mounted
onMounted(() => {
  if (props.qrCodeData?.short_url) {
    nextTick(() => {
      qrCodeInstance.value = new QRCodeStyling({
        category: props.qrCodeData?.category,
        width: 200,
        height: 200,
        data: props.qrCodeData?.short_url || "default-url", // Add fallback
        ...qrOptions.value,
      });

      const previewContainer = document.getElementById("preview-container");
      if (previewContainer && qrCodeInstance.value) {
        qrCodeInstance.value.append(previewContainer);
      }
    });
  } else {
    console.error("QR code data is undefined or missing");
  }
});
</script>

<style scoped>
/* Add modal styles here */
</style>
