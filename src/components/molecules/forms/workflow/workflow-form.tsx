import { Button } from "@/components/atoms/ui/button";
import { FormControl } from "@/components/atoms/ui/form/form-control";
import { Input } from "@/components/atoms/ui/input";
import { Workflow } from "lucide-react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@/components/atoms/ui/textarea";
import { useCreateWorkflow } from "@/services/workflows/mutation";
import { TaskType, type AppNode } from "@/types/node";
import type { Edge } from "@xyflow/react";
import { createNode } from "@/lib/workflow/createNode";

const workflowSchema = z.object({
  name: z.string().min(1).trim(),
  description: z.string().optional(),
});

type FormSchema = z.infer<typeof workflowSchema>;

export const WorkflowForm = () => {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "all",
  });

  const { mutateAsync, isPending } = useCreateWorkflow();

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
      nodes: [],
      edges: [],
    };

    initialFlow.nodes.push(createNode(TaskType.BROWSER));

    await mutateAsync({
      ...data,
      metadata: JSON.stringify(initialFlow),
    });
    
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormControl
              label="Name"
              isRequired
              isError={Boolean(methods.formState.errors.name)}
              errorText={methods.formState.errors.name?.message}
            >
              <Input {...field} placeholder="Name of the workflow" />
            </FormControl>
          )}
        />
        <Controller
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormControl
              label="Description"
              isOptional
              isError={Boolean(methods.formState.errors.description)}
              errorText={methods.formState.errors.description?.message}
              helperText="This is optional but can help the AI to understand the context in a better way"
            >
              <TextArea
                {...field}
                placeholder="Description of the workflow"
                reSize="none"
              />
            </FormControl>
          )}
        />
      </div>

      <div className="flex justify-end pt-5 pb-2.5">
        <Button type="submit" startIcon={Workflow} loading={isPending}>
          Create workflow
        </Button>
      </div>
    </form>
  );
};
