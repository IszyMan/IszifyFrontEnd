import { axiosPost, axiosPatch } from "./authRequest.service";

// Login Admin
export const signin = async (data: any) => {
  return await axiosPost("auth/login", data);
};
// Login Admin
export const register = async (data: any) => {
  return await axiosPost("auth/register", data);
};
// Login Admin
export const verifyAccount = async (data: any) => {
  return await axiosPatch("auth/verify-account", data);
};

// forgot Password
export const resendOTP = async (data: any) => {
  return await axiosPost(`auth/resend-otp`, data);
};
// forgot Password
export const forgotPassword = async (data: any) => {
  return await axiosPatch(`auth/forgot-password-request`, data);
};

// Reset forgot Password
export const resetForgotPassword = async (id: any, data: any) => {
  return await axiosPatch(`auth/reset-password/${id}`, data);
};

// Reset change Password
export const changeAdminPassword = async (data: any) => {
  return await axiosPost(`auth/change_password`, data);
};
