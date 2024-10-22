import {
  axiosGet,
  axiosPost,
  axiosPatch,
  axiosDelete,
} from "./request.service";

//
export const getAllqrCategorys = async () => {
  return await axiosGet("qr_code/qrcode-categories");
};
//
export const getAllQrCodes = async () => {
  return await axiosGet("qr_code/qrcode");
};
//
export const postQrCode = async (data: any) => {
  return await axiosPost("qr_code/qrcode", data);
};

//
export const getUpdateQrCode = async (id: any) => {
  return await axiosGet(`qr_code/qrcode/${id}`);
};
//
export const updateQrCode = async (id: any, data) => {
  return await axiosPatch(`qr_code/qrcode/${id}`, data);
};
//
export const getStyleQrCode = async (id: any) => {
  return await axiosGet(`qr_code/style_qrcode/${id}`);
};
export const deleteSingleQrcode = async (id: any) => {
  return await axiosDelete(`qr_code/delete_qrcode/${id}`, id);
};
//
export const postStyleQrCode = async (id: any, data: any) => {
  return await axiosPost(`qr_code/style_qrcode/${id}`, data);
};
