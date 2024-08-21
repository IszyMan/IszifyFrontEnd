import { session } from "@/utils";
import axios from "axios";
import router from "@/router";

let baseUrl = "";

export const axiosPostPre = async (point: string, data: any) => {
  baseUrl = process.env.VUE_APP_AUTH;
  let options: any;
  if (point.includes("/login")) options = null;

  try {
    const result = await axios.post(baseUrl + point, data, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error: any) {
    if (error.response == undefined) {
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosPost = async (point: string, data: any) => {
  baseUrl = process.env.VUE_APP_AUTH;
  const sessiondata = session.get("sessionData");

  let options: any;
  if (sessiondata) {
    options = {
      headers: {
        Authorization: `Bearer ${sessiondata["access_token"]}`,
      },
    };
  }

  if (point.includes("/login")) options = null;

  try {
    const result = await axios.post(baseUrl + point, data, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error: any) {
    if (error.response == undefined) {
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosPatch = async (point: string, data: any) => {
  baseUrl = process.env.VUE_APP_AUTH;
  const sessiondata = session.get("sessionData");

  let options: any;
  if (sessiondata) {
    options = {
      headers: {
        Authorization: `Bearer ${sessiondata["access_token"]}`,
      },
    };
  }

  if (point.includes("login")) options = null;

  try {
    const result = await axios.patch(baseUrl + point, data, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error: any) {
    if (error.response == undefined) {
      // session.logout()
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosDelete = async (point: string, data: any) => {
  baseUrl = process.env.VUE_APP_AUTH;
  const sessiondata = session.get("sessionData");

  let options: any;
  if (sessiondata) {
    options = {
      headers: {
        Authorization: `Bearer ${sessiondata["access_token"]}`,
      },
    };
  }

  if (point.includes("login")) options = null;

  try {
    const result = await axios.delete(baseUrl + point, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error: any) {
    if (error.response == undefined) {
      // session.logout()
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosGet = async (point: string) => {
  baseUrl = process.env.VUE_APP_AUTH;
  const sessiondata = session.get("sessionData");
  let options: any;
  if (sessiondata) {
    options = {
      headers: {
        Authorization: `Bearer ${sessiondata["access_token"]}`,
      },
    };
  }
  try {
    const result = await axios.get(baseUrl + point, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error: any) {
    if (error.response == undefined) {
      // session.logout()
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};
