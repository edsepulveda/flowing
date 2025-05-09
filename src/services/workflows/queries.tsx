import { queryOptions, useQuery } from "@tanstack/react-query";
import type { WorkflowItemData, WorkflowsResponse } from "./types";
import { apiClient } from "../config/request";

const getWorkflows = async () => {
  const { data } = await apiClient.get("workflows", {
    params: {
      page: 1,
      size: 10,
      limit: 10,
      offset: 0,
    },
  });
  return data;
};

const getWorkflowById = async (id: string) => {
  const { data } = await apiClient.get<WorkflowItemData>(`workflows/${id}`);

  return data;
};

export const getUserWorkflowData = (id: string) => {
  return queryOptions({
    queryKey: ["user_workflow", id],
    queryFn: () => getWorkflowById(id),
    staleTime: Infinity
  });
};

export const getWorkflowData = () => {
  return queryOptions<WorkflowsResponse>({
    queryKey: ["workflows"],
    queryFn: getWorkflows,
  });
};

export function useGetWorkflows() {
  return useQuery<WorkflowsResponse>({
    queryKey: ["workflows"],
    queryFn: getWorkflows,
  });
}
