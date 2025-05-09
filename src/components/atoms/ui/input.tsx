import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, Eye, EyeClosed } from "lucide-react";

type CommonProps = {
  isFullWidth?: boolean;
  isRequired?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoCapitalization?: boolean;
  containerClassName?: string;
};

const inputVariants = cva(
  "w-full py-[0.375rem] h-9 placeholder:text-sm dark:placeholder-muted-foreground placeholder-opacity-50 outline-none focus-visible:ring-2 transition-all duration-150",
  {
    variants: {
      size: {
        xs: ["text-xs"],
        sm: ["text-sm"],
        md: ["text-sm"],
        lg: ["text-sm"],
      },
      isRounded: {
        true: ["rounded-md"],
        false: "",
      },
      variant: {
        filled:
          "bg-muted dark:bg-muted text-foreground dark:text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/70",
        outline: "bg-transparent",
        plain: "bg-transparent outline-none",
      },
      isError: {
        true: "border-destructive ring-2 ring-destructive/30 focus-visible:ring-destructive/60 placeholder-destructive/70 focus-visible:border-destructive",
        false: "focus-visible:ring-ring/30 focus-visible:border-ring",
      },
    },
    compoundVariants: [],
  }
);

// Input Parent Container Variants with theme variables
const inputParentContainerVariants = cva(
  "relative w-full max-w-full",
  {
    variants: {
      isRounded: {
        true: ["rounded-md"],
        false: "",
      },
      isError: {
        true: "border-destructive/70 focus-within:border-destructive focus-within:ring-2 focus-within:ring-destructive/30",
        false:
          "border-border dark:border-border focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
      },
      isFullWidth: {
        true: "w-full",
        false: "",
      },
      variant: {
        filled:
          "bg-muted dark:bg-muted text-foreground dark:text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/70",
        outline:
          "bg-transparent hover:border-border dark:hover:border-border/70",
        plain: "bg-transparent outline-none border-transparent",
      },
      isFocused: {
        true: "",
        false: "",
      },
      isDisabled: {
        true: "opacity-60 cursor-not-allowed bg-muted dark:bg-muted/50 border-border dark:border-border",
        false: "",
      },
    },
    compoundVariants: [
      {
        isError: false,
        variant: "filled",
        isFocused: true,
        className: "border-ring ring-2 ring-ring/20",
      },
      {
        isError: true,
        variant: "filled",
        isFocused: true,
        className: "border-destructive ring-2 ring-destructive/30",
      },
    ],
  }
);

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  VariantProps<typeof inputVariants> &
  CommonProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      isRounded = true,
      isFullWidth = true,
      isDisabled,
      isError = false,
      leftIcon,
      rightIcon,
      isRequired,
      variant = "filled",
      size = "md",
      isReadOnly,
      autoCapitalization,
      ...props
    },
    ref
  ) => {
    const disabled = isDisabled || props.disabled;
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const togglePasswordVisibility = React.useCallback(
      () => setShowPassword(!showPassword),
      [showPassword, setShowPassword]
    );

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (autoCapitalization) {
        event.target.value = event.target.value.toUpperCase();
      }
    };

    return (
      <div
        className={inputParentContainerVariants({
          isRounded,
          isError,
          isFullWidth,
          variant,
          className: containerClassName,
        })}
      >
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-0 ml-3 text-sm">{leftIcon}</span>
          )}
          <input
            {...props}
            ref={ref}
            readOnly={isReadOnly}
            type={showPassword ? "text" : props.type}
            disabled={disabled}
            onInput={handleInput}
            className={cn(
              leftIcon ? "pl-10" : "pl-2.5",
              rightIcon ? "pr-10" : "pr-2.5",
              inputVariants({ className, isError, size, isRounded, variant })
            )}
          />

          <div className="group">
            {isError && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex flex-none items-center p-2.5">
                <AlertTriangle
                  className={cn(
                    "size-5 text-destructive",
                    props.type === "password" &&
                      "transition-opacity group-hover:opacity-0"
                  )}
                />
              </div>
            )}

            {props.type === "password" && !rightIcon && (
              <button
                className={cn(
                  "absolute inset-y-0 right-0 flex items-center px-3",
                  isError &&
                    "opacity-0 transition-opacity group-hover:opacity-100"
                )}
                type="button"
                onClick={() => togglePasswordVisibility()}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye
                    className="size-4 flex-none text-muted-foreground"
                    aria-hidden
                  />
                ) : (
                  <EyeClosed
                    className="size-4 flex-none text-muted-foreground"
                    aria-hidden
                  />
                )}
              </button>
            )}
          </div>

          {rightIcon && (
            <span className="absolute right-0 mr-3">{rightIcon}</span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
