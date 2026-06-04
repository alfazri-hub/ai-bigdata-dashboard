"use client";

import React from "react";
import { Info, Cpu, ShieldCheck, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui";

export default function AboutPage() {
    return (
        <div className="max-w-[850px] mx-auto w-full px-6 py-8 md:py-12 animate-fade-in-up">
            <div className="mb-14 space-y-3">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent tracking-tight">
                    Tentang CloudCost AI Studio
                </h1>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Platform FinOps berbasis kecerdasan buatan yang memproyeksikan pengeluaran infrastruktur cloud Anda.
                </p>
            </div>

            <div className="space-y-10">
                <Card variant="default" className="p-8 bg-white/80 border border-slate-200/50 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-4">
                        <Info size={18} className="text-blue-600" /> Solusi Yang Kami Tawarkan
                    </h2>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        CloudCost AI dirancang untuk mengatasi masalah ketidakpastian anggaran operasional cloud. Menggunakan data historis dari 9 fitur esensial sistem cloud, kami memproses metrik kompleks untuk memberikan keputusan strategis kepada tim pengembang sebelum melakukan deployment skala besar.
                    </p>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card variant="glass" className="p-6 bg-white/70 border border-slate-200/50 rounded-[28px] hover:shadow-md transition-shadow">
                        <Cpu size={26} className="text-blue-600 mb-4 animate-bounce" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Model XGBoost</h3>
                        <p className="text-xs text-slate-500 font-medium mt-2.5 leading-relaxed">Prediksi presisi tinggi menggunakan pembobotan matematika terkomputerisasi secara real-time.</p>
                    </Card>
                    <Card variant="glass" className="p-6 bg-white/70 border border-slate-200/50 rounded-[28px] hover:shadow-md transition-shadow">
                        <ShieldCheck size={26} className="text-emerald-500 mb-4 animate-pulse" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Deteksi Anomali</h3>
                        <p className="text-xs text-slate-500 font-medium mt-2.5 leading-relaxed">Sistem cerdas mendeteksi lonjakan biaya tidak wajar pada arsitektur server jaringan.</p>
                    </Card>
                    <Card variant="glass" className="p-6 bg-white/70 border border-slate-200/50 rounded-[28px] hover:shadow-md transition-shadow">
                        <BarChart3 size={26} className="text-cyan-500 mb-4" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Rekomendasi FinOps</h3>
                        <p className="text-xs text-slate-500 font-medium mt-2.5 leading-relaxed">Saran otomatis berbasis efisiensi alokasi CPU untuk memangkas pengeluaran mubazir.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}