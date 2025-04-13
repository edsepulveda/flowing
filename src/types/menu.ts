import type { ReactNode } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import type { ElementType, Ref, SVGProps } from "react";

export type MenuItemProps<T extends ElementType> = {
  children: ReactNode;
  icon?: LucideIcon | ((props: SVGProps<SVGSVGElement>) => React.JSX.Element);
  description?: ReactNode;
  isDisabled?: boolean;
  isSelected?: boolean;
  className?: string;
  inputRef?: Ref<any>;
  lottieIcon?: string;
};