"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// CARD COMPONENT
// ============================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", children, ...props }, ref) => {
    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const variantClasses = {
      default: "bg-neutral-900/50 border border-neutral-800 rounded-2xl",
      elevated: "bg-neutral-900/50 border border-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300",
      interactive: `
        bg-neutral-900/50 border border-neutral-800 rounded-2xl
        cursor-pointer transition-all duration-300
        hover:bg-neutral-800/50 hover:border-neutral-700 hover:-translate-y-1 hover:shadow-xl
      `,
      glass: `
        relative overflow-hidden rounded-2xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
      `,
    };

    return (
      <div
        ref={ref}
        className={cn(variantClasses[variant], paddingClasses[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// ============================================
// CARD HEADER
// ============================================

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

// ============================================
// CARD TITLE
// ============================================

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

// ============================================
// CARD DESCRIPTION
// ============================================

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-400", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

// ============================================
// CARD CONTENT
// ============================================

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));

CardContent.displayName = "CardContent";

// ============================================
// CARD FOOTER
// ============================================

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

// ============================================
// GLASS CARD (Premium Component)
// ============================================

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hoverEffect?: boolean;
  gradientBorder?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = false, hoverEffect = true, gradientBorder = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `relative overflow-hidden rounded-2xl
           bg-white/[0.03] backdrop-blur-xl
           border border-white/[0.08]
           transition-all duration-300`,
          hoverEffect && "hover:bg-white/[0.06] hover:border-white/[0.15] hover:-translate-y-0.5",
          glow && "shadow-glow-sm hover:shadow-glow-md",
          gradientBorder && "gradient-border",
          className
        )}
        {...props}
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, GlassCard };
