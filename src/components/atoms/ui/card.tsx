import * as React from "react";

import { cn } from "@/lib/utils";

// The base Card component provides the main container with proper borders and shadows
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-input bg-card text-card-foreground",
      "shadow-sm dark:shadow-inner", // Different shadow treatments for light/dark mode
      "transition-all duration-200", // Smooth transitions for any state changes
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// The CardHeader component adds a bordered section at the top
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 py-4 px-6",
      "border-b border-input", // Slightly lighter border for subdivision
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// The CardTitle component provides consistent styling for card headings
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xs font-sans", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// The CardDescription provides secondary text styling
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm",
      "text-dark-bg-200 dark:text-metallic-pastel-300", // Softer text for descriptions
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// The CardContent component holds the main content area
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "py-4 px-6",
      "border-b border-neutral-200 dark:border-neutral-700/80 last:border-none", // Consistent with header borders
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// The CardFooter provides a section for actions or additional info
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
