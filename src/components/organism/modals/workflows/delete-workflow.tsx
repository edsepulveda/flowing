import { Button } from "@/components/atoms/ui/button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import ConfirmTextModal from "../../patterns/dialogs/confirm-text-dialog";

export const DeleteWorkflowButton = ({
  confirmName,
}: {
  confirmName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="destructive-ghost"
        size="xs"
        className="z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <TrashIcon className="mr-1.5 h-3.5 w-3.5" />
        Delete
      </Button>

      <DeleteProjectModal
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        workflowName={confirmName}
      />
    </>
  );
};

interface DeleteProjectModalProps {
  visible: boolean;
  workflowName: string;
  onClose: () => void;
}

const DeleteProjectModal = ({
  onClose,
  visible,
  workflowName,
}: DeleteProjectModalProps) => {
  return (
    <>
      <ConfirmTextModal
        visible={visible}
        size="medium"
        title="Confirm the deletion of the workflow"
        text="This action is irreversible. Please enter the name of the workflow to confirm deletion."
        confirmString={workflowName}
        confirmPlaceholder="Enter the name of the workflow"
        loading={false}
        onCancel={onClose}
        onConfirm={() => {
          // Handle the deletion logic here
          console.log("Workflow deleted:", workflowName);
          onClose();
        }}
      />
    </>
  );
};
