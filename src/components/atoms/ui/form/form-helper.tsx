import { cn } from "@/lib/utils";
import { AlertOctagonIcon } from "lucide-react";
import { useId, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

export type FormHelperText = {
  isError?: boolean;
  text?: ReactNode;
};

export const FormHelperText = ({ isError, text }: FormHelperText) => {
  const id = useId();

  if (!text) return null;

  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.div
          key={`helper-${id}-${String(text)}`}
          initial={{ opacity: 0, y: -5, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -5, height: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 1,
          }}
          className={cn(
            "mt-2 flex items-center font-sans text-xs text-muted-foreground",
            isError && "!text-destructive"
          )}
        >
          {isError && (
            <span>
              <AlertOctagonIcon className="mr-1.5 size-3.5" />
            </span>
          )}
          <span className="truncate">{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
