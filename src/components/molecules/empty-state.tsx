import type { PropsWithChildren, ReactNode } from "react";
import { AnimatedGridPattern } from "../atoms/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { Large, Small } from "../atoms/ui/typography";

export type EmptyStateProps = PropsWithChildren<{
  title: string;
  description?: ReactNode;
  learnMore?: string;
  addButton?: ReactNode;
  className?: string;
  icon?: LucideIcon;
}>;

export function EmptyState({
  title,
  description,
  addButton,
  className,
  icon: Icon,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-6 rounded-lg border border-input px-4 py-10 md:min-h-[500px] overflow-hidden",
        className
      )}
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="max-w-xs text-pretty text-center">
        {Icon && (
          <div className="max-w-[60px] mb-5 mx-auto transform-gpu rounded-xl bg-gradient-to-br from-accent via-card to-muted p-3 shadow-lg dark:from-primary/70 dark:to-card">
            <div className="flex size-full items-center justify-center">
              <Icon className="size-8" />
            </div>
          </div>
        )}

        <Large as="span" weight="semibold">
          {title}
        </Large>
        <Small as="p" className="mt-2 text-pretty" variant="accent">
          {description}
        </Small>
      </div>
      <div className="flex items-center gap-2">{addButton}</div>
    </div>
  );
}
