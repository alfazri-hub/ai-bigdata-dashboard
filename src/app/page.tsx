"use client";

import React, { useState } from "react";
import { LayoutDashboard, CloudCog } from "lucide-react";
import { cn, formatUSD } from "@/lib/utils";
import { SalesDashboard } from "@/components/SalesDashboard";
import { AIDashboard } from "@/components/AIDashboard";
import { predictBiaya } from "@/lib/api";
import { CloudCostInput, PredictionResult } from "@/lib/types";

export default function UnifiedDashboard() {
  const [activeTab, setActiveTab] = useState<"form" | "result">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<PredictionResult[]>([]);

  const handlePredict = async (input: CloudCostInput) => {
    setIsLoading(true);
    try {
      const res = await predictBiaya(input);
      const rawBiaya = Number(res.prediksi_biaya);
      const safeBiaya = Number.isFinite(rawBiaya) ? rawBiaya : 0;
      const rawAnalisis = (res as any).analisis_tambahan;
      const safeAnalisis = rawAnalisis ? {
        proyeksi_estimasi_biaya: Number.isFinite(Number(rawAnalisis.proyeksi_estimasi_biaya)) ? Number(rawAnalisis.proyeksi_estimasi_biaya) : safeBiaya * 1.05,
        nilai_potensi_penghematan: Number.isFinite(Number(rawAnalisis.nilai_potensi_penghematan)) ? Number(rawAnalisis.nilai_potensi_penghematan) : 0,
        status_beban_kerja: rawAnalisis.status_beban_kerja || "Optimal",
        indikator_deteksi_anomali: Number(rawAnalisis.indikator_deteksi_anomali) || 0,
        rekomendasi_tindakan: rawAnalisis.rekomendasi_tindakan || "Pertahankan arsitektur cloud Anda yang efisien.",
      } : undefined;
      const result: PredictionResult = {
        prediksi_biaya: safeBiaya,
        formatted: res.formatted || formatUSD(safeBiaya),
        input,
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit", minute: "2-digit", second: "2-digit"
        }),
        error: (res as any).error,
        akurasi_prediksi: (res as any).akurasi_prediksi,
        analisis_tambahan: safeAnalisis,
      };
      setPredictionResult(result);
      setHistory((prev) => [result, ...prev].slice(0, 10));
      setTimeout(() => {
        setIsLoading(false);
        setActiveTab("result");
      }, 800);
    } catch (e: any) {
      console.error(e);
      setIsLoading(false);
      const errMsg = e?.message || "Terjadi kesalahan tidak dikenal.";
      alert(`Gagal melakukan prediksi:\n${errMsg}\n\nPastikan server backend Anda berjalan di http://localhost:8000`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#F4F7FC] via-[#EEF2F9] to-[#F4F9F6] text-slate-800 font-sans flex flex-col relative overflow-hidden">

      {/* Premium Floating Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[30%] left-[30%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-400/5 to-purple-400/5 blur-[150px] pointer-events-none z-0" />

      {/* Header */}
      <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-6 sm:px-10 shrink-0 sticky top-0 z-10 shadow-sm shadow-slate-100/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <CloudCog size={20} />
          </div>
          <div>
            <span className="font-black text-slate-900 text-base tracking-tight block leading-none">
              CloudCost AI
            </span>
            <span className="text-blue-600 font-extrabold text-[10px] block mt-0.5 uppercase tracking-wider">
              Kelompok Asik &bull; Prediksi Biaya ML
            </span>
          </div>
        </div>

        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/30 shadow-inner">
          <button
            onClick={() => setActiveTab("form")}
            className={cn(
              "flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
              activeTab === "form"
                ? "bg-white text-blue-600 shadow-md shadow-blue-500/5"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <CloudCog size={14} className="text-blue-500" />
            <span>Form Input</span>
          </button>
          <button
            onClick={() => setActiveTab("result")}
            className={cn(
              "flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
              activeTab === "result"
                ? "bg-white text-blue-600 shadow-md shadow-blue-500/5"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <LayoutDashboard size={14} className="text-cyan-500" />
            <span>Hasil Prediksi</span>
          </button>
        </div>
        <div className="hidden md:flex items-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/20">
            {history.length} Prediksi Sesi Ini
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative z-1">
        {activeTab === "form" ? (
          <AIDashboard onPredict={handlePredict} isLoading={isLoading} />
        ) : (
          <SalesDashboard
            predictionResult={predictionResult}
            history={history}
            setActiveTab={setActiveTab}
          />
        )}
      </main>
    </div>
  );
}