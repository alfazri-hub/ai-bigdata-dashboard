"use client";

import React from "react";
import {
    Database,
    Trash2,
    Wrench,
    Filter,
    Sliders,
    Cpu,
    Gauge,
    Key,
    Binary,
    Brain,
    Workflow,
    TrendingUp,
    Sparkles
} from "lucide-react";
import { Card } from "@/components/ui";

export default function AboutPage() {
    return (
        <div className="max-w-[950px] mx-auto w-full px-4 py-8 md:py-12 animate-fade-in-up">
            {/* Header section */}
            <div className="mb-14 text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md mb-2 animate-pulse">
                    <Sparkles size={11} /> Pipeline & Metode AI
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-tight leading-tight">
                    Proses Pengolahan & Model AI
                </h1>
                <p className="text-sm text-gray-400 font-medium max-w-xl mx-auto leading-relaxed">
                    Bagaimana kami membersihkan data, merekayasa fitur, dan melatih model kecerdasan buatan untuk menghasilkan proyeksi biaya cloud yang presisi.
                </p>
            </div>

            {/* Stages Grid or Stack */}
            <div className="space-y-12">

                {/* TAHAP 1: Pembersihan Data */}
                <Card variant="default" className="p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                    <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500"></div>

                    <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                        {/* Phase Icon & Label */}
                        <div className="flex flex-col items-center md:items-start shrink-0">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-3">
                                <Database size={26} className="text-blue-100" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h2 className="text-xl font-extrabold text-white tracking-tight">
                                    Pembersihan Data (Data Cleaning)
                                </h2>
                                <p className="text-sm text-gray-400 font-medium mt-2 leading-relaxed">
                                    Kami menggunakan Cloud Storage & FinOps Dataset yang berisi puluhan ribu rekaman transaksi server. Sebelum dipelajari oleh AI, data ini harus dibersihkan dari "sampah" agar model tidak salah belajar:
                                </p>
                            </div>

                            {/* Sub-items Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                                            <Trash2 size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Penghapusan Data Tidak Relevan</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Kolom seperti Instance_ID dan nomor urut dibuang karena tidak memiliki nilai prediktif.
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                                            <Wrench size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Perbaikan Typo (Kategorisasi)</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Terdapat ribuan salah ketik pada jenis layanan. Kami menyaring dan menstandarisasi 20 layanan teratas, lalu mengelompokkan sisanya ke dalam kategori "Other".
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                                            <Filter size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Penanganan Data Kosong (Missing Values)</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Data numerik yang kosong diisi dengan nilai tengah (Median), sedangkan data teks diisi dengan nilai yang paling sering muncul (Mode).
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                                            <Sliders size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Penjinakan Outlier</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Untuk tagihan yang nilainya tidak masuk akal (terlalu ekstrem), kami menggunakan metode statistik IQR (Interquartile Range) Capping. Nilai ekstrem tersebut tidak dihapus, melainkan dibatasi ke ambang wajar agar AI tidak bias.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* TAHAP 2: Rekayasa Fitur */}
                <Card variant="default" className="p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                    <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-500"></div>

                    <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                        {/* Phase Icon & Label */}
                        <div className="flex flex-col items-center md:items-start shrink-0">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 mb-3">
                                <Cpu size={26} className="text-purple-100 animate-pulse" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h2 className="text-xl font-extrabold text-white tracking-tight">
                                    Rekayasa Fitur (Feature Engineering)
                                </h2>
                                <p className="text-sm text-gray-400 font-medium mt-2 leading-relaxed">
                                    AI butuh bantuan logika bisnis untuk memahami data. Pada tahap ini, kami menciptakan fitur baru dan mengubah format data:
                                </p>
                            </div>

                            {/* Sub-items Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                                            <Gauge size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pembuatan Fitur CPU_Efficiency</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Kami membagi CPU yang terpakai dengan CPU yang diminta. Rasio ini menjadi indikator utama sistem untuk mendeteksi apakah server Anda Underutilized (Mubazir) atau Optimal.
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                                            <Key size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Seleksi 9 Fitur Esensial</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Dari puluhan variabel, kami mengerucutkan data menjadi 9 parameter paling krusial untuk mencegah data leakage (kebocoran kunci jawaban ke model).
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                                            <Binary size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Label Encoding</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Karena komputer hanya memahami angka, seluruh data teks seperti Region (US-East, Asia) dan Status disandikan menjadi format numerik menggunakan algoritma khusus yang kamusnya disimpan secara permanen.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* TAHAP 3: Pelatihan Model */}
                <Card variant="default" className="p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                    <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-500"></div>

                    <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                        {/* Phase Icon & Label */}
                        <div className="flex flex-col items-center md:items-start shrink-0">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 mb-3">
                                <Brain size={26} className="text-emerald-100" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h2 className="text-xl font-extrabold text-white tracking-tight">
                                    Pelatihan Model (Data Modeling)
                                </h2>
                                <p className="text-sm text-gray-400 font-medium mt-2 leading-relaxed">
                                    Kami membagi data menjadi dua bagian: 80% untuk bahan belajar (Training) dan 20% untuk ujian (Testing). Kami tidak hanya menebak algoritma, melainkan mengadu dua algoritma yang berbeda:
                                </p>
                            </div>

                            {/* Sub-items Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                                            <Workflow size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">XGBoost (Extreme Gradient Boosting)</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Algoritma Ensemble Tree yang sangat kuat untuk menangani pola non-linear dan kompleks pada harga cloud.
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                                            <TrendingUp size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Ridge Regression</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Algoritma regresi linear dengan penalti (regularization) yang bertindak sebagai baseline (standar pembanding) yang cepat dan stabil.
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                                            <Sliders size={16} />
                                        </div>
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Hyperparameter Tuning</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Kami menggunakan teknik RandomizedSearchCV untuk mencoba puluhan kombinasi "setelan mesin" secara otomatis guna mencari konfigurasi paling optimal untuk kedua algoritma tersebut.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}
