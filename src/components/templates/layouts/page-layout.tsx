import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/atoms/ui/layouts/containers";
import { PageHeader } from "@/components/molecules/layouts/page-header";

interface PageLayoutProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  primaryAction?: ReactNode;
  className?: string;
  size?: "default" | "full" | "large" | "small";
  isCompact?: boolean;
}

export const PageLayout = ({
  children,
  title,
  subtitle,
  icon,
  primaryAction,
  className,
  size = "default",
  isCompact = false,
}: PageLayoutProps) => {
  return (
    <div className="w-full min-h-full flex flex-col items-stretch">
      <Container
        size={size}
        className={cn(
          "w-full mx-auto",
          size === "full" && isCompact
            ? "max-w-none !px-6 border-b border-input"
            : "max-w-none !px-8",
          isCompact ? "pt-4" : "pt-12",
          className
        )}
      >
        {(title || subtitle || primaryAction) && (
          <PageHeader
            title={title}
            subtitle={subtitle}
            icon={icon}
            primaryActions={primaryAction}
            isCompact={isCompact}
          />
        )}
      </Container>
      {children}
    </div>
  );
};
