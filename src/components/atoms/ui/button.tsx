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
  "group inline-flex items-center cursor-pointer justify-center gap-1 relative whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary/75 border border-primary-foreground/25 text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // New variants based on styles.css
        subtle:
          "bg-muted/60 text-muted-foreground border border-border/40 shadow-xs hover:bg-muted/80 hover:text-foreground",
        accent:
          "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 focus-visible:ring-accent/20",
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:ring-primary/30",
        chart:
          "bg-chart-1 text-primary-foreground shadow-sm hover:bg-chart-1/90 focus-visible:ring-chart-1/30",
        sidebar:
          "bg-sidebar text-sidebar-foreground shadow-xs hover:bg-sidebar/80 focus-visible:ring-sidebar-ring/30",
        gradient:
          "bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground shadow-sm hover:from-primary/90 hover:via-accent/90 hover:to-secondary/90",
        flat: "bg-card text-card-foreground border border-border hover:bg-muted/40",
        muted:
          "bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground",

        // Destructive variants
        "destructive-outline":
          "border border-destructive bg-transparent text-destructive shadow-xs hover:bg-destructive/10 focus-visible:ring-destructive/20",
        "destructive-ghost":
          "text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/20",
        "destructive-link":
          "text-destructive underline-offset-4 hover:underline focus-visible:ring-destructive/20",
        "destructive-subtle":
          "bg-destructive/10 text-destructive border border-destructive/20 shadow-xs hover:bg-destructive/20 focus-visible:ring-destructive/20",
        "destructive-solid":
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/30",
        "destructive-gradient":
          "bg-gradient-to-r from-destructive/80 via-destructive to-destructive/80 text-destructive-foreground shadow-sm hover:from-destructive/90 hover:to-destructive/90",
      },
      size: {
        xs: "h-6 p-2 leading-none text-xs rounded-md",
        sm: "h-9 rounded-lg px-3",
        base: "px-2.5 py-2 text-sm leading-none",
        lg: "px-3 py-2.5",
        xl: "px-4 py-3 text-base",
        "2xl": "px-5 py-4 text-lg",
        icon: "flex justify-center",
        square: "aspect-square flex justify-center",
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
