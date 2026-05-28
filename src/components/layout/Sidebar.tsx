"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Cpu,
  Inbox,
  Layout,
  LucideIcon,
  Settings,
  Share2,
  ChevronRight,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}

function NavItem({ icon: Icon, label, href, active = false, badge }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between rounded-2xl px-4.5 py-3 transition-all duration-200",
        active
          ? "bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold"
          : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-100"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={cn(
            "transition-colors",
            active 
              ? "text-slate-900 dark:text-emerald-400" 
              : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200"
          )}
          size={18}
        />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {badge ? (
        <span className="rounded-full bg-slate-900 dark:bg-emerald-500 px-2 py-0.5 text-[9px] font-black text-white dark:text-slate-950">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

interface FavoriteItemProps {
  color: string;
  label: string;
}

function FavoriteItem({ color, label }: FavoriteItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900/30 px-4 py-3 border border-slate-100/50 dark:border-slate-800/30 transition hover:bg-slate-100 dark:hover:bg-slate-900/60 cursor-pointer">
      <span className={cn("inline-flex h-3 w-3 rounded-full border-2", color)} />
      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</span>
    </div>
  );
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      <div className="space-y-8">
        {/* Logo and App Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">
              d
            </div>
            <div>
              <span className="font-black text-slate-900 dark:text-white text-lg tracking-tighter">
                distri
              </span>
              <span className="text-emerald-500 font-extrabold text-xs block -mt-1">
                AI & Big Data
              </span>
            </div>
          </div>

          {/* Close button inside mobile drawer */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* User Profile Card */}
        <div className="flex items-center gap-4 rounded-3xl bg-slate-950 dark:bg-slate-900/80 p-4 text-white shadow-xl shadow-slate-950/20 border border-slate-800 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
          <div className="relative shrink-0">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Avatar"
              className="h-11 w-11 rounded-2xl border border-white/20 shadow-inner"
            />
            <span className="absolute -bottom-0.5 -right-0.5 inline-flex h-3 w-3 rounded-full border border-white bg-emerald-400 animate-pulse" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 leading-none">Administrator</p>
            <p className="text-sm font-extrabold text-white mt-1 truncate">Data.Admin</p>
            <p className="text-[10px] text-slate-300 font-semibold truncate">Lead AI Engineer</p>
          </div>
        </div>

        {/* Dashboards Category */}
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 pl-2">
            Dashboards
          </p>
          <nav className="space-y-1">
            <NavItem 
              icon={Layout} 
              label="Sales Dashboard" 
              href="/" 
              active={pathname === "/"} 
            />
            <NavItem 
              icon={Cpu} 
              label="AI Studio Dashboard" 
              href="/dashboard" 
              active={pathname === "/dashboard"} 
            />
          </nav>
        </div>

        {/* AI Engineering Category */}
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 pl-2">
            AI Engineering
          </p>
          <nav className="space-y-1">
            <NavItem icon={Inbox} label="Datasets" href="/dashboard#" badge="5" />
            <NavItem icon={Cpu} label="Models" href="/dashboard#" />
            <NavItem icon={Share2} label="Pipelines" href="/dashboard#" />
            <NavItem icon={Calendar} label="Schedules" href="/dashboard#" />
            <NavItem icon={Settings} label="Settings" href="/dashboard#" />
          </nav>
        </div>

        {/* Favorites Category */}
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 pl-2">
            Favorites
          </p>
          <div className="space-y-2">
            <FavoriteItem color="border-sky-400" label="NLP Engine Alpha" />
            <FavoriteItem color="border-rose-400" label="Vision API Mockup" />
            <FavoriteItem color="border-emerald-400" label="Data Lake Revamp" />
          </div>
        </div>
      </div>

      {/* Footer shortcut / copy */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-900/60 mt-auto">
        <p className="text-[10px] text-slate-400 font-semibold text-center">
          © 2026 AI Studio &bull; v2.1.0
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar (inline, hidden on mobile/tablet) */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-900/80 px-6 py-8 justify-between">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar (Drawer Overlay, shown when isOpen is true) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          {/* Sliding Drawer Container */}
          <aside className="relative w-72 h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 px-6 py-8 flex flex-col justify-between animate-slide-in-left shadow-2xl overflow-y-auto">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
