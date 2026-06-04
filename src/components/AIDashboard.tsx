"use client";
import React, { useState, useEffect } from "react";
import {
  Server, HardDrive, CreditCard, Loader2, Sparkles, ChevronDown,
  Info, MapPin, Calendar, ToggleLeft, Database, Globe, Cpu, Activity
} from "lucide-react";
import { CloudCostInput, OptionsResponse } from "@/lib/types";
import { getOptions } from "@/lib/api";

interface AIDashboardProps {
  onPredict: (input: CloudCostInput) => Promise<void>;
  isLoading: boolean;
}

interface ShortInput {
  Region: string;
  Billing_Period: string;
  Service_Category: string;
  Instance_Status: string;
  Storage_Used_GB: number | "";
  Required_CPU_Hours: number | "";
  Actual_CPU_Hours: number | "";
  CPU_Utilization: number | "";
  Compute_Cost: number | "";
  Storage_Cost: number | "";
  Network_Cost: number | "";
}

const defaultShortInput: ShortInput = {
  Region: "",
  Billing_Period: "",
  Service_Category: "",
  Instance_Status: "",
  Storage_Used_GB: "",
  Required_CPU_Hours: "",
  Actual_CPU_Hours: "",
  CPU_Utilization: "",
  Compute_Cost: "",
  Storage_Cost: "",
  Network_Cost: "",
};

const SERVICE_CATEGORIES = [
  { value: "Compute", label: "Komputasi (Compute)" },
  { value: "Storage", label: "Penyimpanan (Storage)" },
  { value: "Database", label: "Basis Data (Database)" },
  { value: "Network", label: "Jaringan (Network)" },
  { value: "Security", label: "Keamanan (Security)" },
  { value: "Backup", label: "Cadangan (Backup)" },
  { value: "Analytics", label: "Analitik (Analytics)" },
];

const SelectField = ({ label, icon: Icon, value, onChange, options, placeholder }: {
  label: string; icon: React.ElementType; value: string;
  onChange: (v: string) => void; options: { value: string; label: string }[] | string[]; placeholder: string;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-650 uppercase tracking-widest flex items-center gap-1.5 ml-1">
      <Icon size={12} className="text-blue-600 animate-pulse" />{label}
    </label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white hover:bg-slate-50/50 border border-slate-200 text-slate-800 rounded-2xl py-3.5 pl-4 pr-9 text-xs font-bold outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition shadow-sm">
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const val = typeof o === "string" ? o : o.value;
          const lbl = typeof o === "string" ? o : o.label;
          return <option key={val} value={val}>{lbl}</option>;
        })}
      </select>
      <ChevronDown size={14} className="absolute right-3.5 top-4 text-slate-450 pointer-events-none" />
    </div>
  </div>
);

const NumberField = ({ label, icon: Icon, value, onChange, placeholder, prefix, hint }: {
  label: string; icon: React.ElementType; value: number | "";
  onChange: (v: number | "") => void; placeholder?: string; prefix?: string; hint?: string;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-650 uppercase tracking-widest flex items-center gap-1.5 ml-1">
      <Icon size={12} className="text-blue-600 animate-pulse" />{label}
    </label>
    <div className="relative">
      {prefix && <span className="absolute left-4 top-3.5 text-xs font-black text-slate-400">{prefix}</span>}
      <input type="number" min={0} value={value} onChange={(e) => {
        const val = e.target.value;
        onChange(val === "" ? "" : parseFloat(val) || 0);
      }}
        placeholder={placeholder || "0"}
        className={`w-full bg-white hover:bg-slate-50/50 border border-slate-200 text-slate-800 rounded-2xl py-3.5 text-xs font-bold outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition shadow-sm ${prefix ? "pl-8 pr-4" : "px-4"}`} />
    </div>
    {hint && <p className="text-[9px] text-slate-400 font-semibold ml-1">{hint}</p>}
  </div>
);

export const AIDashboard: React.FC<AIDashboardProps> = ({ onPredict, isLoading }) => {
  const [input, setInput] = useState<ShortInput>(defaultShortInput);
  const [options, setOptions] = useState<OptionsResponse | null>(null);

  useEffect(() => {
    getOptions().then(setOptions).catch(() => setOptions(null));
  }, []);

  const set = (key: keyof ShortInput) => (val: string | number | "") =>
    setInput((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullInput: CloudCostInput = {
      Project_Type: "Analytics",
      Cloud_Service: "AWS S3",
      Service_Category: input.Service_Category || "Compute",
      Billing_Period: input.Billing_Period || "Monthly",
      Required_CPU_Hours: Number(input.Required_CPU_Hours) || 372,
      Actual_CPU_Hours: Number(input.Actual_CPU_Hours) || 372,
      CPU_Utilization: Number(input.CPU_Utilization) || 50,
      Storage_Used_GB: Number(input.Storage_Used_GB) || 0,
      Storage_Cost: Number(input.Storage_Cost) || 0,
      Compute_Cost: Number(input.Compute_Cost) || 0,
      Network_Cost: Number(input.Network_Cost) || 0,
      Region: input.Region || "US-East-1",
      Owner_Team: "DevOps",
      Instance_Status: input.Instance_Status || "Running",
      Remarks: "Optimal",
    };

    onPredict(fullInput);
  };

  const opts = {
    Region: options?.Region || [
      "Africa-North1",
      "Asia-East1",
      "Asia-South1",
      "Asia-Southeast1",
      "Australia-East1",
      "Europe-North1",
      "Europe-West3",
      "SouthAmerica-East1",
      "US-Central-1",
      "US-East-1",
      "US-West-2"
    ],
    Billing_Period: options?.Billing_Period || [
      "Annually",
      "Daily",
      "Hourly",
      "Monthly",
      "Quarterly",
      "Weekly"
    ],
    Instance_Status: options?.Instance_Status || [
      "Archived",
      "Decommissioned",
      "Error",
      "Idle",
      "Maintenance",
      "Migrating",
      "Pending",
      "Restarting",
      "Running",
      "Scaling",
      "Stopped",
      "Suspended",
      "Terminated"
    ],
    Service_Category: SERVICE_CATEGORIES,
  };

  return (
    <div className="max-w-[850px] mx-auto w-full px-6 py-12 animate-fade-in relative z-10">

      <div className="mb-10 space-y-3 text-center sm:text-left">
        <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md shadow-blue-500/10 animate-bounce">
            <Sparkles size={11} />Prediksi Biaya ML
          </div>
        </div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent tracking-tight pt-1">
          Kalkulator Biaya Cloud Komprehensif
        </h1>
        <p className="text-xs text-slate-500 font-bold max-w-lg leading-relaxed">
          Isi parameter arsitektur cloud kamu untuk memprediksi total biaya operasional secara akurat.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/85 border border-slate-200/50 rounded-[32px] p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-xl transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Kiri: Parameter Konfigurasi */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest border-b border-blue-50 pb-2">
                I. Parameter Konfigurasi
              </h3>
              <SelectField label="Kategori Layanan" icon={Server} value={input.Service_Category} onChange={set("Service_Category")} options={opts.Service_Category} placeholder="Pilih kategori layanan" />
              <SelectField label="Wilayah (Region)" icon={MapPin} value={input.Region} onChange={set("Region")} options={opts.Region} placeholder="Pilih wilayah region" />
              <SelectField label="Periode Tagihan" icon={Calendar} value={input.Billing_Period} onChange={set("Billing_Period")} options={opts.Billing_Period} placeholder="Pilih periode tagihan" />
              <SelectField label="Status Instansi" icon={ToggleLeft} value={input.Instance_Status} onChange={set("Instance_Status")} options={opts.Instance_Status} placeholder="Pilih status instansi" />
            </div>

            {/* Kanan: Parameter Kapasitas & Penggunaan CPU */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest border-b border-blue-50 pb-2">
                II. Kapasitas & Penggunaan CPU
              </h3>
              <NumberField label="Storage Digunakan (GB)" icon={HardDrive} value={input.Storage_Used_GB} onChange={set("Storage_Used_GB")} placeholder="Contoh: 250" hint="Range dataset: 1 – 999 GB" />
              <NumberField label="CPU Hours Dibutuhkan" icon={Cpu} value={input.Required_CPU_Hours} onChange={set("Required_CPU_Hours")} placeholder="Contoh: 372" hint="Range dataset: 1 – 744 jam" />
              <NumberField label="CPU Hours Aktual" icon={Activity} value={input.Actual_CPU_Hours} onChange={set("Actual_CPU_Hours")} placeholder="Contoh: 400" hint="Range dataset: 1 – 744 jam" />
              <NumberField label="Utilisasi CPU (%)" icon={Server} value={input.CPU_Utilization} onChange={set("CPU_Utilization")} placeholder="Contoh: 65" hint="Range dataset: 1 – 99%" />
            </div>

          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 border border-blue-100/40 rounded-2xl flex items-start gap-3 text-[10px] font-bold text-slate-500 leading-relaxed shadow-sm">
          <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
          <span>
            <strong>Catatan:</strong> Parameter penunjang seperti tipe proyek, provider cloud, dan tim pemilik dikonfigurasi otomatis. Model XGBoost menggunakan <strong>9 fitur utama</strong> dengan range output <strong>$3.70 – $66.33</strong> sesuai distribusi dataset training.
          </span>
        </div>

        <button type="submit" disabled={isLoading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 hover:opacity-95 text-white font-black text-xs tracking-widest uppercase shadow-lg shadow-blue-500/25 transition duration-300 flex items-center justify-center gap-2 cursor-pointer hover:shadow-blue-500/45 hover:-translate-y-0.5 active:translate-y-0">
          {isLoading ? <><Loader2 size={15} className="animate-spin" />Memproses Estimasi...</> : <><Sparkles size={15} />Hitung Prediksi Biaya</>}
        </button>

      </form>
    </div>
  );
};