import type { PropsWithChildren, ReactNode } from "react";
import { AnimatedGridPattern } from "../atoms/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

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
        "relative flex flex-col items-center justify-center gap-6 rounded-lg border border-neutral-200 dark:border-neutral-700 px-4 py-10 md:min-h-[500px] overflow-hidden",
        className
      )}
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="max-w-xs text-pretty text-center">
        {Icon && (
          <div className="max-w-[60px] mb-5 mx-auto transform-gpu rounded-xl bg-gradient-to-br from-metallic-pastel-100 via-gray-100 to-gray-400 p-3 shadow-lg dark:from-metallic-blue-500 dark:via-metallic-blue-100 dark:to-gray-400">
            <div className="flex size-full items-center justify-center">
              <Icon className="size-8" />
            </div>
          </div>
        )}

        <span className="text-lg font-medium text-neutral-500 dark:text-neutral-100">
          {title}
        </span>
        <p className="mt-2 text-pretty text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2">{addButton}</div>
    </div>
  );
}
