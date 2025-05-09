import { Button } from "@/components/atoms/ui/button";
import NodeComponent from "@/components/molecules/workflows/nodes/node-component";
import { useTheme } from "@/context/theme-context";
import { useWorkflowDnd } from "@/hooks/use-workflow-dnd";
import type { WorkflowItemData } from "@/services/workflows/types";
import { DndContext, useDroppable } from "@dnd-kit/core";
import {
  ReactFlow,
  BackgroundVariant,
  Background,
  useEdgesState,
  useNodesState,
  Controls,
  Panel,
  useReactFlow,
} from "@xyflow/react";
import { PanelBottom } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { WorkflowNodesSidebar } from "../sidebar/editor-sidebar";

interface WorkflowEditorProps {
  workflow: WorkflowItemData;
  onPanelClick?: () => void;
}

const nodeTypes = {
  Node: NodeComponent,
};

const fitViewOptions = {
  padding: 0.2,
  includeHiddenNodes: false,
  minZoom: 0.1,
  maxZoom: 2,
};

export function WorkflowEditor({
  workflow,
  onPanelClick,
}: WorkflowEditorProps) {
  const { theme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { setNodeRef } = useDroppable({
    id: "react-flow-droppable",
  });

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();

  const { handleAddNode, handleDragEnd } = useWorkflowDnd();

  useEffect(() => {
    try {
      const metadata = workflow.metadata ? JSON.parse(workflow.metadata) : null;

      if (!metadata) return;

      setNodes(metadata.nodes || []);
      setEdges(metadata.edges || []);

      if (!metadata.viewport) return;
      const { x, y, zoom } = metadata.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {
      console.error("Error parsing workflow metadata:", error);
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
    if (onPanelClick) {
      onPanelClick();
    }
  }, [showSidebar, onPanelClick]);

  return (
    <div className="h-full w-full flex" ref={reactFlowWrapper}>
      <DndContext onDragEnd={handleDragEnd}>
        <div ref={setNodeRef} className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            colorMode={theme}
            snapToGrid
            fitViewOptions={fitViewOptions}
            snapGrid={[20, 20]}
            deleteKeyCode={["Backspace", "Delete"]}
            multiSelectionKeyCode={["Control", "Meta"]}
            selectionKeyCode={["Shift"]}
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Controls position="top-left" fitViewOptions={fitViewOptions} />
            <Panel position="top-right">
              <Button
                onClick={toggleSidebar}
                size="icon"
                className="size-10 hover:bg-accent"
                title="Toggle node library"
              >
                <PanelBottom className="size-4" />
              </Button>
            </Panel>
          </ReactFlow>
        </div>

        <WorkflowNodesSidebar
          show={showSidebar}
          onClose={() => setShowSidebar(false)}
          onAddNode={handleAddNode}
          onDragEnd={handleDragEnd}
        />
      </DndContext>
    </div>
  );
}
