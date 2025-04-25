import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SheetContextType = {
  isOpen: boolean;
};

const SheetContext = React.createContext<SheetContextType | undefined>(
  undefined
);

const useSheet = (): SheetContextType => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a Sheet");
  }
  return context;
};

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

function Sheet({ children, ...props }: SheetProps) {
  const [isOpen, setIsOpen] = React.useState(
    props?.open ?? props?.defaultOpen ?? false
  );

  React.useEffect(() => {
    if (props?.open !== undefined) setIsOpen(props.open);
  }, [props?.open]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setIsOpen(open);
      props.onOpenChange?.(open);
    },
    [props]
  );

  return (
    <SheetContext.Provider value={{ isOpen }}>
      <SheetPrimitive.Root
        data-slot="sheet"
        {...props}
        onOpenChange={handleOpenChange}
      >
        {children}
      </SheetPrimitive.Root>
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      {...props}
    />
  );
}


const sheetVariants = cva('fixed z-50 gap-4 bg-background p-6 shadow-lg', {
  variants: {
    side: {
      top: 'inset-x-0 top-0 border-b',
      bottom: 'inset-x-0 bottom-0 border-t',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
      right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants> &
  HTMLMotionProps<'div'> & {
    transition?: Transition;
  };

  function SheetContent({
    side = 'right',
    className,
    transition = { type: 'spring', stiffness: 150, damping: 25 },
    children,
    ...props
  }: SheetContentProps) {
    const { isOpen } = useSheet();
   
    return (
      <AnimatePresence>
        {isOpen && (
          <SheetPortal forceMount data-slot="sheet-portal">
            <SheetOverlay asChild forceMount>
              <motion.div
                key="sheet-overlay"
                data-slot="sheet-overlay"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            </SheetOverlay>
            <SheetPrimitive.Content asChild forceMount {...props}>
              <motion.div
                key="sheet-content"
                data-slot="sheet-content"
                initial={
                  side === 'right'
                    ? { x: '100%', opacity: 0 }
                    : side === 'left'
                      ? { x: '-100%', opacity: 0 }
                      : side === 'top'
                        ? { y: '-100%', opacity: 0 }
                        : { y: '100%', opacity: 0 }
                }
                animate={{ x: 0, y: 0, opacity: 1 }}
                exit={
                  side === 'right'
                    ? { x: '100%', opacity: 0 }
                    : side === 'left'
                      ? { x: '-100%', opacity: 0 }
                      : side === 'top'
                        ? { y: '-100%', opacity: 0 }
                        : { y: '100%', opacity: 0 }
                }
                transition={transition}
                className={cn(sheetVariants({ side }), className)}
                {...props}
              >
                {children}
                <SheetPrimitive.Close
                  data-slot="sheet-close"
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
              </motion.div>
            </SheetPrimitive.Content>
          </SheetPortal>
        )}
      </AnimatePresence>
    );
  }

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("px-5 py-4 text-center sm:text-left border-b", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
