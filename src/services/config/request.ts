import type { QueryClient } from "@tanstack/react-query";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setupAuthHeader = () => {
  const token = Cookies.get("accessToken");
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

setupAuthHeader();

export const setupAuthProviderInterceptor = (queryClient: QueryClient) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig<{ _retry: boolean }>;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { data } = await apiClient.post("/auth/refresh");

          Cookies.set("accessToken", data.accessToken);

          if (queryClient && data.expiresIn) {
            const refreshMutation = queryClient.getMutationCache();

            const findRefreshMutation = refreshMutation.find({
              mutationKey: ["auth", "refresh"],
            });

            if (findRefreshMutation && findRefreshMutation.options.onSuccess) {
              findRefreshMutation.options.onSuccess(data, null, null);
            }
          }

          apiClient.defaults.headers.common["Authorization"] =
            `Bearer ${data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          return apiClient(originalRequest);
        } catch (error) {
          Cookies.remove("accessToken");
          localStorage.removeItem("accessExpiresAt");

          delete apiClient.defaults.headers.common["Authorization"];

          window.location.href = "/auth/login";
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
};
