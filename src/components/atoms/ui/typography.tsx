import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define the typography variants using cva
const typographyVariants = cva("transition-colors", {
  variants: {
    variant: {
      default: "text-dark-bg-300 dark:text-light-bg-50",
      secondary: "text-dark-bg-200 dark:text-metallic-pastel-400",
      tertiary: "text-dark-bg-100 dark:text-metallic-pastel-300",
      accent: "text-metallic-blue-500 dark:text-metallic-blue-500",
      success: "text-emerald-600 dark:text-emerald-400",
      warning: "text-amber-600 dark:text-amber-400",
      danger: "text-metallic-red-400 dark:text-metallic-red-300",
      gradient: "bg-gradient-to-br from-metallic-blue-400 to-metallic-blue-500 bg-clip-text text-transparent dark:from-metallic-blue-300 dark:to-metallic-blue-500",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    font: {
      sans: "font-sans",
      mono: "font-mono",
      serif: "font-serif",
    },
    state: {
      disabled: "opacity-60 cursor-not-allowed select-none",
      interactive: "cursor-pointer hover:underline",
    },
    tracking: {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
    font: "sans",
  },
});

// Define the props interface
export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  underline?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
  code?: boolean;
  mark?: boolean;
  keyboard?: boolean;
  strong?: boolean;
}

// Create the Typography component
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      className,
      variant,
      size,
      weight,
      font,
      tracking,
      state,
      as: Component = "span",
      underline = false,
      strikethrough = false,
      italic = false,
      code = false,
      mark = false,
      keyboard = false,
      strong = false,
      ...props
    },
    ref
  ) => {
    // Handle special element types
    if (code) {
      Component = "code";
    } else if (mark) {
      Component = "mark";
    } else if (keyboard) {
      Component = "kbd";
    } else if (strong) {
      Component = "strong";
    }

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({ variant, size, weight, font, tracking, state }),
          underline && "underline underline-offset-4",
          strikethrough && "line-through",
          italic && "italic",
          // Special styling for code elements
          code &&
            "px-1.5 py-0.5 rounded bg-metallic-pastel-400/20 dark:bg-dark-bg-100 border border-metallic-pastel-300/20 dark:border-neutral-700",
          // Special styling for keyboard elements
          keyboard &&
            "px-1.5 py-0.5 rounded border border-metallic-pastel-300 dark:border-neutral-700 bg-metallic-pastel-400/10 dark:bg-dark-bg-100 shadow-sm",
          // Special styling for mark elements
          mark &&
            "bg-amber-100 dark:bg-amber-900/30 px-1 rounded text-dark-bg-300 dark:text-light-bg-50",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";

// Export additional components for semantic usage
export const Text = (props: TypographyProps) => <Typography {...props} />;

export const Paragraph = (props: TypographyProps) => (
  <Typography as="p" className={cn("mb-4 leading-7 text-muted-foreground", props.className)} {...props} />
);

export const Lead = (props: TypographyProps) => (
  <Typography
    as="p"
    size="lg"
    className={cn("mb-4 leading-7", props.className)}
    {...props}
  />
);

export const Large = (props: TypographyProps) => (
  <Typography size="lg" {...props} />
);

export const Small = (props: TypographyProps) => (
  <Typography size="sm" {...props} />
);

export const Subtle = (props: TypographyProps) => (
  <Typography variant="secondary" {...props} />
);

export const Code = (props: TypographyProps) => (
  <Typography code {...props} />
);

export const Keyboard = (props: TypographyProps) => (
  <Typography keyboard {...props} />
);

export const H1 = (props: TypographyProps) => (
  <Typography
    as="h1"
    size="3xl"
    weight="bold"
    className={cn("scroll-m-20 mb-4", props.className)}
    {...props}
  />
);

export const H2 = (props: TypographyProps) => (
  <Typography
    as="h2"
    size="2xl"
    weight="semibold"
    className={cn("scroll-m-20 mb-3", props.className)}
    {...props}
  />
);

export const H3 = (props: TypographyProps) => (
  <Typography
    as="h3"
    size="xl"
    weight="semibold"
    className={cn("scroll-m-20 mb-2", props.className)}
    {...props}
  />
);

export const H4 = (props: TypographyProps) => (
  <Typography
    as="h4"
    size="lg"
    weight="semibold"
    className={cn("scroll-m-20 mb-2", props.className)}
    {...props}
  />
);

export const InlineCode = (props: TypographyProps) => (
  <Typography as="code" variant="secondary" code {...props} />
);
