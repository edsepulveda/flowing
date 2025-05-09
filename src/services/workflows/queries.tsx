import { queryOptions, useQuery } from "@tanstack/react-query";
import type {
  PaginatedWorkflows,
  WorkflowItemData,
  WorkflowListParams,
  WorkflowsResponse,
} from "./types";
import { apiClient } from "../config/request";

const getUserWorkflows = async (params: WorkflowListParams) => {
  const { page = 1, size = 10, filter = {} } = params;

  const queryParams = {
    page,
    size,
    ...filter,
  };

  const { data } = await apiClient.get<PaginatedWorkflows>("workflows", {
    params: {
      queryParams,
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
    staleTime: Infinity,
  });
};

export const getWorkflowData = (params: WorkflowListParams) => {
  return queryOptions<WorkflowsResponse>({
    queryKey: ["workflows"],
    queryFn: () => getUserWorkflows(params),
  });
};

export function useGetWorkflows(params: WorkflowListParams) {
  return useQuery<WorkflowsResponse>({
    queryKey: ["workflows"],
    queryFn: () => getUserWorkflows(params),
  });
}
