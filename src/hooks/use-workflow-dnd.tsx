import { useCallback } from "react";
import { useReactFlow, useViewport } from "@xyflow/react";
import type { DragEndEvent } from "@dnd-kit/core";
import type { EntryNodeData } from "@/types/node";
import { TaskType } from "@/types/node";
import { createNode } from "@/lib/workflow/createNode";

export const useWorkflowDnd = () => {
  const viewport = useViewport();
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const handleAddNode = useCallback(
    (nodeData: EntryNodeData) => {
      const { x, y, zoom } = viewport;

      const centerX = -x / zoom + window.innerWidth / 2 / zoom;
      const centerY = -y / zoom + window.innerHeight / 2 / zoom;

      const type = nodeData.type as TaskType;

      const newNode = createNode(type, {
        x: centerX,
        y: centerY,
      });

      setNodes((nds) => nds.concat(newNode));
    },
    [viewport, setNodes]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active } = event;

      if (active && active.data.current) {
        const nodeData = active.data.current.node as EntryNodeData;

        const { clientX, clientY } = event.activatorEvent as MouseEvent;

        const position = screenToFlowPosition({
          x: clientX,
          y: clientY,
        });

        position.x -= 750;
        position.y += 200;

        const newNode = createNode(nodeData.type as TaskType, position);
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [viewport, setNodes]
  );

  return {
    handleAddNode,
    handleDragEnd,
  };
};
