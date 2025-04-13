import { cn } from "@/lib/utils";
import { AlertOctagonIcon } from "lucide-react";
import type { ReactNode } from "react";

export type FormHelperText = {
  isError?: boolean;
  text?: ReactNode;
};

export const FormHelperText = ({ isError, text }: FormHelperText) => {
  return (
    <div
      className={cn(
        "mt-2 flex items-center font-display text-xs text-neutral-200 dark:text-neutral-500",
        isError && "!text-metallic-red-400"
      )}
    >
      {isError && (
        <span>
          <AlertOctagonIcon className="mr-1.5 size-4" />
        </span>
      )}
      <span className="truncate">{text}</span>
    </div>
  );
};
