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
      <body className={`${inter.className} min-h-screen bg-[#05050f] text-slate-100 font-sans flex flex-col relative overflow-x-hidden`}>
        <PredictionProvider>
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-[200px] -left-[100px] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-[200px] -right-[100px] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full"></div>
          </div>

          <header className="h-24 border-b border-white/10 flex items-center justify-between px-6 sm:px-10 bg-[#0a0a16]/50 backdrop-blur-md sticky top-0 z-50 relative shrink-0">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 p-[2px]">
                <div className="w-full h-full bg-black rounded-xl border border-white/15 flex items-center justify-center">
                  <CloudCog size={18} className="text-blue-400 animate-pulse" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-lg tracking-wider block leading-none">
                  CloudCost AI
                </span>
                <span className="text-gray-400 font-semibold text-[10px] block mt-1.5 uppercase tracking-wider">
                  Kelompok Didikan Bapak Robin Sinurat ST., MT.
                </span>
              </div>
            </div>

            <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex items-center z-50">
              <Navbar />
            </div>
          </header>

          <main className="flex-1 relative z-10 py-6 md:py-10 px-4 sm:px-6">
            {children}
          </main>
        </PredictionProvider>
      </body>
    </html>
  );
}