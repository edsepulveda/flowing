import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../config/request";
import type {
  EmailLoginUserDto,
  RefreshTokenDto,
  RegisterUserDto,
  TokenResponseDto,
} from "./types";
import Cookies from "js-cookie";
import { setupRefreshToken, tokenExpirationTime } from "./utils";
import { delay } from "../config/utils";
import { showCustomToast } from "@/components/atoms/ui/custom-toast";
import type { AxiosError } from "axios";

const registerUser = async (
  registerData: RegisterUserDto
): Promise<TokenResponseDto> => {
  const { data } = await apiClient.post("/auth/register", registerData);
  return data;
};

const loginUser = async (
  loginData: EmailLoginUserDto
): Promise<TokenResponseDto> => {
  await delay(1500);
  const { data } = await apiClient.post("/auth/login", loginData);
  return data;
};

const refreshToken = async (
  refreshData: RefreshTokenDto
): Promise<TokenResponseDto> => {
  const { data } = await apiClient.post("/auth/refresh", refreshData);
  return data;
};

const logout = async (): Promise<{ success: boolean }> => {
  const { data } = await apiClient.post("/auth/logout");
  return data;
};

export const validateToken = async (): Promise<{ valid: boolean }> => {
  const { data } = await apiClient.get("/auth/validate");
  return data;
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: registerUser,
    onSuccess: (data) => {
      Cookies.set("accessToken", data.accessToken);

      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${data.accessToken}`;

      setupRefreshToken(data.expiresIn, queryClient, data.refreshExpiresIn);
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: loginUser,
    onSuccess: (data) => {
      Cookies.set("accessToken", data.accessToken);

      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${data.accessToken}`;

      setupRefreshToken(data.expiresIn, queryClient, data.refreshExpiresIn);
    },
    onError: (error) => {
      const errorDetails = error as AxiosError<{
        message: string;
        errorCode: string;
      }>;

      showCustomToast({
        title: errorDetails.response?.data.errorCode ?? "",
        description: errorDetails.response?.data.message,
        type: "error",
        position: "top-left",
      });
    },
  });
};

export const useRefreshTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "refresh"],
    mutationFn: refreshToken,
    onSuccess: (data) => {
      Cookies.set("accessToken", data.accessToken);

      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${data.accessToken}`;

      setupRefreshToken(data.expiresIn, queryClient, data.refreshExpiresIn);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: logout,
    onSuccess: () => {
      if (tokenExpirationTime) {
        clearTimeout(tokenExpirationTime);
      }

      Cookies.remove("accessToken");
      localStorage.removeItem("accessExpiresAt");
      localStorage.removeItem("refreshExpiresAt");

      delete apiClient.defaults.headers.common["Authorization"];

      queryClient.invalidateQueries();
    },
  });
};

export const useValidateToken = () => {
  return useQuery({
    queryKey: ["auth", "validate"],
    queryFn: validateToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
