import { Button } from "@/components/atoms/ui/button";
import { EmptyState } from "@/components/molecules/empty-state";
import { useCreateEditWorkflow } from "@/components/organism/modals/workflows/create-edit-workflow";
import { createFileRoute } from "@tanstack/react-router";
import { Layers2, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/workflows/")({
  component: RouteComponent,
  loader: () => ({
    crumb: "Workflows",
  }),
});

function RouteComponent() {
  const { WorkflowModal, setShowWorkflowModal } = useCreateEditWorkflow();

  return (
    <>
      <WorkflowModal />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">
            You can see your workflows here
          </p>

          <EmptyState
            title="No Workflows found"
            description="Create one workflow from scratch"
            icon={Layers2}
            addButton={
              <Button
                startIcon={Plus}
                onClick={() => {
                  setShowWorkflowModal(true);
                }}
              >
                Create Workflow
              </Button>
            }
          />
        </div>
      </div>
    </>
  );
}
