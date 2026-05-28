import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
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
            "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl py-3 px-4 text-sm font-medium transition-all outline-none focus:bg-white focus:border-slate-400 dark:focus:border-slate-700 focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-900",
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
