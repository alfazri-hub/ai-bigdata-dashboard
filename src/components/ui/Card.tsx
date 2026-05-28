import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "dark" | "outline" | "glow" | "glow-purple";
  hoverable?: boolean;
}

export default function Card({
  className,
  variant = "default",
  hoverable = false,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-[28px] border transition-all duration-300";
  
  const variants = {
    default: "bg-white border-slate-200/80 shadow-sm shadow-slate-100/50",
    glass: "glass-light shadow-sm",
    dark: "bg-slate-900 border-slate-800 text-white shadow-xl shadow-slate-950/20",
    outline: "bg-transparent border-slate-200 text-slate-700",
    glow: "bg-white border-slate-200/80 shadow-sm hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    "glow-purple": "bg-slate-900/95 border-slate-800 text-white shadow-xl hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
  };

  const hoverStyles = hoverable 
    ? "hover:-translate-y-1 hover:shadow-md cursor-pointer" 
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

// Subcomponents for cleaner card structures

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
