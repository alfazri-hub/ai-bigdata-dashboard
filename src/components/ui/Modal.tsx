import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "center" | "drawer"; // drawer slides in from the right
  className?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  variant = "center",
  className,
  children,
}: ModalProps) {
  // Listen for Escape key to close the modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    
    // Prevent background scrolling when open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full m-0 h-full rounded-none",
  };

  const containerStyles = variant === "center"
    ? "flex items-center justify-center p-4"
    : "flex justify-end";

  const modalStyles = variant === "center"
    ? cn(
        "relative w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col animate-fade-in-up",
        sizes[size],
        className
      )
    : cn(
        "relative w-full max-w-lg h-screen bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-8 flex flex-col justify-between animate-slide-in-right",
        className
      );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Container */}
      <div className={cn("absolute inset-0 overflow-hidden flex", containerStyles)}>
        {/* Modal/Drawer Box */}
        <div className={modalStyles}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 shrink-0">
            {title ? (
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                {title}
              </h2>
            ) : (
              <div />
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto pr-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
