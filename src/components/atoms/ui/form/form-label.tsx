import type { ReactNode } from "react";
import * as Label from "@radix-ui/react-label";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "../tooltip";

export type FormLabelProps = {
  id?: string;
  isRequired?: boolean;
  isOptional?: boolean;
  label?: ReactNode;
  icon?: ReactNode;
  className?: string;
  tooltipClassName?: string;
  tooltipText?: ReactNode;
};

export const FormLabel = ({
  id,
  label,
  isRequired,
  icon,
  className,
  isOptional,
  tooltipClassName,
  tooltipText,
}: FormLabelProps) => {
  return (
    <Label.Root
      className={cn(
        "mb-2 flex items-center text-sm font-normal text-neutral-900 dark:text-neutral-200",
        className
      )}
      id={id}
      htmlFor={id}
    >
      {label}
      {isRequired && <span className="ml-1 text-metallic-red-400">*</span>}
      {isOptional && (
        <span className="ml-1 italic text-xs text-neutral-800 dark:text-neutral-200">
          {" "}
          - Optional
        </span>
      )}
      {icon && !tooltipText && (
        <span className="ml-2 cursor-default text-neutral-800 dark:text-neutral-200">
          {icon}
        </span>
      )}
      {tooltipText && (
        <Tooltip content={tooltipText} className={tooltipClassName}>
          <HelpCircle className="ml-1 size-5" />
        </Tooltip>
      )}
    </Label.Root>
  );
};
