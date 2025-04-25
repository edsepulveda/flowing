import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        
        // New variants
        accent: 
          "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        muted: 
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
        success: 
          "border-transparent bg-chart-3 text-primary-foreground hover:bg-chart-3/80",
        warning: 
          "border-transparent bg-chart-1 text-primary-foreground hover:bg-chart-1/80",
        info: 
          "border-transparent bg-chart-2 text-primary-foreground hover:bg-chart-2/80",
        ghost: 
          "border-transparent bg-transparent text-foreground hover:bg-muted",
        "outline-primary": 
          "border-primary text-primary hover:bg-primary/10",
        "outline-destructive": 
          "border-destructive text-destructive hover:bg-destructive/10",
        "outline-accent": 
          "border-accent text-accent-foreground hover:bg-accent/10",
        sidebar: 
          "border-transparent bg-sidebar text-sidebar-foreground hover:bg-sidebar/80",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        xs: "px-1.5 py-0.25 text-[10px]",
        sm: "px-2 py-0.25 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-sm",
      },
      rounded: {
        default: "rounded-full",
        md: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg",
        none: "rounded-none",
      },
      withIcon: {
        true: "",
        false: "",
      },
      removable: {
        true: "",
        false: "",
      },
      dotted: {
        true: "pl-1.5",
        false: "",
      },
    },
    compoundVariants: [
      {
        removable: true,
        className: "pr-1 gap-1",
      },
      {
        withIcon: true,
        className: "gap-1.5",
      },
      {
        dotted: true,
        className: "flex items-center gap-1",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      withIcon: false,
      removable: false,
      dotted: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  onRemove?: () => void
}

function Badge({ 
  className, 
  variant, 
  size, 
  rounded, 
  withIcon, 
  removable, 
  dotted,
  icon,
  onRemove,
  children, 
  ...props 
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ 
      variant, 
      size, 
      rounded, 
      withIcon: !!icon, 
      removable, 
      dotted 
    }), className)} {...props}>
      {dotted && (
        <span className={cn(
          "block h-1.5 w-1.5 rounded-full",
          variant === "outline" && "bg-foreground",
          variant === "default" && "bg-primary-foreground",
          variant === "secondary" && "bg-secondary-foreground",
          variant === "destructive" && "bg-destructive-foreground",
          variant === "accent" && "bg-accent-foreground",
          variant === "muted" && "bg-muted-foreground",
          variant === "success" && "bg-primary-foreground",
          variant === "warning" && "bg-primary-foreground",
          variant === "info" && "bg-primary-foreground",
          variant === "ghost" && "bg-foreground",
          variant?.startsWith("outline-") && "bg-current",
          variant === "sidebar" && "bg-sidebar-foreground",
        )} />
      )}
      
      {icon && <span className="shrink-0">{icon}</span>}
      
      <span>{children}</span>
      
      {removable && (
        <button 
          className="inline-flex items-center justify-center rounded-full hover:bg-background/20 focus:outline-none focus:ring-1 focus:ring-ring"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </div>
  )
}

export { Badge, badgeVariants }