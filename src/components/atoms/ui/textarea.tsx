import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type Props = {
  isDisabled?: boolean;
  placeholder?: string;
  isFullWidth?: boolean;
  isRequired?: boolean;
  reSize?: "none" | "both" | "vertical" | "horizontal";
};

const textAreaVariants = cva(
  "w-full p-2 h-[70px] placeholder:text-sm dark:placeholder-muted-foreground placeholder-opacity-50 outline-none focus:ring-2 hover:ring-ring/10 duration-100",
  {
    variants: {
      size: {
        xs: ["text-xs"],
        sm: ["text-sm"],
        md: ["text-sm"],
        lg: ["text-lg"],
      },
      isRounded: {
        true: ["rounded-md"],
        false: "",
      },
      variant: {
        filled:
          "bg-muted dark:bg-muted text-foreground dark:text-muted-foreground border border-border dark:border-border",
        outline: "bg-transparent",
        plain: "bg-transparent outline-none",
      },
      isError: {
        true: "focus:ring-destructive/50 placeholder-destructive/70",
        false: "focus:ring-primary/50 focus:ring-1",
      },
    },
    compoundVariants: [
      {
        variant: 'plain',
        isError: [true, false],
        className: 'border-none'
      }
    ]
  }
);
export type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size" | "disabled"
> &
  VariantProps<typeof textAreaVariants> &
  Props;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      isRounded = true,
      isDisabled = false,
      isError = false,
      isRequired,
      variant = "filled",
      size = "md",
      reSize = "both",
      ...props
    },
    ref
  ) => {
    return (
      <textarea
        {...props}
        style={{ resize: reSize }}
        ref={ref}
        disabled={isDisabled}
        className={cn(
          textAreaVariants({ className, isError, size, isRounded, variant })
        )}
      />
    );
  }
);
