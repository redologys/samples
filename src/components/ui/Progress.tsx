"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

// ============================================
// PROGRESS BAR
// ============================================

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "default" | "primary" | "accent" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  animated?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = "primary", size = "md", showValue = false, animated = true, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const variantClasses = {
    default: "bg-neutral-400",
    primary: "bg-gradient-to-r from-primary-500 to-primary-400",
    accent: "bg-gradient-to-r from-accent-500 to-accent-400",
    success: "bg-gradient-to-r from-success-500 to-success-400",
    warning: "bg-gradient-to-r from-warning-500 to-warning-400",
    error: "bg-gradient-to-r from-error-500 to-error-400",
  };

  return (
    <div className="w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-neutral-800",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variantClasses[variant],
            animated && "relative overflow-hidden"
          )}
          style={{ width: `${value || 0}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
      {showValue && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-neutral-400">{Math.round(value || 0)}%</span>
        </div>
      )}
    </div>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

// ============================================
// STEP PROGRESS (for booking flow)
// ============================================

export interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  className?: string;
}

const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(
  ({ currentStep, totalSteps, labels, className }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)}>
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-neutral-400">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary-400">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Step dots */}
        <div className="flex justify-between mt-4">
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNumber = i + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted && "bg-primary-500 text-white",
                    isCurrent && "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow-sm",
                    isUpcoming && "bg-neutral-800 text-neutral-500 border border-neutral-700"
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                {labels && labels[i] && (
                  <span
                    className={cn(
                      "mt-2 text-xs text-center max-w-[80px]",
                      isCurrent ? "text-white font-medium" : "text-neutral-500"
                    )}
                  >
                    {labels[i]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Connecting lines */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-4 -z-10" style={{ top: "calc(2rem + 1rem)" }}>
          {Array.from({ length: totalSteps - 1 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 h-0.5 mx-2",
                i + 1 < currentStep ? "bg-primary-500" : "bg-neutral-700"
              )}
            />
          ))}
        </div>
      </div>
    );
  }
);

StepProgress.displayName = "StepProgress";

export { Progress, StepProgress };
