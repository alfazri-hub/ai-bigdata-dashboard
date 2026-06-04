"use client";

import React from "react";
import { Users, Sparkles } from "lucide-react";
import { Card } from "@/components/ui";

const teamMembers = [
  { name: "Nama Kamu", role: "AI & Frontend Lead", initial: "NK", desc: "Bertanggung jawab atas arsitektur dashboard dan integrasi model ML." },
  { name: "Rekan Tim 1", role: "Backend Engineer", initial: "R1", desc: "Mengembangkan REST API dan mengelola pipeline model data cloud." },
  { name: "Rekan Tim 2", role: "Data Scientist", initial: "R2", desc: "Melatih model XGBoost untuk memprediksi estimasi finansial cloud." },
  { name: "Rekan Tim 3", role: "UI/UX Designer", initial: "R3", desc: "Merancang antarmuka aplikasi agar interaktif, bersih, dan minimalis." }
];

export default function HomePage() {
  return (
    <div className="max-w-[1000px] mx-auto w-full px-6 py-8 md:py-12 animate-fade-in-up">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md mb-4 animate-pulse">
          <Sparkles size={11} /> Meet Our Professional Team
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent tracking-tight leading-tight">
          Kolaborasi Kreatif di Balik CloudCost AI
        </h1>
        <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto mt-4 leading-relaxed">
          Kami adalah tim pengembang berdedikasi tinggi yang menggabungkan kecerdasan buatan dengan efisiensi pengelolaan infrastruktur cloud.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map((member, idx) => (
          <Card key={idx} variant="glass" className="p-6 text-center flex flex-col items-center justify-between min-h-[300px] bg-white/70 border border-slate-200/50 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shadow-lg shadow-blue-500/10 mb-4">
              {member.initial}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-850 tracking-tight">{member.name}</h3>
              <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mt-1">{member.role}</p>
              <p className="text-xs text-slate-500 font-medium mt-3 leading-relaxed px-1">{member.desc}</p>
            </div>
            <div className="w-full pt-4 mt-4 border-t border-slate-100 text-xs font-semibold text-slate-400 flex items-center justify-center gap-1.5">
              <Users size={12} className="text-slate-400" /> Anggota Kelompok
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}