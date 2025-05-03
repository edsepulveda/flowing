import { Lead } from "@/components/atoms/ui/typography";

export const NodeFooter = ({ nodeId }: { nodeId: string }) => {
  return (
    <div className="flex items-center border-t px-3 py-2 mt-auto">
      <div className="flex items-center space-x-1">
        <Lead className="font-mono text-xs text-muted-foreground">
          ID: {nodeId.substring(0, 8)}...{nodeId.substring(nodeId.length - 8)}
        </Lead>
      </div>
    </div>
  );
};
