import type { WorkflowsResponse } from "@/services/workflows/types";
import { CardGrid } from "./card-grid";
import WorkflowCard from "./workflow-card";
import { WorkflowIcon } from "lucide-react";

export const WorkflowList = ({
  workflows,
}: {
  workflows: WorkflowsResponse;
}) => {
  const handleEdit = (id: string) => {
    console.log("Edit clicked", id);
  };

  return (
    <CardGrid>
      {workflows.items.map((workflow) => (
        <WorkflowCard
          key={workflow.id}
          workflowId={workflow.id}
          title={workflow.name}
          description={workflow.description}
          icon={WorkflowIcon}
          onEdit={() => handleEdit(workflow.id)}
          date={new Date(workflow.createdAt)}
          isDraft={workflow.status === "DRAFT"}
        />
      ))}
    </CardGrid>
  );
};
