"use client";

import React from "react";
import {
  DollarSign, AlertTriangle, CheckCircle, Clock, Server, Globe, Calendar, ToggleLeft, Cpu, Activity, Zap, CreditCard, HardDrive, Layers, Trash2
} from "lucide-react";
import { Card, Button } from "@/components/ui";
import { formatUSD } from "@/lib/utils";
import { usePrediction } from "@/context/PredictionContext";
import { useRouter } from "next/navigation";

const ParamRow = ({ icon: Icon, label, value, accent = "blue", }: {
  icon: React.ElementType; label: string; value: string | number; accent?: "blue" | "emerald" | "amber" | "indigo" | "rose" | "cyan";
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
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${accentClasses[accent]}`}>
          <Icon size={13} />
        </div>
        <span className="text-[11px] font-bold text-slate-500 truncate">{label}</span>
      </div>
      <span className="text-[11px] font-extrabold text-slate-800 text-right ml-3 shrink-0 max-w-[55%] truncate">{value}</span>
    </div>
  );
};

export const SalesDashboard: React.FC = () => {
  const { predictionResult, history, setPredictionResult, clearHistory, deleteHistoryItem } = usePrediction();
  const router = useRouter();

  if (!predictionResult) {
    return (
      <div className="p-6 sm:p-10 max-w-[950px] mx-auto w-full space-y-8 animate-fade-in text-white">
        <div className="text-center py-16 space-y-6 bg-[#121226]/60 border border-white/5 rounded-[32px] p-8 backdrop-blur-sm shadow-xl shadow-black/25">
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/25 rounded-full flex items-center justify-center mx-auto text-blue-400 shadow-lg shadow-blue-500/5">
            <DollarSign size={28} className="animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-black text-white tracking-tight">Belum Ada Hasil Estimasi</h2>
            <p className="text-xs text-gray-400 font-semibold max-w-sm mx-auto leading-relaxed">
              Silakan lengkapi parameter arsitektur di tab Form Input untuk memulai kalkulasi biaya ML secara instan.
            </p>
          </div>
          <div className="pt-2">
            <Button onClick={() => router.push("/input")} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-xs uppercase tracking-wider hover:opacity-90 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition duration-300">
              Kalkulasi Baru
            </Button>
          </div>
        </div>

        {/* Show history even if active prediction result is null */}
        {history && history.length > 0 && (
          <Card variant="default" className="border border-white/5 rounded-[28px] bg-[#121226]/80 backdrop-blur-sm shadow-xl shadow-black/25 overflow-hidden text-left">
            <div className="px-7 pt-6 pb-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-md shadow-purple-500/10">
                  <Clock size={15} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">Riwayat Estimasi</h3>
                  <p className="text-[10px] font-medium text-gray-400 mt-0.5">Daftar perhitungan biaya ML sebelumnya</p>
                </div>
              </div>
              <button
                onClick={clearHistory}
                className="text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-wider bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-1.5 rounded-xl border border-rose-500/20 self-start sm:self-auto cursor-pointer"
              >
                Hapus Semua
              </button>
            </div>
            <div className="px-7 py-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[9px] font-extrabold text-gray-500 uppercase tracking-wider">
                      <th className="pb-3 pr-4">Waktu</th>
                      <th className="pb-3 px-4">Region & Layanan</th>
                      <th className="pb-3 px-4">CPU & Storage</th>
                      <th className="pb-3 px-4 text-right">Biaya</th>
                      <th className="pb-3 pl-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {history.map((item, idx) => {
                      const itemBiaya = Number.isFinite(item.prediksi_biaya) ? item.prediksi_biaya : 0;
                      return (
                        <tr key={idx} className="text-xs text-gray-300 hover:bg-white/5 transition-colors group">
                          <td className="py-3.5 pr-4 font-medium text-[11px] text-gray-400">
                            {item.timestamp}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-bold px-2 py-0.5 rounded-md">{item.input.Region}</span>
                              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-bold px-2 py-0.5 rounded-md">{item.input.Service_Category}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[11px] text-gray-400">
                            {item.input.Actual_CPU_Hours} jam CPU • {item.input.Storage_Used_GB} GB
                          </td>
                          <td className="py-3.5 px-4 text-right font-extrabold text-white">
                            {item.formatted || formatUSD(itemBiaya)}
                          </td>
                          <td className="py-3.5 pl-4 text-right font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setPredictionResult(item)}
                                className="text-[10px] font-bold px-3 py-1.5 rounded-xl border bg-[#121226]/50 hover:bg-blue-600 border-white/10 hover:border-blue-500 text-white shadow-sm transition-all cursor-pointer"
                              >
                                Lihat
                              </button>
                              <button
                                onClick={() => deleteHistoryItem(item.timestamp)}
                                className="text-gray-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/10 transition-all cursor-pointer"
                                title="Hapus"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  const { input } = predictionResult;
  const safeBiaya = Number.isFinite(predictionResult.prediksi_biaya) ? predictionResult.prediksi_biaya : 0;
  const safeCPU = Number.isFinite(Number(input.CPU_Utilization)) ? Number(input.CPU_Utilization) : 0;
  const safeCompute = Number.isFinite(Number(input.Compute_Cost)) ? Number(input.Compute_Cost) : 0;
  const safeNetwork = Number.isFinite(Number(input.Network_Cost)) ? Number(input.Network_Cost) : 0;

  const analisis = predictionResult.analisis_tambahan || {
    proyeksi_estimasi_biaya: safeBiaya * 1.05,
    nilai_potensi_penghematan: safeBiaya * 0.2,
    status_beban_kerja: safeCPU > 100 ? "Kelebihan Beban" : safeCPU < 60 ? "Kurang Dimanfaatkan" : "Optimal",
    indikator_deteksi_anomali: safeCPU > 95 || (safeCompute > 0 && safeNetwork > safeCompute * 1.5) ? 1 : 0,
    rekomendasi_tindakan: safeCPU < 60 ? "Kurangi alokasi CPU karena utilisasi rendah." : "Pertahankan arsitektur cloud Anda yang efisien.",
  };

  const cpuEfficiency = input.Required_CPU_Hours > 0 ? (input.Actual_CPU_Hours / input.Required_CPU_Hours) * 100 : 100;

  return (
    <div className="p-6 sm:p-10 max-w-[950px] mx-auto w-full space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight flex items-center gap-2 flex-wrap">
            Hasil Analisis Estimasi Biaya
          </h1>
          <p className="text-gray-400 text-xs mt-1.5 truncate font-medium flex items-center gap-1.5">
            <Clock size={11} className="text-blue-400" />
            Waktu Prediksi: <span className="text-blue-400 font-semibold">{predictionResult.timestamp}</span>
            <span className="text-gray-600 mx-1">•</span>
            <span className="text-gray-300 font-semibold">{input.Region}</span>
          </p>
        </div>
        <Button onClick={() => router.push("/input")} className="rounded-xl text-xs font-semibold cursor-pointer shrink-0 bg-[#121226]/80 hover:bg-white/5 border border-white/10 text-white px-4 py-2">
          Kalkulasi Baru
        </Button>
      </div>

      {analisis.indikator_deteksi_anomali === 1 && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-[24px] flex items-center gap-3 text-rose-300 font-semibold text-xs shadow-md shadow-rose-950/20 animate-pulse">
          <AlertTriangle size={20} className="text-rose-400 shrink-0 animate-bounce" />
          <div>
            <span className="font-extrabold uppercase tracking-wider block text-[10px] text-rose-400 leading-none">Peringatan Sistem</span>
            <span className="block mt-1.5">Terdeteksi lonjakan pemakaian ekstrem atau biaya jaringan yang tidak wajar pada sistem Anda!</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <Card variant="default" className="md:col-span-4 flex flex-col justify-between items-center text-center bg-gradient-to-tr from-blue-600/20 via-[#121226]/90 to-purple-600/20 shadow-[0_20px_50px_rgba(59,130,246,0.15)] rounded-[32px] p-8 border border-white/5 relative overflow-hidden text-white min-h-[260px] group hover:border-blue-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-cyan-400">💰 Estimasi Total Cost</span>
            <h3 className="text-xs text-gray-300 font-medium leading-relaxed">Hasil Perhitungan Biaya ML</h3>
          </div>
          <div className="my-4 relative z-10">
            <span className="text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">{predictionResult.formatted || formatUSD(safeBiaya)}</span>
          </div>
          <div className="w-full relative z-10">
            {predictionResult.error ? (
              <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-2xl flex items-start gap-2.5 text-[10px] font-medium text-amber-200 text-left">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-400 animate-pulse" />
                <span><strong>Server Luring:</strong> Prediksi diestimasi secara lokal.</span>
              </div>
            ) : (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-start gap-2.5 text-[10px] font-medium text-emerald-200 text-left">
                <CheckCircle size={15} className="shrink-0 mt-0.5 text-emerald-400" />
                <span>Server Online. Model ML menghitung prediksi secara presisi.</span>
              </div>
            )}
          </div>
        </Card>

        <Card variant="default" className="md:col-span-4 p-8 border border-white/5 flex flex-col justify-between items-center text-center rounded-[32px] bg-[#121226]/80 backdrop-blur-sm min-h-[260px] group hover:border-purple-500/30 transition-all duration-300">
          <div className="pb-3 border-b border-white/5 w-full">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center justify-center gap-1.5">⚙️ Status Efisiensi CPU</h3>
          </div>
          <div className="my-2 relative z-10">
            <span className="text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">{(cpuEfficiency / 100).toFixed(2)}</span>
          </div>
          <div className="w-full space-y-3 relative z-10">
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <div className={`h-full rounded-full transition-all duration-700 ${(cpuEfficiency / 100) >= 0.85 ? "bg-emerald-500" : (cpuEfficiency / 100) >= 0.60 ? "bg-amber-400" : "bg-rose-500"}`} style={{ width: `${Math.min(cpuEfficiency, 100)}%` }} />
            </div>
            <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Rasio jam CPU aktual vs required (Utilisasi: <strong className="text-white">{input.CPU_Utilization}%</strong>).</p>
          </div>
        </Card>

        <Card variant="default" className="md:col-span-4 p-8 border border-white/5 flex flex-col justify-between items-center text-center rounded-[32px] bg-[#121226]/80 backdrop-blur-sm min-h-[260px] group hover:border-cyan-500/30 transition-all duration-300">
          <div className="pb-3 border-b border-white/5 w-full">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center justify-center gap-1.5">📌 Rekomendasi Sistem</h3>
          </div>
          <div className="my-2 relative z-10 w-full flex justify-center">
            <span className={`text-base font-extrabold uppercase px-5 py-2.5 rounded-2xl shadow-md border ${analisis.status_beban_kerja === "Kelebihan Beban" ? "bg-rose-500/10 border-rose-500/25 text-rose-300" : analisis.status_beban_kerja === "Kurang Dimanfaatkan" ? "bg-amber-500/10 border-amber-500/25 text-amber-300" : "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"}`}>
              {analisis.status_beban_kerja === "Kelebihan Beban" ? "⚠️ Kelebihan Beban" : analisis.status_beban_kerja === "Kurang Dimanfaatkan" ? "⚠️ Kurang Dimanfaatkan" : "✅ Optimal"}
            </span>
          </div>
          <div className="w-full relative z-10 min-h-[40px] flex items-center justify-center">
            <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-[200px]">{analisis.rekomendasi_tindakan}</p>
          </div>
        </Card>
      </div>

      <Card variant="default" className="border border-white/5 rounded-[28px] bg-[#121226]/80 backdrop-blur-sm shadow-xl shadow-black/25 overflow-hidden">
        <div className="px-7 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/10"><Layers size={15} className="text-white" /></div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Parameter Prediksi yang Digunakan</h3>
              <p className="text-[10px] font-medium text-gray-400 mt-0.5">Semua parameter input yang dikirim ke model ML</p>
            </div>
          </div>
        </div>
        <div className="px-7 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5"><Server size={10} /> Konfigurasi</div>
              <div className="divide-y divide-white/5">
                <ParamRow icon={Server} label="Kategori Layanan" value={input.Service_Category} accent="blue" />
                <ParamRow icon={Globe} label="Wilayah (Region)" value={input.Region} accent="cyan" />
                <ParamRow icon={Calendar} label="Periode Tagihan" value={input.Billing_Period} accent="indigo" />
                <ParamRow icon={ToggleLeft} label="Status Instansi" value={input.Instance_Status} accent="emerald" />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5"><Cpu size={10} /> Kapasitas CPU</div>
              <div className="divide-y divide-white/5">
                <ParamRow icon={Cpu} label="CPU Required (Jam)" value={`${input.Required_CPU_Hours.toLocaleString()} jam`} accent="emerald" />
                <ParamRow icon={Cpu} label="CPU Aktual (Jam)" value={`${input.Actual_CPU_Hours.toLocaleString()} jam`} accent="emerald" />
                <ParamRow icon={Activity} label="Utilisasi CPU" value={`${input.CPU_Utilization}%`} accent="blue" />
                <ParamRow icon={Zap} label="Efisiensi CPU" value={`${(cpuEfficiency / 100).toFixed(2)}`} accent="amber" />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5"><HardDrive size={10} /> Penyimpanan</div>
              <div className="divide-y divide-white/5">
                <ParamRow icon={HardDrive} label="Penyimpanan" value={`${input.Storage_Used_GB.toLocaleString()} GB`} accent="cyan" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Prediction History Card */}
      {history && history.length > 0 && (
        <Card variant="default" className="border border-white/5 rounded-[28px] bg-[#121226]/80 backdrop-blur-sm shadow-xl shadow-black/25 overflow-hidden text-left">
          <div className="px-7 pt-6 pb-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-md shadow-purple-500/10">
                <Clock size={15} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Riwayat Estimasi</h3>
                <p className="text-[10px] font-medium text-gray-400 mt-0.5">Daftar perhitungan biaya ML sebelumnya</p>
              </div>
            </div>
            <button
              onClick={clearHistory}
              className="text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-wider bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-1.5 rounded-xl border border-rose-500/20 self-start sm:self-auto cursor-pointer"
            >
              Hapus Semua
            </button>
          </div>
          <div className="px-7 py-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] font-extrabold text-gray-500 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Waktu</th>
                    <th className="pb-3 px-4">Region & Layanan</th>
                    <th className="pb-3 px-4">CPU & Storage</th>
                    <th className="pb-3 px-4 text-right">Biaya</th>
                    <th className="pb-3 pl-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {history.map((item, idx) => {
                    const itemBiaya = Number.isFinite(item.prediksi_biaya) ? item.prediksi_biaya : 0;
                    const isActive = predictionResult && predictionResult.timestamp === item.timestamp;
                    return (
                      <tr key={idx} className={`text-xs text-gray-300 hover:bg-white/5 transition-colors group ${isActive ? 'bg-blue-500/5' : ''}`}>
                        <td className="py-3.5 pr-4 font-medium text-[11px] text-gray-400">
                          {item.timestamp}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-bold px-2 py-0.5 rounded-md">{item.input.Region}</span>
                            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-bold px-2 py-0.5 rounded-md">{item.input.Service_Category}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[11px] text-gray-400">
                          {item.input.Actual_CPU_Hours} jam CPU • {item.input.Storage_Used_GB} GB
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-white">
                          {item.formatted || formatUSD(itemBiaya)}
                        </td>
                        <td className="py-3.5 pl-4 text-right font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setPredictionResult(item)}
                              disabled={isActive}
                              className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${isActive ? 'bg-blue-600/20 border-blue-500/30 text-blue-400 cursor-default' : 'bg-[#121226]/50 hover:bg-blue-600 border-white/10 hover:border-blue-500 text-white shadow-sm'}`}
                            >
                              {isActive ? 'Aktif' : 'Lihat'}
                            </button>
                            <button
                              onClick={() => deleteHistoryItem(item.timestamp)}
                              className="text-gray-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/10 transition-all cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};