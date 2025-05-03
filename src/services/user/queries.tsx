import { apiClient } from "../config/request";
import type { UsersResponse } from "./types";

export const getUser = async () => {
  const { data } = await apiClient.get<UsersResponse>(`/users/me`);
  return data;
};