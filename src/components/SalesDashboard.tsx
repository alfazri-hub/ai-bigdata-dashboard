"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Activity,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Server,
  Cpu,
  HardDrive,
  Globe,
  Calendar,
  ToggleLeft,
  Users,
  FileText,
  Cloud,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  CreditCard,
  Zap,
} from "lucide-react";
import { Card, Button } from "@/components/ui";
import { PredictionResult } from "@/lib/types";
import { formatUSD } from "@/lib/utils";

interface SalesDashboardProps {
  predictionResult: PredictionResult | null;
  history: PredictionResult[];
  setActiveTab: (tab: "form" | "result") => void;
}

/* ─── Param Row ──────────────────────────────────── */
const ParamRow = ({
  icon: Icon,
  label,
  value,
  accent = "blue",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent?: "blue" | "emerald" | "amber" | "indigo" | "rose" | "cyan";
}) => {
  const accentClasses: Record<string, string> = {
    blue: "text-blue-500 bg-blue-50",
    emerald: "text-emerald-500 bg-emerald-50",
    amber: "text-amber-500 bg-amber-50",
    indigo: "text-indigo-500 bg-indigo-50",
    rose: "text-rose-500 bg-rose-50",
    cyan: "text-cyan-500 bg-cyan-50",
  };
  return (
    <div className="flex items-center justify-between py-2.5 px-1 group hover:bg-slate-50/60 rounded-xl transition-colors">
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${accentClasses[accent]}`}
        >
          <Icon size={13} />
        </div>
        <span className="text-[11px] font-bold text-slate-500 truncate">
          {label}
        </span>
      </div>
      <span className="text-[11px] font-extrabold text-slate-800 text-right ml-3 shrink-0 max-w-[55%] truncate">
        {value}
      </span>
    </div>
  );
};

export const SalesDashboard: React.FC<SalesDashboardProps> = ({
  predictionResult,
  setActiveTab,
}) => {
  const activeResult = predictionResult;
  const [showAllParams, setShowAllParams] = useState(false);

  if (!activeResult) {
    return (
      <div className="p-6 sm:p-10 max-w-[800px] mx-auto w-full text-center py-24 space-y-6 animate-fade-in">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/20 rounded-full flex items-center justify-center mx-auto text-blue-500 border border-blue-100 dark:border-blue-900/30 shadow-inner">
          <DollarSign size={28} className="animate-bounce" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
            Belum Ada Hasil Estimasi
          </h2>
          <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
            Silakan lengkapi parameter arsitektur di tab Form Input untuk
            memulai kalkulasi biaya ML secara instan.
          </p>
        </div>
        <div className="pt-2">
          <Button
            variant="glow"
            onClick={() => setActiveTab("form")}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer"
          >
            Kalkulasi Baru
          </Button>
        </div>
      </div>
    );
  }

  const { input } = activeResult;

  const safeBiaya = Number.isFinite(activeResult.prediksi_biaya)
    ? activeResult.prediksi_biaya
    : 0;
  const safeCPU = Number.isFinite(Number(input.CPU_Utilization))
    ? Number(input.CPU_Utilization)
    : 0;
  const safeNetwork = Number.isFinite(Number(input.Network_Cost))
    ? Number(input.Network_Cost)
    : 0;
  const safeCompute = Number.isFinite(Number(input.Compute_Cost))
    ? Number(input.Compute_Cost)
    : 0;

  const analisis = activeResult.analisis_tambahan || {
    proyeksi_estimasi_biaya: safeBiaya * 1.05,
    nilai_potensi_penghematan: safeBiaya * 0.2,
    status_beban_kerja:
      safeCPU > 100
        ? "Kelebihan Beban"
        : safeCPU < 60
          ? "Kurang Dimanfaatkan"
          : "Optimal",
    indikator_deteksi_anomali:
      safeCPU > 95 || (safeCompute > 0 && safeNetwork > safeCompute * 1.5)
        ? 1
        : 0,
    rekomendasi_tindakan:
      safeCPU < 60
        ? "Kurangi alokasi CPU karena utilisasi rendah."
        : "Pertahankan arsitektur cloud Anda yang efisien.",
  };

  const akurasi = activeResult.akurasi_prediksi ?? 90.19;

  // CPU Efficiency (same formula as backend)
  const cpuEfficiency =
    input.Required_CPU_Hours > 0
      ? (input.Actual_CPU_Hours / input.Required_CPU_Hours) * 100
      : 100;

  return (
    <div className="p-6 sm:p-10 max-w-[950px] mx-auto w-full space-y-7 animate-fade-in-up">
      {/* ═══ Header ═══ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/40 pb-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 bg-clip-text text-transparent tracking-tight flex items-center gap-2 flex-wrap">
            Hasil Analisis Estimasi Biaya
            {activeResult.error && (
              <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                Mode Luring (Offline)
              </span>
            )}
          </h1>
          <p className="text-slate-500 text-xs mt-1 truncate font-semibold flex items-center gap-1.5">
            <Clock size={11} className="text-blue-400" />
            Waktu Prediksi:{" "}
            <span className="text-blue-600 font-extrabold">
              {activeResult.timestamp}
            </span>
            <span className="text-slate-300 mx-1">•</span>
            <span className="text-slate-600 font-extrabold">
              {input.Region}
            </span>
            <span className="text-slate-300 mx-1">•</span>
            <span className="text-slate-600 font-extrabold">
              {input.Service_Category}
            </span>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveTab("form")}
          className="rounded-xl text-xs font-black cursor-pointer shrink-0"
        >
          Kalkulasi Baru
        </Button>
      </div>

      {/* ═══ Anomali Alert ═══ */}
      {analisis.indikator_deteksi_anomali === 1 && (
        <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-[24px] flex items-center gap-3 text-rose-800 font-bold text-xs shadow-md shadow-rose-100/50 animate-pulse">
          <AlertTriangle size={20} className="text-rose-600 shrink-0" />
          <div>
            <span className="font-black uppercase tracking-wider block text-[10px] text-rose-500 leading-none">
              Peringatan Sistem
            </span>
            <span className="block mt-1">
              Terdeteksi lonjakan pemakaian ekstrem atau biaya jaringan yang
              tidak wajar pada sistem Anda!
            </span>
          </div>
        </div>
      )}

      {/* ═══ Main Cards Row ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Card 1: Estimasi Total Cost */}
        <Card className="md:col-span-4 flex flex-col justify-between items-center text-center border-none bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-[0_20px_50px_rgba(59,130,246,0.15)] rounded-[32px] p-8 relative overflow-hidden text-white min-h-[260px]">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-xl pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-200">
              💰 Estimasi Total Cost
            </span>
            <h3 className="text-xs text-blue-100 font-bold leading-relaxed">
              Hasil Perhitungan Biaya ML
            </h3>
          </div>
          <div className="my-4 relative z-10">
            <span className="text-5xl font-black text-white tracking-tight drop-shadow-sm">
              {activeResult.formatted || formatUSD(safeBiaya)}
            </span>
          </div>
          <div className="w-full relative z-10">
            {activeResult.error ? (
              <div className="p-3 bg-amber-500/20 border border-amber-500/25 rounded-2xl flex items-start gap-2.5 text-[10px] font-bold text-amber-100 text-left">
                <AlertTriangle
                  size={15}
                  className="shrink-0 mt-0.5 text-amber-300 animate-pulse"
                />
                <span>
                  <strong>Server Luring:</strong> Prediksi diestimasi secara
                  lokal.
                </span>
              </div>
            ) : (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/25 rounded-2xl flex items-start gap-2.5 text-[10px] font-bold text-emerald-100 text-left">
                <CheckCircle
                  size={15}
                  className="shrink-0 mt-0.5 text-emerald-300"
                />
                <span>
                  Server Online. Model ML menghitung prediksi secara presisi.
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Card 2: Status Efisiensi CPU */}
        <Card className="md:col-span-4 p-8 border border-slate-200/50 flex flex-col justify-between items-center text-center rounded-[32px] bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[260px]">
          <div className="pb-3 border-b border-slate-100 w-full">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
              ⚙️ Status Efisiensi CPU
            </h3>
          </div>
          <div className="my-4 flex flex-col items-center gap-3 w-full">
            <span className="text-4xl font-black text-slate-800">
              {(cpuEfficiency / 100).toFixed(2)}
            </span>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  (cpuEfficiency / 100) >= 0.85
                    ? "bg-emerald-500"
                    : (cpuEfficiency / 100) >= 0.60
                      ? "bg-amber-400"
                      : "bg-rose-500"
                }`}
                style={{ width: `${Math.min(cpuEfficiency, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold max-w-[180px] leading-relaxed">
              Rasio jam CPU aktual vs required (Utilisasi:{" "}
              <strong className="text-slate-700">
                {input.CPU_Utilization}%
              </strong>
              ).
            </p>
          </div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            Target Efisiensi: 1.00
          </div>
        </Card>

        {/* Card 3: Rekomendasi Sistem */}
        <Card className="md:col-span-4 p-8 border border-slate-200/50 flex flex-col justify-between items-center text-center rounded-[32px] bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[260px]">
          <div className="pb-3 border-b border-slate-100 w-full">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
              📌 Rekomendasi Sistem
            </h3>
          </div>
          <div className="my-4 flex flex-col items-center gap-3">
            <span
              className={`text-lg font-black uppercase px-5 py-2.5 rounded-2xl shadow-sm ${
                analisis.status_beban_kerja === "Kelebihan Beban"
                  ? "bg-rose-100 text-rose-700 animate-pulse"
                  : analisis.status_beban_kerja === "Kurang Dimanfaatkan"
                    ? "bg-amber-100 text-amber-700 animate-pulse"
                    : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {analisis.status_beban_kerja === "Kelebihan Beban"
                ? "⚠️ Kelebihan Beban"
                : analisis.status_beban_kerja === "Kurang Dimanfaatkan"
                  ? "⚠️ Kurang Dimanfaatkan"
                  : "✅ Optimal"}
            </span>
            <p className="text-[9.5px] text-slate-500 font-bold max-w-[200px] leading-relaxed">
              {analisis.rekomendasi_tindakan}
            </p>
          </div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            FinOps AI Recommendation
          </div>
        </Card>
      </div>

      {/* ═══ Parameter Prediksi yang Digunakan ═══ */}
      <Card className="border border-slate-200/60 rounded-[28px] bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        {/* Section Header */}
        <div className="px-7 pt-6 pb-4 border-b border-slate-100/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Layers size={15} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">
                  Parameter Prediksi yang Digunakan
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                  Semua 15 parameter input yang dikirim ke model ML
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-7 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-0">
            {/* Column 1 — Konfigurasi */}
            <div>
              <div className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5 px-1">
                <Server size={10} /> Konfigurasi
              </div>
              <div className="divide-y divide-slate-100">
                <ParamRow
                  icon={Server}
                  label="Kategori Layanan"
                  value={input.Service_Category}
                  accent="blue"
                />
                <ParamRow
                  icon={Globe}
                  label="Wilayah (Region)"
                  value={input.Region}
                  accent="cyan"
                />
                <ParamRow
                  icon={Calendar}
                  label="Periode Tagihan"
                  value={input.Billing_Period}
                  accent="indigo"
                />
                <ParamRow
                  icon={ToggleLeft}
                  label="Status Instansi"
                  value={input.Instance_Status}
                  accent="emerald"
                />
              </div>
            </div>

            {/* Column 2 — Kapasitas CPU */}
            <div>
              <div className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5 px-1">
                <Cpu size={10} /> Kapasitas CPU
              </div>
              <div className="divide-y divide-slate-100">
                <ParamRow
                  icon={Cpu}
                  label="CPU Required (Jam)"
                  value={`${input.Required_CPU_Hours.toLocaleString()} jam`}
                  accent="emerald"
                />
                <ParamRow
                  icon={Cpu}
                  label="CPU Aktual (Jam)"
                  value={`${input.Actual_CPU_Hours.toLocaleString()} jam`}
                  accent="emerald"
                />
                <ParamRow
                  icon={Activity}
                  label="Utilisasi CPU"
                  value={`${input.CPU_Utilization}%`}
                  accent="blue"
                />
                <ParamRow
                  icon={Zap}
                  label="Efisiensi CPU"
                  value={`${(cpuEfficiency / 100).toFixed(2)}`}
                  accent="amber"
                />
              </div>
            </div>

            {/* Column 3 — Biaya & Kapasitas */}
            <div>
              <div className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5 px-1">
                <CreditCard size={10} /> Penyimpanan
              </div>
              <div className="divide-y divide-slate-100">
                <ParamRow
                  icon={HardDrive}
                  label="Penyimpanan"
                  value={`${input.Storage_Used_GB.toLocaleString()} GB`}
                  accent="cyan"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};