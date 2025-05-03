import { FormControl } from "@/components/atoms/ui/form";
import { Input } from "@/components/atoms/ui/input";
import { cn } from "@/lib/utils";
import { WorkflowRegistry } from "@/lib/workflow/registry";
import type { AppNodeData, InputsType } from "@/types/node";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Fragment, useCallback } from "react";

interface InputField {
  name: string;
  type: string;
  label: string;
  helperText?: string;
  required?: boolean;
  defaultValue?: any;
}

export const NodeBody = ({
  node,
  nodeId,
}: {
  node: AppNodeData;
  nodeId: string;
}) => {
  const { updateNodeData } = useReactFlow();
  const nodeType = node.type;
  const nodeInfo = Object.values(WorkflowRegistry).find(
    (entry) => entry.type === nodeType
  );

  const updateInputValue = useCallback(
    (name: string, value: any) => {
      console.log(`Updating ${name} to ${value}`);

      updateNodeData(nodeId, {
        ...node,
        inputs: {
          ...(node?.inputs || {}),
          [name]: value,
        },
      });
    },
    [nodeId, node, updateNodeData]
  );

  const renderInputField = (input: InputField) => {
    const currentValue = node?.inputs?.[input.name] ?? input.defaultValue;

    switch (input.type) {
      case "string":
        return (
          <Input
            type="text"
            id={`${nodeId}-${input.name}`}
            placeholder={input.label}
            defaultValue={input.defaultValue}
            required={input.required}
            className="w-full"
            value={currentValue || ""}
            onChange={(e) => updateInputValue(input.name, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-start relative w-full p-3">
      {nodeInfo?.inputs && nodeInfo.inputs.length > 0 && (
        <div className="space-y-3 w-full">
          {nodeInfo.inputs.map((input: InputsType) => (
            <Fragment key={input.name}>
              <FormControl
                id={`${nodeId}-${input.name}`}
                label={input.label}
                helperText={input.helperText}
                isRequired={input.required}
                className="mb-2"
              >
                {renderInputField(input) || (
                  <span className="text-muted">Unsupported input type</span>
                )}
              </FormControl>

              {input.hideHandle ? null : (
                <Handle
                  id={input.name}
                  type="source"
                  position={Position.Right}
                  className={cn(
                    "!bg-muted-foreground !border-2 !size-4 !-right-2.5"
                  )}
                />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
