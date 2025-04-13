import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ButtonWrapper } from "./button-wrapper";

type VariantButtonProps = VariantProps<typeof buttonVariants>;
type IconName = LucideIcon;

type ButtonBaseProps = {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  startIcon?: IconName;
  endIcon?: IconName;
  shallow?: boolean;
  tooltip?: string | React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  tooltipOffset?: number;
  tooltipClassName?: string;
  disabled?: boolean;
  flex?: boolean;
} & VariantButtonProps;

export type ButtonProps = ButtonBaseProps &
  (
    | Omit<React.JSX.IntrinsicElements["a"], "href" | "onClick" | "ref">
    | (Omit<React.JSX.IntrinsicElements["button"], "onClick" | "ref"> & {
        href?: never;
      })
  );

const buttonVariants = cva(
  `
    relative
    flex items-center justify-center
    cursor-pointer
    inline-flex
    items-center
    space-x-2
    text-center
    font-regular
    ease-out
    duration-200
    rounded-md
    outline-none
    transition-all
    outline-0
    focus-visible:outline-4 
    focus-visible:outline-offset-1
    border
  `,
  {
    variants: {
      variant: {
        default:
          "bg-metallic-blue-500 text-light-bg-50 shadow-xs hover:bg-metallic-blue-400 dark:bg-metallic-blue-500 dark:text-light-bg-50 dark:hover:bg-metallic-blue-400",
        destructive:
          "bg-metallic-red-400 text-light-bg-50 shadow-xs hover:bg-metallic-red-300 focus-visible:ring-metallic-red-300/20 dark:focus-visible:ring-metallic-red-300/40",
        outline:
          "border border-metallic-pastel-300 bg-background shadow-xs hover:bg-metallic-pastel-400/20 hover:text-dark-bg-300 dark:bg-dark-bg-200/30 dark:border-dark-bg-100 dark:hover:bg-dark-bg-200/50 dark:hover:text-light-bg-50",
        secondary:
          "bg-metallic-pastel-400 text-dark-bg-300 shadow-xs hover:bg-metallic-pastel-300 dark:bg-metallic-blue-100 dark:text-light-bg-50 dark:hover:bg-metallic-blue-200",
        ghost:
          "hover:bg-metallic-pastel-400/20 hover:text-dark-bg-300 dark:hover:bg-metallic-pastel-100/20 dark:hover:text-light-bg-50",
        link: "text-metallic-blue-500 underline-offset-4 hover:underline dark:text-metallic-blue-500",
        accent:
          "bg-metallic-blue-100 text-light-bg-50 shadow-xs hover:bg-metallic-blue-200 dark:text-light-bg-50",
      },
      size: {
        tiny: "text-xs px-2.5 py-1 h-[24px]",
        sm: "text-sm leading-4 px-3 py-2 h-[28px]",
        base: "text-sm px-4 py-2 h-[32px]",
        lg: "text-base px-4 py-2 h-[36px]",
        icon: "flex justify-center",
      },
      block: {
        true: 'w-full flex items-center justify-center',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
      loading: {
        true: "cursor-wait",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
);

const Button = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(function Button(props: ButtonProps, forwardedRef) {
  const {
    loading = false,
    size,
    variant = "default",
    type = "button",
    tooltipSide = "top",
    tooltipOffset = 4,
    tooltipClassName,
    startIcon: StartIcon,
    endIcon: EndIcon,
    shallow,
    ...rest
  } = props;

  const disabled = props.disabled || loading;
  const elementType = "button";

  const element = React.createElement(
    elementType,
    {
      ...rest,
      disabled,
      ref: forwardedRef,
      className: cn(
        buttonVariants({ size, loading, variant }),
        props.className
      ),
      onClick: disabled
        ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault();
          }
        : props.onClick,
    },
    <>
      {StartIcon && (
        <>
          <StartIcon
            data-name="start-icon"
            className={cn(
              loading ? "invisible" : "visible",
              "group-active:translate-y-[0.5] me-1.5",
              size === "icon" && "h-4 w-4",
              size === "base" && "h-4 w-4 stroke-[1.5px]"
            )}
          />
        </>
      )}
      <div
        className={cn(
          "contents",
          loading ? "invisible" : "visible",
          "group-active:translate-y-[0.5px]"
        )}
      >
        {props.children}
      </div>
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <svg
            className={cn(
              "mx-4 h-5 w-5 animate-spin",
              variant === "default" ? "text-inverted" : "text-emphasis"
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {EndIcon && (
        <EndIcon
          data-name="end-icon"
          className={cn(
            loading ? "invisible" : "visible",
            "group-active:translate-y-[0.5]",
            size === "icon" && "h-4 w-4",
            size === "base" && "h-4 w-4 stroke-[1.5px]"
          )}
        />
      )}
    </>
  );

  return (
    <ButtonWrapper tooltip={props.tooltip} tooltipClassName={tooltipClassName}>
      {element}
    </ButtonWrapper>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
