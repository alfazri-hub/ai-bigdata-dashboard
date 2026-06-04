"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/input", label: "Input" },
  { href: "/output", label: "Output" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/30 shadow-inner gap-1 relative z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 relative cursor-pointer",
              isActive
                ? "bg-white text-blue-600 shadow-sm border border-slate-250/10 scale-105"
                : "text-slate-600 hover:text-blue-500 hover:bg-white/40"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
