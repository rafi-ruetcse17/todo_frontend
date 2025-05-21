import { apiServer } from "@/config";
import StorageKeys from "@/lib/enum/StorageKeys";
import axios from "axios";

const API = axios.create({ baseURL: apiServer });

API.interceptors.request.use((req) => {
  return req;
});

API.interceptors.response.use((res) => {
  const result = res.data || {};
  
  if (result.accessToken) {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, result.accessToken);
  }

  if (result.refreshToken) {
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, result.refreshToken);
  }
  return res;
});

export const logIn = (formData) => API.post("/auth/login", formData);
