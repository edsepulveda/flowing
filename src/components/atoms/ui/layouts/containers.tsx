import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { H1, H2, H3, Paragraph, Text, type TypographyProps } from "../Typography";

export const MAX_WIDTH_CLASSES = "mx-auto w-full max-w-[1200px]";
export const PADDING_CLASSES = "px-4 @lg:px-6 @xl:px-12 @2xl:px-20 @3xl:px-24";
export const MAX_WIDTH_CLASSES_COLUMN = "min-w-[420px]";

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    addBottomPadding?: boolean;
    size?: "small" | "default" | "large" | "full";
  }
>(({ className, addBottomPadding, size = "default", ...props }, ref) => {
  const maxWidthClass = {
    small: "max-w-[768px]",
    default: "max-w-[1200px]",
    large: "max-w-[1600px]",
    full: "max-w-none",
  }[size];

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full",
        maxWidthClass,
        PADDING_CLASSES,
        addBottomPadding && "pb-16",
        className
      )}
      {...props}
    />
  );
});

export const ContainerHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <header
      {...props}
      ref={ref}
      className={cn("w-full flex-col gap-3 py-6", className)}
    />
  );
});

export const ContainerTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement> & TypographyProps
>(({ className, ...props }, ref) => {
  return (
    <H1 {...props}  className={cn("text-2xl", className)}>
      {props.children}
    </H1>
  );
});

export const ContainerDescription = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement> & TypographyProps
>(({ className, ...props }, ref) => {
  return (
    <Paragraph
      {...props}
      variant="secondary"
      className={cn(className)}
    >
      {props.children}
    </Paragraph>
  );
});

export const ContainerSection = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    isFullWidth?: boolean;
    topPadding?: boolean;
  }
>(({ className, isFullWidth, topPadding, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "flex flex-col first:pt-12 py-6",
        isFullWidth ? "w-full" : "gap-3 lg:grid md:grid-cols-12",
        className
      )}
    />
  );
});

export const ContainerDivider = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("w-full h-px bg-border", className)}
    />
  );
});

export const ContainerSectionTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <H3 {...props} className={cn("text-foreground text-xl", className)}>
      {props.children}
    </H3>
  );
});

export const ContainerSectionDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement> & TypographyProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      as="p"
      {...props}
      className={cn("text-sm text-card-foreground", className)}
    >
      {props.children}
    </Text>
  );
});

export const ContainerSectionDetail = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, title, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("col-span-4 xl:col-span-5 prose text-sm", className)}
    >
      {title && <H2>{title}</H2>}
      {children}
    </div>
  );
});

export const ContainerSectionContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "col-span-8 xl:col-span-7",
        "flex flex-col gap-6",
        className
      )}
    />
  );
});

export const ContainerActionsContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("flex w-full items-center", className)}
    />
  );
});

export const ContainerActionsGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("flex flex-row gap-3", className)}
    />
  );
});
