import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/utils";
import type { MenuItemProps } from "@/types/menu";

export const MenuIconButton = <T extends ElementType = "button">({
  children,
  icon: Icon,
  className,
  isDisabled,
  isSelected,
  description,
  lottieIcon = "forward",
  inputRef,
  ...props
}: MenuItemProps & Omit<ComponentPropsWithoutRef<T>, keyof MenuItemProps>) => {
  const Item = 'div';

  return (
    <div className="px-1.5 py-0.5">
      <Item
        type="button"
        role="menuitem"
        className={cn(
          "group flex items-center gap-2.5 rounded-md px-4 py-2.5 text-sm leading-none transition-[background-color,color,font-weight] duration-75",
          "text-sidebar-foreground outline-none",
          "hover:bg-sidebar-accent/10 active:bg-sidebar-accent/20",
          
          isSelected && [
            "bg-sidebar-primary/10 font-medium",
            "text-sidebar-primary active:bg-sidebar-primary/20",
            "dark:bg-sidebar-primary/15 dark:border-sidebar-border",
            "dark:hover:bg-sidebar-primary/20 dark:active:bg-sidebar-primary/30"
          ],
          
          // Disabled state
          isDisabled && "cursor-not-allowed opacity-50 bg-transparent pointer-events-none",
          
          className
        )}
        ref={inputRef}
        {...props}
      >
        {isSelected && (
          <div className="absolute left-1 top-1/2 h-3 w-1 -translate-y-1/2 -translate-x-1.5 rounded-full bg-sidebar-primary shadow-md shadow-sidebar-primary/20" />
        )}

        {Icon && (
          <div className="flex-shrink-0 flex items-center justify-center">
            <Icon className={cn("size-4 transition-colors duration-200", 
              isSelected ? "text-sidebar-primary" : "text-sidebar-foreground"
            )} />
          </div>
        )}

        <div className="grow text-left font-medium">{children}</div>
      </Item>
    </div>
  );
};
