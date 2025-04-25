import { cn } from "@/lib/utils";
import { AlertOctagonIcon } from "lucide-react";
import { useId, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

export type FormHelperText = {
  isError?: boolean;
  text?: ReactNode;
};

export const FormHelperText = ({ isError, text }: FormHelperText) => {
  const id = useId()

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={id}
        initial={{ opacity: 0, y: -5, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -5, height: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className={cn(
          "mt-2 flex items-center font-sans text-xs text-muted-foreground",
          isError && "!text-destructive"
        )}
      >
        {isError && (
          <span id={id}>
            <AlertOctagonIcon className="mr-1.5 size-3.5" />
          </span>
        )}
        <span id={id} className="truncate">{text}</span>
      </motion.div>
    </AnimatePresence>
  );
};
