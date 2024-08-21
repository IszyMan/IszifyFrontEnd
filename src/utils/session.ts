import { useRouter } from "vue-router";

export const getStorageData = () => {
  const storageData: any = sessionStorage.getItem("sessionData");
  const data = JSON.parse(storageData) || {};
  return data;
};

export const session = {
  get: (key: string) => {
    const data: any = sessionStorage.getItem(key);
    return JSON.parse(data);
  },

  set: (key: string, data: any) => {
    return sessionStorage.setItem(key, JSON.stringify(data));
  },

  clear: () => {
    return sessionStorage.clear();
  },
  logout: () => {
    sessionStorage.clear();
    window.location.reload();
  },
  exists: (key: string) => {
    const data = sessionStorage.getItem(key);
    if (data) {
      return true;
    } else {
      return false;
    }
  },
};

// Function to change string to capitalize
export const toTitleCase = (value: string) => {
  value = value.toLowerCase();
  const splitted = value.split("");
  const first = splitted.shift()?.toUpperCase();
  return first + splitted.join("");
};
