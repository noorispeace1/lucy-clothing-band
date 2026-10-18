import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none text-xs";

    const variants = {
      primary:
        "bg-black text-white hover:bg-neutral-800 border border-black active:scale-[0.99]",
      secondary:
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200",
      outline:
        "bg-transparent text-neutral-900 border border-neutral-900 hover:bg-neutral-900 hover:text-white",
      ghost:
        "bg-transparent text-neutral-700 hover:text-black hover:bg-neutral-100",
      gold:
        "bg-[#b38e5d] text-white hover:bg-[#9c7849] border border-[#b38e5d] shadow-sm",
    };

    const sizes = {
      sm: "px-4 py-2 text-[11px]",
      md: "px-6 py-3 text-xs tracking-[0.15em]",
      lg: "px-8 py-4 text-xs tracking-[0.2em]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
