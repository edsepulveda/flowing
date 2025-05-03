import { Button } from "@/components/atoms/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ReactFlowProvider } from "@xyflow/react";
import { WorkflowEditor } from "@/components/organism/editor/workflow-editor";
import WorkflowTopbar from "@/components/molecules/workflows/top-bar";
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
  const [showSidebar, setShowSidebar] = useState(false);
  const data = Route.useLoaderData();

  const toggleSidebar = useCallback(() => {
    setShowSidebar((prev) => !prev);
  }, []);

  return (
    <ReactFlowProvider>
      <div className="h-full w-full flex overflow-hidden">
        <div className="flex-1 h-full">
          <WorkflowEditor onPanelClick={toggleSidebar} />
        </div>

        <AnimatePresence>
          {showSidebar && (
            <motion.div
              className="w-64 h-full border-l bg-background p-4 overflow-auto"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Available Nodes</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSidebar(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
              <NodeSelector />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ReactFlowProvider>
  );
}

const NodeSelector = () => (
  <div className="space-y-2">
    <motion.div
      className="p-2 border rounded cursor-pointer hover:bg-accent"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Input Node
    </motion.div>
    <motion.div
      className="p-2 border rounded cursor-pointer hover:bg-accent"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Process Node
    </motion.div>
    <motion.div
      className="p-2 border rounded cursor-pointer hover:bg-accent"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Output Node
    </motion.div>
    <motion.div
      className="p-2 border rounded cursor-pointer hover:bg-accent"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Decision Node
    </motion.div>
  </div>
);
