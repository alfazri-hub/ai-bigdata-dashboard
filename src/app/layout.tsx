import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CloudCog } from "lucide-react";
import { PredictionProvider } from "@/context/PredictionContext";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CloudCost AI Studio",
  description: "Dashboard for AI Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-tr from-[#F4F7FC] via-[#EEF2F9] to-[#F4F9F6] text-slate-800 font-sans flex flex-col relative overflow-x-hidden`}>
        <PredictionProvider>
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 blur-[130px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 blur-[130px] pointer-events-none z-0" />

          <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-6 sm:px-10 shrink-0 sticky top-0 z-50 shadow-sm shadow-slate-100/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <CloudCog size={20} />
              </div>
              <div>
                <span className="font-black text-slate-900 text-base tracking-tight block leading-none">
                  CloudCost AI
                </span>
                <span className="text-blue-600 font-extrabold text-[10px] block mt-0.5 uppercase tracking-wider">
                  Kelompok Asik &bull; FinOps Dashboard
                </span>
              </div>
            </div>

            <Navbar />
          </header>

          <main className="flex-1 relative z-10 py-6 md:py-10 px-4 sm:px-6">
            {children}
          </main>
        </PredictionProvider>
      </body>
    </html>
  );
}