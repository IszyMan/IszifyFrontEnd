<template>
  <section class="p-5 md:p-10 min-h-screen">
    <div class="flex gap-2 items-center">
      <img src="/icons/logo.svg" alt="" />
      <h1 class="text-xl font-extrabold text-black">ISZIFY</h1>
    </div>
    <div
      class="w-full md:w-[600px] card shadow-md mt-20 px-3 mx-auto flex items-center h-full"
    >
      <div class="w-[600px]">
        <router-link to="/">
          <div class="flex gap-2">
            <img src="/icons/chevron-left-grey.svg" alt="" /></div
        ></router-link>
        <div class="relative mt-5 p-5 pb-10 rounded-lg">
          <div class="mt-5 md:mt-10">
            <h3 class="text-center text-2xl text-primary font-bold">
              OTP VERIFICATION
            </h3>
            <h4
              class="text-sm md:text-base 2xl:text-lg pt-5 font-bold my-4 text-center"
            >
              Enter the otp code sent to your email to verify your account
            </h4>
          </div>

          <div class="">
            <form @submit.prevent class="">
              <div>
                <label
                  class="text-xs md:text-sm 2xl:text-lg mb-8 text-grey-shades flex justify-center"
                  >Please enter your token code</label
                >
                <div
                  class="grid grid-cols-6 gap-4 w-full md:w-[70%] items-center mx-auto justify-center"
                  style=""
                >
                  <input
                    type="text"
                    tabindex="1"
                    maxlength="1"
                    id="basic_old1"
                    v-model="getAllpinvalue.input1"
                    class="pin md:w-12 md:h-12 xs:w-10 p-0 xs:h-10 w-8 h-8 rounded-lg border border-accent text-center font-bold text-2xl bg-white"
                  />

                  <input
                    type="text"
                    tabindex="2"
                    maxlength="1"
                    id="basic_old2"
                    v-model="getAllpinvalue.input2"
                    class="pin md:w-12 md:h-12 xs:w-10 xs:h-10 p-0 w-8 h-8 rounded-lg border border-accent text-center font-bold text-2xl bg-white"
                  />

                  <input
                    type="text"
                    maxlength="1"
                    tabindex="3"
                    id="basic_old3"
                    v-model="getAllpinvalue.input3"
                    class="pin md:w-12 md:h-12 xs:w-10 xs:h-10 w-8 p-0 h-8 rounded-lg border border-accent text-center font-bold text-2xl bg-white"
                  />

                  <input
                    type="text"
                    maxlength="1"
                    tabindex="4"
                    id="basic_old4"
                    v-model="getAllpinvalue.input4"
                    class="pin md:w-12 md:h-12 xs:w-10 xs:h-10 p-0 w-8 h-8 rounded-lg border border-accent text-center font-bold text-2xl bg-white"
                  />
                  <input
                    type="text"
                    maxlength="1"
                    tabindex="5"
                    id="basic_old5"
                    v-model="getAllpinvalue.input5"
                    class="pin md:w-12 md:h-12 xs:w-10 xs:h-10 p-0 w-8 h-8 rounded-lg border border-accent text-center font-bold text-2xl bg-white"
                  />
                  <input
                    type="text"
                    maxlength="1"
                    tabindex="5"
                    id="basic_old6"
                    v-model="getAllpinvalue.input6"
                    class="pin md:w-12 md:h-12 xs:w-10 xs:h-10 p-0 w-8 h-8 rounded-lg border border-accent text-center font-bold text-2xl bg-white"
                  />
                </div>
                <div class="flex w-full mt-10">
                  <button
                    :disabled="!isValid"
                    @click="handleVerifyAcc"
                    @keydown.enter.once="handleVerifyAcc"
                    class="w-full rounded-md text-white md:h-10 h-8 text-sm md:text-base font-bold p-2 border-0 focus:bg-info-shades flex justify-center items-center gap-2"
                    type="button"
                    :class="
                      !isValid
                        ? 'bg-accent-shades cursor-not-allowed'
                        : 'bg-info hover:bg-info-tint hover:text-info cursor-pointer'
                    "
                  >
                    <span v-if="loading"><LoadingSpinner /> </span>
                    <span>Proceed</span>
                  </button>
                </div>

                <div class="text-center mt-5 text-xs md:text-sm 2xl:text-base">
                  <span>Click the resend button if you did not get Token</span>
                  <button
                    class="font-bold underline text-sm md:text-base underline-offset-1 ml-2 cursor-pointer hover:text-primary text-success"
                    @click="handleResend"
                  >
                    Resend
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { verifyAccount, resendOTP } from "@/services/auth.service";
import { session, getStorageData } from "@/utils";
import { useToast } from "vue-toastification";
import LoadingSpinner from "@/components/actions/LoadingSpinner.vue";
export default defineComponent({
  name: "VerifyAccount",
  components: {
    LoadingSpinner,
  },
  emits: ["close-account"],
  setup(props, context) {
    const toast = useToast();
    const store = useAuthStore();
    const loading = ref(false);
    const isLoading = ref(false);
    const router = useRouter();
    const inputType = ref("password");
    const newPass = ref(false);

    const getAllpinvalue = reactive({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
    });

    const isValid = computed(() => {
      return (
        getAllpinvalue.input1 !== "" &&
        getAllpinvalue.input2 !== "" &&
        getAllpinvalue.input3 !== "" &&
        getAllpinvalue.input4 !== "" &&
        getAllpinvalue.input5 !== "" &&
        getAllpinvalue.input6 !== ""
      );
    });

    const initialize = () => {
      getAllpinvalue.input1 == "",
        getAllpinvalue.input2 == "",
        getAllpinvalue.input3 == "",
        getAllpinvalue.input4 == "",
        getAllpinvalue.input5 == "",
        getAllpinvalue.input6 == "";
    };

    const closeModal = () => {
      context.emit("close-account");
    };

    const clickOldPass = () => {
      newPass.value = true;
    };

    //method to switch the input key
    setTimeout(() => {
      const elts = document.getElementsByClassName("pin");
      Array.from(elts).forEach((elt: any, index) => {
        elt.addEventListener("keyup", (event: any) => {
          console.log(event.keyCode);
          if (event.keyCode === 6 && index > 0) {
            elt.previousElementSibling.focus();
          }
          if (elt.value.length == 1 && index < 5 && event.keyCode !== 8) {
            console.log(elt.nextElementSibling);
            elt.nextElementSibling.focus();
          }
          if (event.keyCode === 8 && index > 0) {
            elt.previousElementSibling.focus();
          }
          if (index < 6) {
            console.log("input", concatpinInput());
          }
        });
      });
    }, 1000);

    const concatpinInput = () => {
      return (
        getAllpinvalue.input1 +
        getAllpinvalue.input2 +
        getAllpinvalue.input3 +
        getAllpinvalue.input4 +
        getAllpinvalue.input5 +
        getAllpinvalue.input6
      );
    };

    const handleVerifyAcc = async () => {
      loading.value = true;
      const response = await verifyAccount({
        otp: concatpinInput(),
        email: getStorageData().email,
      });
      if (!response.error) {
        session.set("sessionData", {
          access_token: response?.data?.access_token,
        });
        initialize();
        toast.error(response?.data?.message);
        window.location.href = "/dashboard";
        loading.value = false;
      } else {
        toast.error(
          response.error.message || "An error occured: Please try again"
        );
        loading.value = false;
      }
    };

    // Function to handle resend token
    const handleResend = async () => {
      isLoading.value = true;
      const response = await resendOTP({
        email: getStorageData().email,
      });
      if (!response.error) {
        isLoading.value = false;
        toast.success(response?.data?.msg || "Email sent successfully");
      } else {
        toast.error(response.error.msg || "An error occured: Please try again");
        isLoading.value = false;
      }
    };

    return {
      closeModal,
      inputType,
      handleResend,
      loading,
      newPass,
      clickOldPass,
      getAllpinvalue,
      handleVerifyAcc,
      isValid,
    };
  },
});
</script>

<style scoped></style>
