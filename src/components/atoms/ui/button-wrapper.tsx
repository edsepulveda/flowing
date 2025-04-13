import { Tooltip } from "@/components/atoms/ui/tooltip";
import type React from "react";

interface ButtonWrapperProps {
  tooltip?: string | React.ReactNode;
  children: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  tooltipOffset?: number;
  tooltipClassName?: string;
}

export const ButtonWrapper = ({
  tooltip,
  children,
  tooltipSide = "top",
  tooltipClassName,
}: ButtonWrapperProps) => {
  if (!tooltip) return <>{children}</>;

  return (
    <Tooltip
      className={tooltipClassName}
      content={tooltip}
      side={tooltipSide}
    >
      {children}
    </Tooltip>
  );
};