"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative bg-white w-full max-w-lg p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto border border-neutral-200",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        {title && (
          <h2 className="text-xl font-serif font-medium tracking-wide uppercase text-neutral-900 mb-6 pb-2 border-b border-neutral-100">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
