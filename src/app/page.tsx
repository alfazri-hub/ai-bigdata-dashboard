"use client";

import React from "react";
import { Users, Sparkles } from "lucide-react";
import { Card } from "@/components/ui";

const teamMembers = [
  { name: "Reski Faras Adiefa", photo: "/images/reski.png" },
  { name: "Muhammad Al Fazri", photo: "/images/fazri.png" },
  { name: "Rolas Dwi Putra Sijabat", photo: "/images/rolas.png" },
  { name: "Auranisa Amalia", photo: "/images/auranisa.png" }
];

export default function HomePage() {
  return (
    <div className="max-w-[1000px] mx-auto w-full px-6 py-8 md:py-12 animate-fade-in-up">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md mb-4 animate-pulse">
          <Sparkles size={11} /> Meet Our Professional Team
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight leading-tight">
          Kolaborasi Kreatif di Balik CloudCost AI
        </h1>
        <p className="text-sm text-gray-400 font-medium max-w-lg mx-auto mt-4 leading-relaxed">
          Kami adalah tim pengembang berdedikasi tinggi yang menggabungkan kecerdasan buatan dengan efisiensi pengelolaan infrastruktur cloud.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[850px] mx-auto">
        {/* Left Column (2 Members) */}
        <div className="flex flex-col gap-8 animate-slide-in-left">
          {teamMembers.slice(0, 2).map((member, idx) => (
            <Card key={idx} variant="default" className="p-8 text-center flex flex-col items-center justify-center min-h-[260px] bg-[#121226]/80 border border-white/5 backdrop-blur-sm rounded-[28px] relative overflow-hidden group hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/15 transition-all"></div>
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 shadow-lg shadow-blue-500/10 mb-4 transition-all duration-300 relative z-10 flex items-center justify-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">{member.name}</h3>
              </div>
              <div className="w-full pt-4 mt-6 border-t border-white/5 text-[11px] font-semibold text-gray-500 flex items-center justify-center gap-1.5 relative z-10">
                <Users size={12} className="text-gray-500" /> Anggota Kelompok
              </div>
            </Card>
          ))}
        </div>

        {/* Right Column (2 Members) */}
        <div className="flex flex-col gap-8 animate-slide-in-right">
          {teamMembers.slice(2, 4).map((member, idx) => (
            <Card key={idx} variant="default" className="p-8 text-center flex flex-col items-center justify-center min-h-[260px] bg-[#121226]/80 border border-white/5 backdrop-blur-sm rounded-[28px] relative overflow-hidden group hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-all"></div>
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-purple-500/50 shadow-lg shadow-purple-500/10 mb-4 transition-all duration-300 relative z-10 flex items-center justify-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-purple-400 transition-colors duration-300">{member.name}</h3>
              </div>
              <div className="w-full pt-4 mt-6 border-t border-white/5 text-[11px] font-semibold text-gray-500 flex items-center justify-center gap-1.5 relative z-10">
                <Users size={12} className="text-gray-500" /> Anggota Kelompok
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}