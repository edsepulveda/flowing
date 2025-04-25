import { useQueryClient, useMutation } from "@tanstack/react-query";
import type {
  WorkflowsDTO,
  WorkflowsResponse,
  UpdateWorkflowDTO,
} from "./types";
import { apiClient } from "../config/request";
import { delay } from "../config/utils";

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation<object, object, WorkflowsDTO>({
    mutationFn: async ({ name, description }) => {
      //For now we delay the request until we have a backend
      await delay(1500);

      const { data } = await apiClient.post<WorkflowsResponse>("workflows", {
        name,
        description,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflows"],
      });
    },
  });
};

export const useEditWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation<object, object, UpdateWorkflowDTO>({
    mutationFn: async ({ id, name, description }) => {
      //For now we delay the request until we have a backend
      await delay(1500);
      
      const { data } = await apiClient.patch<WorkflowsResponse>(
        `workflows/${id}`,
        { name, description }
      );
      return data;
    },
    onSuccess: (_, { id }) => {
      //Only invalidate the workflow that we just edited
      queryClient.invalidateQueries({
        queryKey: ["workflows", id],
      });
    },
  });
};
