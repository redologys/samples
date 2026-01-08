"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `inline-flex items-center gap-1.5
   px-3 py-1 rounded-full
   text-xs font-semibold uppercase tracking-wider
   transition-all duration-200`,
  {
    variants: {
      variant: {
        default: "bg-neutral-700/50 text-neutral-300 border border-neutral-600/50",
        primary: "bg-primary-500/20 text-primary-300 border border-primary-500/30",
        accent: "bg-accent-500/20 text-accent-300 border border-accent-500/30",
        success: "bg-success-500/20 text-success-300 border border-success-500/30",
        warning: "bg-warning-500/20 text-warning-300 border border-warning-500/30",
        error: "bg-error-500/20 text-error-300 border border-error-500/30",
        outline: "bg-transparent text-neutral-300 border border-neutral-600",
        "outline-primary": "bg-transparent text-primary-400 border border-primary-500/50",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
