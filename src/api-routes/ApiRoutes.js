"use client";

import { apiServer } from "@/config";
import StorageKeys from "@/lib/enum/StorageKeys";
import axios from "axios";

const API = axios.create({ baseURL: apiServer });

API.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  req.headers.Authorization = `Bearer ${accessToken}`;
  return req;
});

API.interceptors.response.use((res) => {
  const result = res.data || {};
  if (result.accessToken) {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, result.accessToken);
  }
  return res;
});

export const logIn = (formData) => API.post("/auth/login", formData);

export const signUp = (formData) => API.post("/auth/signup", formData);

export const getUserByEmail = (payload) =>
  API.get("/api/user", { params: { email: payload } });

export const getAllAppsForUser = () => API.get("/api/todo-apps/my-apps");

export const createApp = (payload) =>
  API.post("/api/todo-apps/create", payload);

export const deleteApp = (appId) => API.delete(`/api/todo-apps/${appId}`);

export const inviteUser = (appId, payload) =>
  API.post(`api/todo-apps/invite/${appId}`, payload);

export const createTask = (payload, appId) =>
  API.post(`/api/todo-apps/${appId}/tasks`, payload);

export const getAllTasks = (page, size, appId) =>
  API.get(`/api/todo-apps/${appId}/tasks`, {
    params: { pageNumber: page, pageSize: size },
  });

export const updateTask = (payload, taskId, appId) =>
  API.patch(`/api/todo-apps/${appId}/tasks/${taskId}`, payload);

export const deleteTask = (taskId, appId) =>
  API.delete(`/api/todo-apps/${appId}/tasks/${taskId}`);
