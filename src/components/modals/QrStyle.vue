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
        <!-- Form for QR Code customization -->
        <div class="flex flex-col md:flex-row gap-10">
          <div class="w-full md:w-[60%]">
            <h3 class="font-bold text-info">Main Options</h3>
            <div class="py-5">
              <div class="grid grid-cols-2 gap-4 w-full">
                <div>
                  <label class="text-accent">Width: </label>

                  <select v-model="form.width" class="v-input w-[100px]">
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                  </select>
                </div>

                <div>
                  <label class="text-accent">Height: </label>
                  <select v-model="form.height" class="v-input w-[100px]">
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
                        v-model="form.backgroundOptions.color"
                      />
                    </div>
                    <div class="flex items-center w-full gap-2">
                      <label class="text-accent">Image Size: </label>
                      <input
                        class="v-input w-[100px]"
                        type="number "
                        v-model="form.imageOptions.imageSize"
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
                      v-model="form.cornersSquareOptions.type"
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
                      v-model="form.cornersDotOptions.type"
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
              id="canvas-container"
            ></div>

            <!-- Download Button -->
            <div>
              <button
                @click="handlePostQrCode"
                class="btnn-sm px-5 md:px-10 flex gap-2 items-center justify-center mx-auto mt-3"
              >
                <span v-if="onloading"><LoadingSpinner :color="'info'" /></span>
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
import { ref, onMounted, watch, defineProps, defineEmits, PropType } from "vue";
import QRCodeStyling from "qr-code-styling";
import { postQrCode } from "@/services/qrcode.service";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import LoadingSpinner from "@/components/actions/LoadingSpinner.vue";

// Getting datas from props
const props = defineProps({
  initialData: Object as PropType<{ data: string }>,
});

// Emitting event
const emit = defineEmits(["close"]);

//  Datas
const toast = useToast();
const router = useRouter();
const dots = ref(false);
const corners = ref(false);
const onloading = ref(false);
const loading = ref(false);
const qrCode: any = ref<QRCodeStyling | null>(null);
const downloadLink: any = ref<string | null>(null);
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

const formData: any = ref({
  data: "https://qr-code-styling.com/",
});
const form: any = ref({
  width: 200,
  height: 200,

  image: null,
  margin: 0,
  qrOptions: {
    typeNumber: "5",
    mode: "Byte",
    errorCorrectionLevel: "H",
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.5,
    margin: 4,
  },
  dotsOptions: {
    type: "square",
    color: "#000000",
    gradient: null,
  },
  backgroundOptions: {
    color: "#ffffff",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: "#000000",
  },
  cornersDotOptions: {
    type: "",
    color: "#000000",
  },
});

const handlePattern = (item: string) => {
  form.value.dotsOptions.type = item;
};
const handlecolorPreset = (item: string) => {
  form.value.dotsOptions.color = item;
};
const handlecolorDotColor = (item: string) => {
  form.value.cornersDotOptions.color = item;
};
const handleCornerSquare = (item: string) => {
  form.value.cornersSquareOptions.color = item;
};

onMounted(() => {
  qrCode.value = new QRCodeStyling({
    width: form.value.width,
    height: form.value.height,
    data: formData.value.data,
    dotsOptions: form.value.dotsOptions,
    backgroundOptions: form.value.backgroundOptions,
    cornersSquareOptions: form.value.cornersSquareOptions,
    cornersDotOptions: form.value.cornersDotOptions,
    imageOptions: form.value.imageOptions,
    qrOptions: form.value.qrOptions,
  });

  if (qrCode.value) {
    loading.value = true;
    qrCode.value.append(document.getElementById("canvas-container"));
    loading.value = false;
  }
});

watch(
  () => form.value,
  () => {
    updateQRCode();
  },
  { deep: true }
);

// Function to input image to Qrcode
const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      form.value.image = reader.result as string;
      updateQRCode();
    };
    reader.readAsDataURL(file);
  }
};

// Function to download Qrcode link
const updateDownloadLink = async () => {
  if (qrCode.value) {
    const blob = await qrCode.value.getRawData("png");
    downloadLink.value = URL.createObjectURL(blob);
  }
};

const updateQRCode = () => {
  if (qrCode.value) {
    loading.value = true;
    qrCode.value.update({
      width: form.value.width,
      height: form.value.height,
      data: formData.value.data,
      image: form.value.image,
      dotsOptions: form.value.dotsOptions,
      backgroundOptions: form.value.backgroundOptions,
      cornersSquareOptions: form.value.cornersSquareOptions,
      cornersDotOptions: form.value.cornersDotOptions,
      imageOptions: form.value.imageOptions,
      qrOptions: form.value.qrOptions,
    });
    updateDownloadLink();
    loading.value = false;
  }
};

const handlePostQrCode = async () => {
  onloading.value = true;
  const result = await postQrCode({
    title: props?.initialData?.title,
    url: props?.initialData?.items,
    category: props?.initialData?.category,
    qr_style: form.value,
  });
  if (!result.error) {
    toast.success(result.data.message);
    emit("close");
    router.push("/admin/qrcode");
    onloading.value = false;
  } else {
    toast.error(result.error.message);
    onloading.value = false;
  }
};

const toggleDots = () => {
  dots.value = !dots.value;
};
const toggleCorners = () => {
  corners.value = !corners.value;
};
const closeModal = () => {
  emit("close");
};
</script>
