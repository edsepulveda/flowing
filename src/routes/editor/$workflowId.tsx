import { createFileRoute } from "@tanstack/react-router";
import { WorkflowEditor } from "@/components/organism/editor/workflow-editor";
import { getUserWorkflowData } from "@/services/workflows/queries";

export const Route = createFileRoute("/editor/$workflowId")({
  component: WorkflowPage,
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(
      getUserWorkflowData(params.workflowId)
    );

    return data;
  },
});

function WorkflowPage() {
  const workflow = Route.useLoaderData()


  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="flex-1 h-full">
        <WorkflowEditor workflow={workflow} />
      </div>
    </div>
  );
}