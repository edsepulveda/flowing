import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React from "react";

interface NodeCardProps {
  children?: React.ReactNode;
  nodeId: string;
  isSelected?: boolean;
}

export const NodeCard = ({ children, nodeId, isSelected }: NodeCardProps) => {
  const { getNode, setCenter } = useReactFlow();

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    const node = getNode(nodeId);
    if (!node) return;
    const { position, measured } = node;
    if (!position || !measured) return;

    const { width, height } = measured;
    const x = position.x + width! / 2;
    const y = position.y + height! / 2;
    if (typeof x === "undefined" || typeof y === "undefined") return;

    setCenter(x, y, {
      zoom: 1,
      duration: 500,
    });
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={cn(
        "flex flex-col rounded-lg shadow-md w-80 transition-all duration-200 bg-background border ",
        isSelected ? "border-primary" : "border-muted"
      )}
    >
      {children}
    </div>
  );
};
