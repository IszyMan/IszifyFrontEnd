import { defineStore } from "pinia";

export const useAuthStore = defineStore("counter", {
  state: () => ({
    adminProfile: {} as any,
    reset: false,
    isLoading: false,
    isLoadingReset: false,
    isLoadingForgot: false,

    form: {
      otp: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  }),
  actions: {
    setAdminProfile(profile: any) {
      this.adminProfile = profile;
    },
  },
});
