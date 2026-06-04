"use client";

import React from "react";
import { Info, Cpu, ShieldCheck, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui";

export default function AboutPage() {
    return (
        <div className="max-w-[850px] mx-auto w-full px-6 py-8 md:py-12 animate-fade-in-up">
            <div className="mb-14 space-y-3">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
                    Tentang CloudCost AI Studio
                </h1>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    Platform FinOps berbasis kecerdasan buatan yang memproyeksikan pengeluaran infrastruktur cloud Anda.
                </p>
            </div>

            <div className="space-y-10">
                <Card variant="default" className="p-8 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
                    <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-4 relative z-10">
                        <Info size={18} className="text-blue-400" /> Solusi Yang Kami Tawarkan
                    </h2>
                    <p className="text-sm text-gray-300 font-medium leading-relaxed relative z-10">
                        CloudCost AI dirancang untuk mengatasi masalah ketidakpastian anggaran operasional cloud. Menggunakan data historis dari 9 fitur esensial sistem cloud, kami memproses metrik kompleks untuk memberikan keputusan strategis kepada tim pengembang sebelum melakukan deployment skala besar.
                    </p>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card variant="glass" className="p-6 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group">
                        <Cpu size={26} className="text-blue-400 mb-4 animate-bounce" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Model XGBoost</h3>
                        <p className="text-xs text-gray-400 font-medium mt-2.5 leading-relaxed">Prediksi presisi tinggi menggunakan pembobotan matematika terkomputerisasi secara real-time.</p>
                    </Card>
                    <Card variant="glass" className="p-6 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all group">
                        <ShieldCheck size={26} className="text-purple-400 mb-4 animate-pulse" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Deteksi Anomali</h3>
                        <p className="text-xs text-gray-400 font-medium mt-2.5 leading-relaxed">Sistem cerdas mendeteksi lonjakan biaya tidak wajar pada arsitektur server jaringan.</p>
                    </Card>
                    <Card variant="glass" className="p-6 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all group">
                        <BarChart3 size={26} className="text-cyan-400 mb-4" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Rekomendasi FinOps</h3>
                        <p className="text-xs text-gray-400 font-medium mt-2.5 leading-relaxed">Saran otomatis berbasis efisiensi alokasi CPU untuk memangkas pengeluaran mubazir.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}