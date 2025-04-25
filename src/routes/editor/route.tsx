import WorkflowLayout from "@/components/templates/layouts/workflow/workflow-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const WorkflowEditorComponent = () => {
  return (
    <WorkflowLayout>
      <Outlet />
    </WorkflowLayout>
  );
};

export const Route = createFileRoute("/editor")({
  component: WorkflowEditorComponent,
});
