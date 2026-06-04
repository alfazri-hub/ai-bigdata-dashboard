"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// 1. AVATAR COMPONENT
// ==========================================
export function Avatar({
  initials,
  color,
  border = "border-white"
}: {
  initials: string;
  color: string;
  border?: string;
}) {
  return (
    <div className={`w-8 h-8 rounded-full border-2 ${border} ${color} flex items-center justify-center text-xs font-bold text-white z-10 relative shadow-sm`}>
      {initials}
    </div>
  );
}

// ==========================================
// 2. BUTTON COMPONENT
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glow" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 active:scale-98 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer";

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white shadow-lg shadow-blue-500/10 border border-white/10 focus:ring-purple-500 focus:ring-offset-black",
    secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/5 focus:ring-white/20 focus:ring-offset-black",
    glow: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] border border-blue-500/30 focus:ring-blue-500 focus:ring-offset-black",
    outline: "bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white focus:ring-white/10 focus:ring-offset-black",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white focus:ring-white/5 focus:ring-offset-black",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-4.5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {!isLoading && children}
      {!isLoading && rightIcon}
    </button>
  );
}

// ==========================================
// 3. CARD COMPONENT
// ==========================================
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "dark" | "outline" | "glow" | "glow-purple";
  hoverable?: boolean;
}

export function Card({
  className,
  variant = "default",
  hoverable = false,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-[28px] border transition-all duration-300";

  const variants = {
    default: "bg-[#121226]/85 border-white/5 backdrop-blur-md shadow-lg shadow-black/35 text-white",
    glass: "bg-[#121226]/60 border-white/5 backdrop-blur-lg shadow-lg shadow-black/25 text-white",
    dark: "bg-[#0a0a16]/95 border-white/10 text-white shadow-2xl",
    outline: "bg-transparent border-white/10 text-gray-300",
    glow: "bg-[#121226]/80 border-white/5 backdrop-blur-sm shadow-md hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] text-white",
    "glow-purple": "bg-[#121226]/80 border-white/5 backdrop-blur-sm shadow-md hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] text-white",
  };

  const hoverStyles = hoverable
    ? "hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
    : "";

  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-start justify-between p-6 pb-3 border-b border-transparent gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 pt-3 flex items-center justify-between border-t border-transparent", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-bold text-slate-800 dark:text-slate-100 leading-tight tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-slate-400 dark:text-slate-500 font-medium", className)}
      {...props}
    >
      {children}
    </p>
  );
}

// ==========================================
// 4. INPUT COMPONENT
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  className,
  label,
  error,
  leftIcon,
  rightIcon,
  id,
  type = "text",
  ...props
}: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          type={type}
          className={cn(
            "w-full bg-[#121226]/50 border border-white/10 text-white rounded-2xl py-3 px-4 text-sm font-medium transition-all outline-none focus:bg-[#121226]/85 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10",
            leftIcon ? "pl-11" : "",
            rightIcon ? "pr-11" : "",
            error ? "border-rose-400 focus:border-rose-400 focus:ring-rose-50 dark:focus:ring-rose-950/20" : "",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 text-slate-400 dark:text-slate-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs font-bold text-rose-500 dark:text-rose-400 ml-1">
          {error}
        </span>
      )}
    </div>
  );
}

// ==========================================
// 5. MODAL COMPONENT
// ==========================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "center" | "drawer";
  className?: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  variant = "center",
  className,
  children,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);

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
