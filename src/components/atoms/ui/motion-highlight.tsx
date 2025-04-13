import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import type {
  MotionHighlightContextType,
  MotionHighlightProps,
  MotionHighlightItemProps,
  ExtendedChildProps,
} from "@/lib/types/motion";
import { cn } from "@/lib/utils";

const MotionHighlightContext = React.createContext<
  MotionHighlightContextType | undefined
>(undefined);

const useMotionHighlight = (): MotionHighlightContextType => {
  const context = React.useContext(MotionHighlightContext);
  if (!context) {
    throw new Error(
      "useMotionHighlight must be used within a MotionHighlightProvider"
    );
  }
  return context;
};

export function MotionHighlight(props: MotionHighlightProps) {
  const {
    children,
    value,
    defaultValue,
    onValueChange,
    className,
    transition = { type: "spring", stiffness: 200, damping: 25 },
    hover = false,
    controlledItems,
    containerClassName,
    disabled = false,
    exitDelay = 0.2,
  } = props;

  const [activeValue, setActiveValue] = React.useState<string | null>(
    value ?? defaultValue ?? null
  );
  const id = React.useId();

  const handleSetActiveId = React.useCallback(
    (id: string | null) => {
      setActiveValue(id);
      onValueChange?.(id);
    },
    [onValueChange]
  );

  React.useEffect(() => {
    if (value !== undefined) setActiveValue(value);
    else if (defaultValue !== undefined) setActiveValue(defaultValue);
  }, [value, defaultValue]);

  return (
    <MotionHighlightContext.Provider
      value={{
        activeValue,
        setActiveValue: handleSetActiveId,
        id,
        hover,
        className,
        transition,
        disabled,
        exitDelay,
      }}
    >
      {controlledItems
        ? children
        : React.Children.map(children, (child, index) => (
            <MotionHighlightItem key={index} className={containerClassName}>
              {child}
            </MotionHighlightItem>
          ))}
    </MotionHighlightContext.Provider>
  );
}

export const MotionHighlightItem = ({
  children,
  id,
  value,
  className,
  transition,
  disabled = false,
  activeClassName,
  exitDelay,
}: MotionHighlightItemProps) => {
  const itemId = React.useId();

  const {
    activeValue,
    setActiveValue,
    hover,
    className: contextClassName,
    transition: contextTransition,
    id: contextId,
    disabled: contextDisabled,
    exitDelay: contextExitDelay,
  } = useMotionHighlight();

  if (!React.isValidElement(children)) return children;
  const element = children as React.ReactElement<ExtendedChildProps>;

  const childValue =
    id ?? value ?? element.props?.["data-value"] ?? element.props?.id ?? itemId;
  const isActive = activeValue === childValue;
  const isDisabled = disabled === undefined ? contextDisabled : disabled;
  const itemTransition = transition ?? contextTransition;

  return (
    <div
      key={childValue}
      className={cn("relative", className)}
      data-active={isActive ? "true" : "false"}
      data-value={childValue}
      aria-selected={isActive}
      data-disabled={isDisabled ? "true" : "false"}
      {...(hover
        ? {
            onMouseEnter: () => setActiveValue(childValue),
            onMouseLeave: () => setActiveValue(null),
          }
        : {
            onClick: () => setActiveValue(childValue),
          })}
    >
      <AnimatePresence>
        {isActive && !isDisabled && (
          <motion.div
            layoutId={`transition-background-${contextId}`}
            className={cn(
              "absolute inset-0 dark:bg-neutral-700 bg-neutral-200 z-0",
              contextClassName,
              activeClassName
            )}
            transition={itemTransition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                ...itemTransition,
                delay:
                  (itemTransition?.delay ?? 0) +
                  (exitDelay ?? contextExitDelay ?? 0),
              },
            }}
            data-active={isActive ? "true" : "false"}
            aria-selected={isActive}
            data-disabled={isDisabled ? "true" : "false"}
            data-value={childValue}
          />
        )}
      </AnimatePresence>
      {React.cloneElement(element, {
        className: cn("relative z-[1]", element.props.className),
        "data-active": isActive ? "true" : "false",
        "aria-selected": isActive,
        "data-disabled": isDisabled ? "true" : "false",
        "data-value": childValue,
      })}
    </div>
  );
};
