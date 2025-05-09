import { Badge } from "@/components/atoms/ui/badge";
import { Button } from "@/components/atoms/ui/button";
import { WorkflowRegistry } from "@/lib/workflow/registry";
import type { AppNodeData } from "@/types/node";
import { GripVerticalIcon, Settings2, type LucideIcon } from "lucide-react";

export const NodeHeader = ({ node }: { node: AppNodeData }) => {
  const nodeType = node.type;
  const nodeInfo = Object.values(WorkflowRegistry).find(
    (entry) => entry.type === nodeType
  );
  const NodeIcon = nodeInfo?.icon || (Settings2 as LucideIcon);

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <header className="flex items-center space-x-2 w-full">
        <Button
          variant="ghost"
          size="xs"
          className="drag-handle cursor-grab p-0"
        >
          <GripVerticalIcon className="size-4" />
        </Button>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted">
          <NodeIcon className="w-4 h-4 text-primary" />
        </div>
        <span className="font-medium">{nodeInfo?.label || nodeType}</span>
        <div className="flex items-center space-x-2 ml-auto">
          {nodeInfo?.isEntryPoint && (
            <Badge variant="secondary" size="xs">
              Entry Point
            </Badge>
          )}
        </div>
      </header>
    </div>
  );
};