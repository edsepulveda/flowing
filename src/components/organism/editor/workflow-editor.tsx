import { Button } from "@/components/atoms/ui/button";
import NodeComponent from "@/components/molecules/workflows/nodes/node-component";
import { useTheme } from "@/context/theme-context";
import { createNode } from "@/lib/workflow/createNode";
import { TaskType } from "@/types/node";
import {
  ReactFlow,
  BackgroundVariant,
  Background,
  useEdgesState,
  useNodesState,
  Controls,
  Panel,
} from "@xyflow/react";
import { PanelBottom } from "lucide-react";

interface WorkflowEditorProps {
  onPanelClick: () => void;
}

const nodeTypes = {
  Node: NodeComponent
}

const fitViewOptions = {
  padding: 0.2,
  includeHiddenNodes: false,
  minZoom: 0.1,
  maxZoom: 2,
}

export function WorkflowEditor({ onPanelClick }: WorkflowEditorProps) {
  const { theme } = useTheme()

  const [nodes, setNodes, onNodesChange] = useNodesState([
    createNode(TaskType.BROWSER)
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      colorMode={theme}
      snapToGrid
      fitViewOptions={fitViewOptions}
      snapGrid={[50, 50]}
    >
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <Controls position="top-left" fitViewOptions={fitViewOptions}/>
      <Panel position="top-right">
            <Button
              onClick={onPanelClick}
              size="icon"
              className="toggle/group size-10"
            >
              <PanelBottom className="size-4" />
            </Button>
          </Panel>
    </ReactFlow>
  );
}
