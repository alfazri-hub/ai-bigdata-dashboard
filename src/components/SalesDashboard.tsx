import React from "react";
import {
  DollarSign,
  Activity,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { Card, Button } from "@/components/ui";
import { PredictionResult } from "@/lib/types";
import { formatUSD } from "@/lib/utils";

interface SalesDashboardProps {
  predictionResult: PredictionResult | null;
  history: PredictionResult[];
  setActiveTab: (tab: "form" | "result") => void;
}

export const SalesDashboard: React.FC<SalesDashboardProps> = ({
  predictionResult,
  setActiveTab,
}) => {
  const activeResult = predictionResult;

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
            Silakan lengkapi parameter arsitektur di tab Form Input untuk memulai kalkulasi biaya ML secara instan.
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

  const safeBiaya = Number.isFinite(activeResult.prediksi_biaya) ? activeResult.prediksi_biaya : 0;
  const safeCPU = Number.isFinite(Number(input.CPU_Utilization)) ? Number(input.CPU_Utilization) : 0;
  const safeNetwork = Number.isFinite(Number(input.Network_Cost)) ? Number(input.Network_Cost) : 0;
  const safeCompute = Number.isFinite(Number(input.Compute_Cost)) ? Number(input.Compute_Cost) : 0;

  const analisis = activeResult.analisis_tambahan || {
    proyeksi_estimasi_biaya: safeBiaya * 1.05,
    nilai_potensi_penghematan: safeBiaya * 0.2,
    status_beban_kerja: safeCPU > 85 ? "Kelebihan Beban" : safeCPU < 35 ? "Kurang Dimanfaatkan" : "Optimal",
    indikator_deteksi_anomali: (safeCPU > 95 || (safeCompute > 0 && safeNetwork > (safeCompute * 1.5))) ? 1 : 0,
    rekomendasi_tindakan: safeCPU < 35 ? "Kurangi alokasi CPU karena utilisasi rendah." : "Pertahankan arsitektur cloud Anda yang efisien."
  };

  const akurasi = activeResult.akurasi_prediksi ?? 90.19;

  return (
    <div className="p-6 sm:p-10 max-w-[900px] mx-auto w-full space-y-8 animate-fade-in-up">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/40 pb-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 bg-clip-text text-transparent tracking-tight flex items-center gap-2">
            Hasil Analisis Estimasi Biaya
            {activeResult.error && (
              <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                Mode Luring (Offline)
              </span>
            )}
          </h1>
          <p className="text-slate-500 text-xs mt-0.5 truncate font-semibold">
            Spesifikasi Sesi: <span className="text-blue-600 font-extrabold">{input.Project_Type || "Umum"}</span> &bull; {input.Cloud_Service} &bull; {input.Region}
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

      {/* Alert Anomali */}
      {analisis.indikator_deteksi_anomali === 1 && (
        <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-[24px] flex items-center gap-3 text-rose-800 font-bold text-xs shadow-md shadow-rose-100/50 animate-pulse">
          <AlertTriangle size={20} className="text-rose-600 shrink-0" />
          <div>
            <span className="font-black uppercase tracking-wider block text-[10px] text-rose-500 leading-none">Peringatan Sistem</span>
            <span className="block mt-1">Terdeteksi lonjakan pemakaian ekstrem atau biaya jaringan yang tidak wajar pada sistem Anda!</span>
          </div>
        </div>
      )}

      {/* Main Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Card Prediksi Utama */}
        <Card className="md:col-span-5 flex flex-col justify-between items-center text-center border-none bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-[0_20px_50px_rgba(59,130,246,0.15)] rounded-[32px] p-8 relative overflow-hidden text-white min-h-[260px]">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-200">Prediksi Total Biaya ML</span>
            <h3 className="text-xs text-blue-100 font-bold leading-relaxed">Estimasi Pengeluaran Dasar</h3>
          </div>
          <div className="my-4">
            <span className="text-5xl font-black text-white tracking-tight drop-shadow-sm">
              {activeResult.formatted || formatUSD(safeBiaya)}
            </span>
          </div>
          <div className="w-full">
            {activeResult.error ? (
              <div className="p-3 bg-amber-500/20 border border-amber-500/25 rounded-2xl flex items-start gap-2.5 text-[10px] font-bold text-amber-100 text-left">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-300 animate-pulse" />
                <span><strong>Server Luring:</strong> Prediksi diestimasi secara lokal.</span>
              </div>
            ) : (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/25 rounded-2xl flex items-start gap-2.5 text-[10px] font-bold text-emerald-100 text-left">
                <CheckCircle size={15} className="shrink-0 mt-0.5 text-emerald-300" />
                <span>Server Online. Model ML menghitung prediksi secara presisi.</span>
              </div>
            )}
          </div>
        </Card>

        {/* Card Status Beban */}
        <Card className="md:col-span-4 p-8 border border-slate-200/50 flex flex-col justify-between items-center text-center rounded-[32px] bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[260px]">
          <div className="pb-3 border-b border-slate-100 w-full">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Activity size={14} className="text-blue-500 animate-pulse" /> Status Beban Kerja
            </h3>
          </div>
          <div className="my-4 flex flex-col items-center gap-3">
            <span className={`text-lg font-black uppercase px-5 py-2.5 rounded-2xl shadow-sm ${analisis.status_beban_kerja === "Kelebihan Beban"
              ? "bg-rose-100 text-rose-700 animate-pulse"
              : analisis.status_beban_kerja === "Kurang Dimanfaatkan"
                ? "bg-amber-100 text-amber-700 animate-pulse"
                : "bg-emerald-100 text-emerald-700"
              }`}>
              {analisis.status_beban_kerja}
            </span>
            <p className="text-[10px] text-slate-400 font-bold max-w-[180px] leading-relaxed">
              Berdasarkan utilisasi CPU sebesar <strong className="text-slate-700">{input.CPU_Utilization}%</strong>.
            </p>
          </div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Health Check: OK</div>
        </Card>

        {/* Card Akurasi Prediksi */}
        <Card className="md:col-span-3 p-8 border border-slate-200/50 flex flex-col justify-between items-center text-center rounded-[32px] bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[260px]">
          <div className="pb-3 border-b border-slate-100 w-full">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles size={14} className="text-amber-500 animate-pulse" /> Akurasi Prediksi
            </h3>
          </div>
          <div className="my-4 flex flex-col items-center gap-3">
            <span className={`text-4xl font-black ${akurasi >= 85 ? "text-emerald-600" : akurasi >= 70 ? "text-amber-500" : "text-rose-500"
              }`}>
              {akurasi}%
            </span>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${akurasi >= 85 ? "bg-emerald-500" : akurasi >= 70 ? "bg-amber-400" : "bg-rose-500"
                  }`}
                style={{ width: `${akurasi}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold max-w-[160px] leading-relaxed">
              Tingkat kepercayaan model ML terhadap prediksi ini.
            </p>
          </div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Max: 90.19%</div>
        </Card>

      </div>

      {/* Bottom 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">

        <Card className="p-6 border border-slate-200/80 space-y-4 rounded-[28px] bg-white/80 backdrop-blur-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp size={14} className="text-indigo-500" /> Proyeksi Bulan Depan
            </h4>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-600">Tren</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-black text-slate-800 tracking-tight">
              {formatUSD(analisis.proyeksi_estimasi_biaya)}
            </div>
            <p className="text-[9.5px] text-slate-400 font-semibold leading-relaxed">
              Estimasi total pengeluaran bulan depan berdasarkan tren parameter input.
            </p>
          </div>
        </Card>

        <Card className="p-6 border border-slate-200/80 space-y-4 rounded-[28px] bg-white/80 backdrop-blur-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <DollarSign size={14} className="text-emerald-500 animate-pulse" /> Potensi Penghematan
            </h4>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">Optimal</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-black text-emerald-600 tracking-tight">
              {formatUSD(analisis.nilai_potensi_penghematan)}
            </div>
            <p className="text-[9.5px] text-slate-400 font-semibold leading-relaxed">
              Biaya yang dapat dihemat dengan menyelaraskan CPU aktual ke CPU required.
            </p>
          </div>
        </Card>

        <Card className="p-6 border border-slate-200/80 space-y-4 rounded-[28px] bg-white/80 backdrop-blur-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" /> Rekomendasi Tindakan
            </h4>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-600">Saran AI</span>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-black text-blue-600 leading-snug">
              {analisis.rekomendasi_tindakan}
            </div>
            <p className="text-[9.5px] text-slate-400 font-semibold leading-relaxed">
              Tindakan spesifik berdasarkan kondisi utilisasi dan efisiensi cloud Anda.
            </p>
          </div>
        </Card>

      </div>

    </div>
  );
};