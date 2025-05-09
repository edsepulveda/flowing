import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/atoms/ui/button";

//Dnd
import {
  DndContext,
  type DragStartEvent,
  DragOverlay,
  useDraggable,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { EntryNodeData, TaskType } from "@/types/node";
import { WorkflowRegistry } from "@/lib/workflow/registry";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/ui/accordion";

const nodeTypeKeys = Object.keys(WorkflowRegistry);

interface NodeItemProps {
  nodeType: string;
  onAddNode?: (nodeType: EntryNodeData) => void;
}

const NodeItem = ({ nodeType, onAddNode }: NodeItemProps) => {
  //@ts-ignore
  const nodeInfo = WorkflowRegistry[nodeType as TaskType];

  if (!nodeInfo) {
    console.error(`Node with type ${nodeType} not found in registry`);
    return null;
  }

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: nodeInfo.type,
      data: {
        type: "node",
        node: nodeInfo,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  const Icon = nodeInfo.icon;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-3 border rounded-md cursor-grab bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all",
        isDragging && "cursor-grabbing"
      )}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...attributes}
      {...listeners}
      onClick={() => onAddNode && onAddNode(nodeInfo)}
    >
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-muted">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h4 className="font-medium text-sm">{nodeInfo.label}</h4>
          <p className="text-xs text-muted-foreground">
            {nodeInfo.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const DragOverlayNode: React.FC<{ node: EntryNodeData }> = ({ node }) => {
  const Icon = node.icon;

  return (
    <div
      className="p-3 border rounded-md bg-card shadow-md border-primary/70 cursor-grabbing"
      style={{
        width: "240px",
        opacity: 0.8,
        pointerEvents: "none",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-muted">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h4 className="font-medium text-sm">{node.label}</h4>
          <p className="text-xs text-muted-foreground">{node.description}</p>
        </div>
      </div>
    </div>
  );
};

interface WorkflowSidebarProps {
  show: boolean;
  onClose: () => void;
  onAddNode: (nodeType: EntryNodeData) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

export const WorkflowNodesSidebar = ({
  onAddNode,
  onDragEnd,
  onClose,
  show,
}: WorkflowSidebarProps) => {
  const [activeNode, setActiveNode] = useState<EntryNodeData | null>(null);
  const [dragStartTime, setDragStartTime] = useState<number | null>(null);
  const [dragStartPosition, setDragStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const categorizedNodes = useMemo(() => {
    const categories: Record<string, Array<string>> = {};

    nodeTypeKeys.forEach((nodeType) => {
      const nodeInfo = WorkflowRegistry[nodeType as TaskType];

      if (nodeInfo && nodeInfo.isEntryPoint === false) {
        const category = nodeInfo.category || "Other";

        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(nodeType);
      }
    });
    return categories;
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (active && active.data.current) {
      setActiveNode(active.data.current.node);
      setDragStartTime(Date.now());

      const { clientX, clientY } = event.activatorEvent as MouseEvent;
      setDragStartPosition({ x: clientX, y: clientY });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { clientX, clientY } = event.activatorEvent as MouseEvent;

    if (activeNode && dragStartPosition) {
      const dragDuration = Date.now() - (dragStartTime || Date.now());

      const deltaX = clientX - dragStartPosition.x;
      const deltaY = clientY - dragStartPosition.y;
      const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const MIN_DRAG_DURATION = 200;
      const MIN_DRAG_DISTANCE = 10;

      const validDrag =
        dragDuration > MIN_DRAG_DURATION || dragDistance > MIN_DRAG_DISTANCE;

      if (validDrag) {
        onDragEnd(event);
      }
    }

    // Reset state regardless
    setActiveNode(null);
    setDragStartTime(null);
    setDragStartPosition(null);
  };

  const sidebarVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      },
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="w-72 h-full border-l bg-background p-4 overflow-auto"
          variants={sidebarVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Workflow Node Options</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-muted"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground mb-4">
            <p>Click or Drag a Task that you want to be added</p>
          </div>

          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {Object.keys(categorizedNodes).length > 0 ? (
              <Accordion type="multiple" className="w-full">
                {Object.entries(categorizedNodes).map(
                  ([category, nodeTypes]) => (
                    <AccordionItem
                      key={category}
                      value={category}
                      className="border-b border-muted"
                    >
                      <AccordionTrigger className="py-3 text-sm font-medium">
                        {category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 py-2">
                          {nodeTypes.map((nodeType) => (
                            <NodeItem
                              key={nodeType}
                              nodeType={nodeType}
                              onAddNode={onAddNode}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>No nodes available</p>
              </div>
            )}
            <DragOverlay>
              {activeNode ? <DragOverlayNode node={activeNode} /> : null}
            </DragOverlay>
          </DndContext>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
