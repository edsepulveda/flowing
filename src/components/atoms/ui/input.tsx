import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

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
  "w-full py-[0.375rem] placeholder:text-sm dark:placeholder-gray-500 placeholder-opacity-50 outline-none focus:ring-2 hover:ring-metallic-blue-100 duration-100",
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
        filled: "bg-slate-200 dark:bg-neutral-800 text-black dark:text-gray-400",
        outline: "bg-transparent",
        plain: "bg-transparent outline-none",
      },
      isError: {
        true: "focus:ring-metallic-red-400/50 placeholder-metallic-red-300",
        false: "focus:ring-primary/50 focus:ring-1",
      },
    },
    compoundVariants: [],
  }
);

const inputParentContainerVariants = cva(
  "inline-flex font-display items-center border border-neutral-400 dark:border-neutral-700 relative",
  {
    variants: {
      isRounded: {
        true: ["rounded-md"],
        false: "",
      },
      isError: {
        true: "!border-metallic-red-400",
        false: "border-metallic-blue-400",
      },
      isFullWidth: {
        true: "w-full",
        false: "",
      },
      variant: {
        filled: "bg-neutral-100 dark:bg-neutral-800 text-black dark:text-gray-400",
        outline: "bg-transparent",
        plain: "bg-transparent outline-none",
      },
    },
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
        {leftIcon && (
          <span className="absolute left-0 ml-3 text-sm">{leftIcon}</span>
        )}
        <input
          {...props}
          ref={ref}
          readOnly={isReadOnly}
          disabled={disabled}
          onInput={handleInput}
          className={cn(
            leftIcon ? "pl-10" : "pl-2.5",
            rightIcon ? "pr-10" : "pr-2.5",
            inputVariants({ className, isError, size, isRounded, variant }),
          )}
        />
        {rightIcon && (
          <span className="absolute right-0 mr-3">{rightIcon}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
