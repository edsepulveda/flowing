import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// Define a clear props interface for the Tooltip component
interface TooltipProps
  extends Omit<TooltipPrimitive.TooltipContentProps, "content"> {
  children?: React.ReactNode;
  content:
    | ReactNode
    | string
    | ((props: { setOpen: (open: boolean) => void }) => ReactNode);
  delayDuration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  contentClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  onOpenChange?: (open: boolean) => void;
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  side = "top",
  contentClassName,
  ...props
}: TooltipProps) {
  const Content = (
    <TooltipPrimitive.Content
      {...props}
      className={cn(
        "z-50 overflow-hidden bg-card rounded-md border border-input px-3 py-1.5 text-xs text-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-5 data-[side=left]:slide-in-from-right-5 data-[side=right]:slide-in-from-left-5 data-[side=top]:slide-in-from-bottom-5",
        props.className
      )}
      side={side}
      align="center"
      collisionPadding={3}
    >
      {typeof content === "string" ? (
        <span className={cn("block", contentClassName)}>{content}</span>
      ) : typeof content === "function" ? (
        content({ setOpen: onOpenChange || (() => {}) })
      ) : (
        content
      )}
    </TooltipPrimitive.Content>
  );

  return (
    <TooltipPrimitive.Root
      delayDuration={delayDuration || 50}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipPrimitive.Portal>{Content}</TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

const TooltipTrigger = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.TooltipTrigger
    ref={ref}
    {...props}
    className={cn(className)}
  />
));

// Export the individual components from Radix UI for flexibility
const TooltipContent = TooltipPrimitive.Content;
const TooltipPortal = TooltipPrimitive.Portal;
const TooltipRoot = TooltipPrimitive.Root;

export {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipPortal,
  TooltipRoot,
};
