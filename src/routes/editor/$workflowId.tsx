import { Button } from "@/components/atoms/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ReactFlow, Background, Controls, Panel } from "@xyflow/react";
import { PanelBottom, XIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export const Route = createFileRoute("/editor/$workflowId")({
  component: WorkflowPage,
});

function WorkflowPage() {
  const { workflowId } = Route.useParams();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setShowSidebar((prev) => !prev);
  }, []);

  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="flex-1 h-full">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
          <Panel position="top-right">
            <Button
              onClick={toggleSidebar}
              size="icon"
              className="toggle/group size-10"
            >
              <PanelBottom className="size-4" />
            </Button>
          </Panel>
        </ReactFlow>
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
