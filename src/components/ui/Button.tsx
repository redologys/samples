"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 
   whitespace-nowrap text-sm font-bold uppercase tracking-wide
   transition-all duration-200 ease-out
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-yellow
   disabled:pointer-events-none disabled:opacity-50
   active:scale-[0.98]
   [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-none border-2 border-brand-black`,
  {
    variants: {
      variant: {
        primary: `
          bg-brand-yellow text-brand-black
          hover:bg-brand-white
        `,
        secondary: `
          bg-brand-black text-white border-white
          hover:bg-brand-pink hover:border-brand-pink hover:text-white
        `,
        accent: `
          bg-brand-pink text-white
          hover:bg-brand-white hover:text-brand-black
        `,
        destructive: `
          bg-red-600 text-white
          hover:bg-red-700
        `,
        outline: `
          bg-transparent text-white border-white
          hover:bg-white hover:text-black
        `,
        "outline-dark": `
          bg-transparent text-black border-black
          hover:bg-black hover:text-yellow-400
        `,
        ghost: `
          bg-transparent text-black border-transparent
          hover:bg-neutral-100
        `,
        link: `
          text-brand-black underline-offset-4 border-none
          hover:underline
        `,
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-12 w-12",
        "icon-sm": "h-9 w-9",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
