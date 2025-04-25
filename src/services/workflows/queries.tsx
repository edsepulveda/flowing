import { useQuery } from "@tanstack/react-query";
import type { WorkflowsResponse } from "./types";
import { apiClient } from "../config/request";
import { delay } from "../config/utils";

export function useGetWorkflows() {
  return useQuery<WorkflowsResponse[]>({
    queryKey: ["workflows"],
    queryFn: async () => {
      await delay(1500)

      const { data } = await apiClient.get("workflows");
      return data;
    },
  });
}
