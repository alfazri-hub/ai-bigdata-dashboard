"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Settings,
  User,
  LayoutDashboard,
  TrendingUp,
  Box,
  Users,
  ChevronDown,
  Filter,
  Calendar,
  Info,
  Globe,
  Check,
  ChevronRight,
  TrendingDown,
  Sliders,
  Menu,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import DataChart from "@/components/charts/DataChart";
import { Button, Card, CardHeader, CardContent, CardTitle, CardDescription, Input, Modal } from "@/components/ui";
import { salesTrends, salesLocalization } from "@/lib/dummyData";
import { formatIDR, formatNumber } from "@/lib/utils";

export default function DashboardSederhana() {
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const [activeKpi, setActiveKpi] = useState<string>("Total Sales Order Value");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeChannelFilter, setActiveChannelFilter] = useState("all");
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Widget customizer states (which cards to show)
  const kpiList = [
    "Total Sales Order Value",
    "SO Value Growth (YoY)",
    "Total Sales Revenue",
    "Revenue Growth (YoY)",
    "Order Fulfillment Rate",
    "Fulfillment Rate",
    "Fulfilled Volume Growth",
    "Sales Volume Growth"
  ];
  const [visibleKpis, setVisibleKpis] = useState<string[]>(kpiList);

  const t = salesLocalization[lang];

  // Helper to generate realistic localized metric card content
  const getKpiDisplay = (key: string) => {
    // If filter is applied, we scale values down slightly to show dynamic updates
    const scale = isFilterApplied ? 0.85 : 1;

    switch (key) {
      case "Total Sales Order Value":
        return {
          val: formatIDR(Math.round(1493875 * scale)),
          drop: "-52.72%",
          isNegative: true,
          spark: [30, 42, 68, 89, 120, 149, 135],
        };
      case "SO Value Growth (YoY)":
        return {
          val: "-80.31%",
          drop: "",
          isNegative: true,
          spark: [-10, -30, -60, -80.3],
        };
      case "Total Sales Revenue":
        return {
          val: formatIDR(Math.round(319875 * scale)),
          drop: "-81.63%",
          isNegative: true,
          spark: [8, 12, 19, 25, 29, 31.9, 30.5],
        };
      case "Revenue Growth (YoY)":
        return {
          val: "-88.25%",
          drop: "",
          isNegative: true,
          spark: [-15, -40, -75, -88.25],
        };
      case "Order Fulfillment Rate":
        return {
          val: "50%",
          drop: "-57.14%",
          isNegative: true,
          spark: [85, 80, 70, 60, 55, 50, 52],
        };
      case "Fulfillment Rate":
        return {
          val: "50%",
          drop: "-57.14%",
          isNegative: true,
          spark: [85, 80, 70, 60, 55, 50, 52],
        };
      case "Fulfilled Volume Growth":
        return {
          val: "100%",
          drop: "",
          isNegative: false,
          spark: [20, 50, 100],
        };
      case "Sales Volume Growth":
        return {
          val: "100%",
          drop: "",
          isNegative: false,
          spark: [30, 65, 100],
        };
      default:
        return { val: "0", drop: "", isNegative: false, spark: [] };
    }
  };

  // Switch visibility in modal
  const toggleKpiVisibility = (key: string) => {
    if (visibleKpis.includes(key)) {
      if (visibleKpis.length > 1) {
        setVisibleKpis(visibleKpis.filter(k => k !== key));
      }
    } else {
      setVisibleKpis([...visibleKpis, key]);
    }
  };

  const handleApplyFilter = () => {
    setIsFilterApplied(activeChannelFilter !== "all");
    setShowFilterModal(false);
  };

  // Sparkline path generator
  const getSparklinePath = (points: number[], width = 80, height = 30) => {
    if (!points.length) return "";
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min === 0 ? 1 : max - min;

    return points
      .map((val, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * height * 0.8 - height * 0.1;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      {/* Unified Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header - Glassmorphic, highly elegant */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-10 shrink-0 sticky top-0 z-10 shadow-sm shadow-slate-100/50">
          <div className="flex items-center gap-4 sm:gap-5 text-sm">
            {/* Mobile Hamburger menu for Left Sidebar */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl transition duration-200 cursor-pointer shrink-0"
              title="Open Navigation"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="flex items-center gap-6">
            {/* Dashboard switcher shortcut */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200/60 rounded-xl text-xs font-bold text-emerald-800 transition duration-200 shadow-sm"
            >
              <span>AI Studio Dashboard</span>
              <ChevronRight size={14} className="text-emerald-600 animate-pulse" />
            </Link>

            <div className="w-px h-6 bg-slate-200"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors rounded-2xl flex items-center justify-center text-slate-600 shadow-inner">
                <User size={18} className="text-emerald-700" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition">Agnes H.</p>
                <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Owner</p>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>

            <div className="flex gap-3 border-l border-slate-200 pl-6">
              <button className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all hover:scale-105 cursor-pointer relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white" />
              </button>
              <button className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all hover:scale-105 cursor-pointer">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full space-y-8">
          {/* Title and Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {t.title}
              </h1>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                Monitor your operations, check performance margins, and configure widgets.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={isFilterApplied ? "glow" : "outline"}
                leftIcon={<Filter size={16} />}
                onClick={() => setShowFilterModal(true)}
              >
                {t.filter} {isFilterApplied && "(Active)"}
              </Button>
              <Button
                variant="outline"
                leftIcon={<Calendar size={16} />}
              >
                22 Jul 2024 - 29 Jul 2024
              </Button>
              <Button
                variant="primary"
                leftIcon={<Sliders size={16} />}
                onClick={() => setShowSettingsModal(true)}
              >
                {t.settings}
              </Button>
            </div>
          </div>

          {/* Grid KPI Cards - Glowing Hover and Sparkline Integrations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleKpis.map((key) => {
              const item = getKpiDisplay(key);
              const isSelected = activeKpi === key;
              const localizedName = t.kpiNames[key as keyof typeof t.kpiNames] || key;

              return (
                <Card
                  key={key}
                  variant={isSelected ? "glow" : "default"}
                  onClick={() => setActiveKpi(key)}
                  className={`cursor-pointer p-6 relative flex flex-col justify-between h-[160px] group transition-all duration-300 border-2 ${isSelected
                    ? "border-emerald-500 scale-[1.02] shadow-emerald-100/40"
                    : "border-slate-100 hover:border-slate-200 shadow-slate-100/50 hover:shadow-lg"
                    }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider group-hover:text-emerald-700 transition">
                        {localizedName}
                      </p>
                      <Info
                        size={14}
                        className="text-slate-300 group-hover:text-slate-400 transition shrink-0"
                      />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-1 leading-none">
                      {item.val}
                    </h3>
                  </div>

                  <div className="flex items-end justify-between mt-auto">
                    {/* Dynamic Trend tag */}
                    {item.drop ? (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-600 text-xs font-extrabold rounded-xl border border-rose-100">
                        <TrendingDown size={12} />
                        <span>{item.drop}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-extrabold rounded-xl border border-emerald-100">
                        <TrendingUp size={12} />
                        <span>+100%</span>
                      </div>
                    )}

                    {/* SVG Sparkline drawing */}
                    {item.spark.length > 0 && (
                      <div className="w-20 h-8">
                        <svg className="w-full h-full overflow-visible">
                          <path
                            d={getSparklinePath(item.spark, 80, 32)}
                            fill="none"
                            stroke={isSelected ? "#10b981" : "#cbd5e1"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="transition-all duration-300"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Bagian Grafik Visual Utama */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recharts dynamic line/area chart (2/3 width) */}
            <Card className="lg:col-span-2 p-8 shadow-sm border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    {t.chartTitle}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                    {t.chartSubtitle} &bull; <span className="text-emerald-700 font-bold">{t.kpiNames[activeKpi as keyof typeof t.kpiNames] || activeKpi}</span>
                  </p>
                </div>

                {/* Active Indicator details */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-right">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Active series</p>
                  <p className="text-sm font-bold text-slate-700">{getKpiDisplay(activeKpi).val}</p>
                </div>
              </div>

              {/* Responsive dynamic charts engine wrapper */}
              <div className="w-full">
                <DataChart
                  data={salesTrends[activeKpi] || salesTrends["Total Sales Order Value"]}
                  type="area"
                  height={280}
                  xAxisKey="date"
                  series={[
                    { key: "approved", name: t.legendApproved, color: "#10b981" },
                    { key: "submitted", name: t.legendSubmitted, color: "#f43f5e" },
                    { key: "delivered", name: t.legendDelivered, color: "#3b82f6" },
                  ]}
                />
              </div>

              {/* Legends container */}
              <div className="flex flex-wrap justify-center gap-6 mt-6 border-t border-slate-100 pt-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>{" "}
                  {t.legendApproved}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  {t.legendSubmitted}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  {t.legendDelivered}
                </div>
              </div>
            </Card>

            {/* Custom Funnel Overview (1/3 width) */}
            <Card className="p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {t.transactionOverview}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                  {t.transactionSubtitle}
                </p>
              </div>

              {/* Beautiful custom HTML layered funnel charts */}
              <div className="flex-1 flex flex-col justify-center gap-6 py-6">
                {/* Submitted - Tier 1 */}
                <div className="space-y-1.5 relative group">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>{t.submitted}</span>
                    <span className="text-slate-600">10 (100%)</span>
                  </div>
                  <div className="w-full h-11 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 rounded-2xl relative shadow-lg shadow-blue-100 transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />
                    <span className="text-white font-extrabold text-sm tracking-wide">100% Ingestion</span>
                  </div>
                </div>

                {/* Approved - Tier 2 */}
                <div className="space-y-1.5 relative group">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>{t.approved}</span>
                    <span className="text-slate-600">5 (50%)</span>
                  </div>
                  <div className="w-11/12 h-11 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 rounded-2xl relative shadow-lg shadow-emerald-100 transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />
                    <span className="text-white font-extrabold text-sm tracking-wide">50% Success</span>
                  </div>
                  {/* Pipeline drop percentage details */}
                  <span className="absolute -bottom-4.5 right-6 text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
                    -50% Ingestion Drop
                  </span>
                </div>

                {/* Delivered - Tier 3 */}
                <div className="space-y-1.5 relative group mt-3">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>{t.delivered}</span>
                    <span className="text-slate-600">2 (20%)</span>
                  </div>
                  <div className="w-8/12 h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-2xl relative shadow-lg shadow-amber-100 transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />
                    <span className="text-white font-extrabold text-sm tracking-wide">20% Fulfillment</span>
                  </div>
                  <span className="absolute -bottom-4.5 right-1/3 text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
                    -60% Delivery Drop
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Conversion Rate Overall: <span className="text-emerald-600 font-extrabold">20.0%</span>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Filter Modal */}
      <Modal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filter Dashboard Data"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
              Select Distribution Channel
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "all", name: "All Channels" },
                { id: "retail", name: "Retail Stores" },
                { id: "online", name: "E-Commerce" },
                { id: "wholesale", name: "Wholesale Distributor" },
              ].map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannelFilter(channel.id)}
                  className={`p-3 rounded-2xl text-sm font-semibold border transition-all text-left flex items-center justify-between cursor-pointer ${activeChannelFilter === channel.id
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  <span>{channel.name}</span>
                  {activeChannelFilter === channel.id && <Check size={16} className="text-emerald-700" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
            <Info size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Applying these filters will update values across all active KPI widgets and recalculate the time series data dynamically.
            </p>
          </div>

          <div className="flex gap-3 justify-end border-t border-slate-100 pt-6">
            <Button variant="outline" onClick={() => setShowFilterModal(false)}>
              Cancel
            </Button>
            <Button variant="glow" onClick={handleApplyFilter}>
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>

      {/* Widget Settings Modal */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="Customize Widget Dashboard"
      >
        <div className="space-y-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Toggle visibility of active metrics in the main grid
          </p>

          <div className="space-y-2">
            {kpiList.map((kpi) => {
              const isChecked = visibleKpis.includes(kpi);
              const localizedName = t.kpiNames[kpi as keyof typeof t.kpiNames] || kpi;
              return (
                <div
                  key={kpi}
                  onClick={() => toggleKpiVisibility(kpi)}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-2xl cursor-pointer transition"
                >
                  <span className="text-sm font-bold text-slate-700">{localizedName}</span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${isChecked
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                      : "bg-white border-slate-300"
                      }`}
                  >
                    {isChecked && <Check size={14} />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
            <Button variant="primary" className="w-full" onClick={() => setShowSettingsModal(false)}>
              Save Settings
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
