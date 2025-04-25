import {
  ContainerDescription,
  ContainerTitle,
} from "@/components/atoms/ui/layouts/containers";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  primaryActions?: ReactNode;
  secondaryActions?: ReactNode;
  className?: string;
  isCompact?: boolean;
}

export const PageHeader = ({
  title,
  subtitle,
  icon,
  primaryActions,
  secondaryActions,
  className,
  isCompact = false,
}: PageHeaderProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {!isCompact && (
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {icon && <div className="text-foreground">{icon}</div>}
              <div className="space-y-1">
                {title && <ContainerTitle className="text-foreground">{title}</ContainerTitle>}
                {subtitle && (
                  <ContainerDescription size="sm" className="text-muted-foreground">
                    {subtitle}
                  </ContainerDescription>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {secondaryActions && (
              <div className="flex items-center gap-2">{secondaryActions}</div>
            )}
            {primaryActions && (
              <div className="flex items-center gap-2">{primaryActions}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
