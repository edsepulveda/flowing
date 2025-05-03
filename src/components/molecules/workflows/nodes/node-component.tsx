import { type NodeProps } from "@xyflow/react";
import { memo } from "react";
import { NodeCard } from "./node-card";
import type { AppNodeData } from "@/types/node";
import { NodeHeader } from "./node-header";
import { NodeBody } from "./node-body";
import { NodeFooter } from "./node-footer";

const NodeComponent = memo((props: NodeProps) => {
  const data = props.data as AppNodeData;

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader node={data} />
      <NodeBody nodeId={props.id} node={data} />
      <NodeFooter nodeId={props.id} />
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
