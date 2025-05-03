import { toast } from "sonner";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface CustomToastProps {
  title: string;
  description?: string;
  type?: ToastType;
  actionLabel?: string;
  onAction?: () => void;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  duration?: number;
  id?: string;
}

const toastIcons = {
  success: <CheckCircle className="size-5 text-green-500" />,
  error: <AlertCircle className="size-5 text-destructive" />,
  warning: <AlertTriangle className="size-5 text-amber-500" />,
  info: <Info className="size-5 text-blue-500" />,
};

export const showCustomToast = ({
  title,
  description,
  type = "info",
  actionLabel,
  onAction,
  position,
  duration = 5000,
  id,
}: CustomToastProps) => {
  return toast.custom(
    (t) => (
      <div
        className={cn(
          "flex w-full md:max-w-[364px] items-center p-4 rounded-lg border border-input bg-card shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[swipe=end]:animate-out data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
          "data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full"
        )}
      >
        <div className="flex items-start gap-3 w-full">
          <div className="shrink-0">{toastIcons[type]}</div>

          <div className="flex-1 space-y-1 overflow-hidden w-full">
            <div className="text-sm font-medium leading-tight text-foreground">
              {title}
            </div>
            {description && (
              <div className="text-xs text-muted-foreground line-clamp-2">
                {description}
              </div>
            )}

            {actionLabel && onAction && (
              <button
                onClick={() => {
                  onAction();
                  toast.dismiss(t);
                }}
                className="mt-1.5 text-xs font-medium text-primary hover:text-primary/90 transition-colors"
              >
                {actionLabel}
              </button>
            )}
          </div>

          <button
            className="ml-2 inline-flex shrink-0 rounded-md p-1 text-muted-foreground/50 hover:bg-muted hover:text-foreground transition-colors"
            onClick={() => toast.dismiss(t)}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    ),
    { id: id ?? `toast-${Date.now()}`, duration, position }
  );
};
