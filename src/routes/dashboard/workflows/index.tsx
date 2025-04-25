import { Button } from "@/components/atoms/ui/button";
import {
  Container,
  ContainerSection,
} from "@/components/atoms/ui/layouts/containers";
import { EmptyState } from "@/components/molecules/empty-state";
import { WorkflowList } from "@/components/molecules/workflows/workflow-list";
import { useCreateEditWorkflow } from "@/components/organism/modals/workflows/create-edit-workflow";
import { PageLayout } from "@/components/templates/layouts/page-layout";
import { useGetWorkflows } from "@/services/workflows/queries";
import { createFileRoute } from "@tanstack/react-router";
import { Layers2, Plus, WorkflowIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/workflows/")({
  component: RouteComponent,
  loader: () => ({
    crumb: "Workflows",
    Logo: () => <WorkflowIcon className="w-4 h-4 me-1.5" />,
  }),
});

function RouteComponent() {
  const { WorkflowModal, setShowWorkflowModal } = useCreateEditWorkflow();

  const { data: workflows, isLoading } = useGetWorkflows();
  return (
    <>
      <WorkflowModal />
      <PageLayout
        size="large"
        title="Workflows"
        subtitle="Create and edit yours workflows"
        icon={<WorkflowIcon className="size-7" />}
        primaryAction={
          <Button
            startIcon={Plus}
            onClick={() => {
              setShowWorkflowModal(true);
            }}
          >
            Create Workflow
          </Button>
        }
      >
        <Container size="full">
          <ContainerSection isFullWidth>
            {workflows && !isLoading && <WorkflowList workflows={workflows} />}

            {!workflows && !isLoading && (
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
            )}
          </ContainerSection>
        </Container>
      </PageLayout>
    </>
  );
}
