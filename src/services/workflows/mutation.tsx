import { useQueryClient, useMutation } from "@tanstack/react-query";
import type {
  WorkflowsDTO,
  WorkflowsResponse,
  UpdateWorkflowDTO,
  WorkflowItemData,
} from "./types";
import { apiClient } from "../config/request";
import { delay } from "../config/utils";
import { toast } from "sonner";
import { showCustomToast } from "@/components/atoms/ui/custom-toast";
import { useRouter } from "@tanstack/react-router";

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation<WorkflowItemData, object, WorkflowsDTO>({
    mutationFn: async ({ name, description, metadata }) => {
      await delay(1500);

      const { data } = await apiClient.post<WorkflowItemData>("workflows", {
        name,
        description,
        metadata,
      });

      return data;
    },
    onSuccess: () => {
      showCustomToast({
        type: "success",
        title: "Workflow Created",
      });

      queryClient.invalidateQueries({
        queryKey: ["workflows"],
      });
    },
  });
};

export const useEditWorkflow = () => {
  const router = useRouter();
  return useMutation<object, object, Partial<UpdateWorkflowDTO>>({
    mutationFn: async ({ id, name, description, metadata }) => {
      await delay(1500);

      const { data } = await apiClient.patch<WorkflowsResponse>(
        `workflows/${id}`,
        { name, description, metadata }
      );
      return data;
    },
    onSuccess: () => {
      router.invalidate();
      toast.success("Workflow saved", { id: "save-workflow" });
    },
    onError(error) {
      console.log(error);
      toast.error("An Error ocurred when saving the workflow", {
        id: "save-workflow",
      });
    },
  });
};
