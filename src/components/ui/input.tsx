import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label className="text-[11px] font-semibold tracking-wider uppercase text-neutral-600">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full px-4 py-3 bg-white border border-neutral-300 text-sm placeholder:text-neutral-400 placeholder:text-xs tracking-wide focus:outline-none focus:border-black transition-colors duration-200",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-[11px] text-red-600 mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
