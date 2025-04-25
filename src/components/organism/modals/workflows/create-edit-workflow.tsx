import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import Modal from "@/components/atoms/ui/modal/modal";
import { WorkflowForm } from "@/components/molecules/forms/workflow/workflow-form";

function CreateEditWorkflow({
  showWorkflowModal,
  setShowWorkflowModal,
}: {
  showWorkflowModal: boolean;
  setShowWorkflowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const trigger = <div />;

  return (
    <Modal
      trigger={trigger}
      visible={showWorkflowModal}
      onCancel={() => setShowWorkflowModal(false)}
      headerText="Create a new Workflow"
      headerClassName="font-medium"
      description="Start automating your work"
      size="medium"
    >
      <div className="overflow-y-auto flex-1 overflow-x-hidden p-4">
        <WorkflowForm />
      </div>
    </Modal>
  );
}

export function useCreateEditWorkflow() {
  const [showWorkflowModal, setShowWorkflowModal] = useState<boolean>(false);

  const ShowWorkflowModalCallback = useCallback(() => {
    return (
      <CreateEditWorkflow
        showWorkflowModal={showWorkflowModal}
        setShowWorkflowModal={setShowWorkflowModal}
      />
    );
  }, [showWorkflowModal, setShowWorkflowModal]);

  return useMemo(
    () => ({
      setShowWorkflowModal,
      WorkflowModal: ShowWorkflowModalCallback,
    }),
    [setShowWorkflowModal, ShowWorkflowModalCallback]
  );
}
