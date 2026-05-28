"use client";

import React from "react";
import Link from "next/link";
import { Bell, Search, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
  title?: string;
}

export default function Navbar({ className, title }: NavbarProps) {
  return (
    <nav
      className={cn(
        "h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-900/80 flex items-center justify-between px-8 shrink-0 sticky top-0 z-30",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {title ? (
          <h1 className="text-md font-bold tracking-tight text-slate-800 dark:text-slate-100">
            {title}
          </h1>
        ) : (
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-full py-1.5 pl-9 pr-4 text-xs outline-none border border-slate-100 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-slate-350 dark:focus:border-slate-700 w-48 sm:w-64 transition-all"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Alerts and Quick settings */}
        <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 rounded-full transition relative cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
        </button>

        <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 rounded-full transition cursor-pointer">
          <Settings size={18} />
        </button>

        <div className="w-px h-5 bg-slate-200 dark:bg-slate-800" />

        {/* Profile */}
        <Link href="#" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 transition">
            <User size={16} />
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden sm:inline group-hover:text-emerald-600 transition">
            Admin
          </span>
        </Link>
      </div>
    </nav>
  );
}
