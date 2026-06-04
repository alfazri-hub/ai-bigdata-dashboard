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
    <nav className="flex bg-[#0a0a16]/90 backdrop-blur-2xl p-1.5 rounded-2xl border border-white/10 gap-2 relative z-50 shadow-[0_12px_40px_rgba(0,0,0,0.5),_0_0_20px_rgba(59,130,246,0.05)] hover:border-white/15 transition-all duration-500">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4.5 py-2.5 rounded-xl text-xs font-semibold border border-transparent transition-all duration-300 ease-out relative cursor-pointer select-none flex flex-col items-center justify-center min-w-[72px] active:scale-95",
              isActive
                ? "bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.25),_inset_0_0_6px_rgba(59,130,246,0.1)] scale-105 font-bold"
                : "text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/5 hover:scale-[1.02]"
            )}
          >
            <span className="relative z-10">{item.label}</span>
            {isActive && (
              <span className="absolute bottom-1 w-4 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-fade-in-up" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
