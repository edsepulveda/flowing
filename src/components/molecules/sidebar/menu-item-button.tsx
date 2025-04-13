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
}: MenuItemProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof MenuItemProps<T>>) => {
  const Item = 'div';

  return (
    <div className="px-1.5 py-0.5">
      <Item
        type="button"
        role="menuitem"
        className={cn(
          "group flex items-center gap-2.5 rounded-md px-4 py-2.5 text-sm leading-none text-dark-bg-300 transition-[background-color,color,font-weight] duration-75 dark:text-neutral-500 hover:bg-metallic-pastel-400/20 active:bg-metallic-pastel-400/30",
          "outline-none focus-visible:ring-2 focus-visible:ring-metallic-blue-500/50 border border-transparent",
          isSelected &&
            "bg-white border border-neutral-300 dark:border-neutral-700 font-medium text-metallic-blue-500 active:bg-metallic-pastel-400/40 dark:bg-dark-bg-200 dark:text-metallic-blue-500 dark:hover:bg-dark-bg-200/80 dark:active:bg-dark-bg-200/90",
          isDisabled &&
            "cursor-not-allowed opacity-50 bg-transparent pointer-events-none",
          className
        )}
        ref={inputRef}
        {...props}
      >
        {isSelected && (
          <div className="absolute left-1 top-1/2 h-3 w-1 -translate-y-1/2 -translate-x-1.5 rounded-full bg-metallic-blue-500 shadow-md shadow-metallic-blue-500/20 dark:bg-metallic-blue-500 dark:shadow-metallic-blue-500/20" />
        )}

        {Icon && (
          <div className="flex-shrink-0 flex items-center justify-center">
            <Icon className={cn("size-4 transition-colors duration-200")} />
          </div>
        )}

        <div className="grow text-left font-medium">{children}</div>
      </Item>
    </div>
  );
};
