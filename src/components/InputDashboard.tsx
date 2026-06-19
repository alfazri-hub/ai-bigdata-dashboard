"use client";
import React, { useState, useEffect } from "react";
import {
  Server, HardDrive, Loader2, Sparkles, ChevronDown,
  Info, MapPin, Calendar, ToggleLeft, Cpu, Activity
} from "lucide-react";
import { OptionsResponse } from "@/lib/types";
import { getOptions } from "@/lib/api";
import { usePrediction } from "@/context/PredictionContext";
import { useRouter } from "next/navigation";

const SERVICE_CATEGORIES = [
  { value: "Compute", label: "Komputasi (Compute)" },
  { value: "Storage", label: "Penyimpanan (Storage)" },
  { value: "Database", label: "Basis Data (Database)" },
  { value: "Network", label: "Jaringan (Network)" },
  { value: "Security", label: "Keamanan (Security)" },
  { value: "Backup", label: "Cadangan (Backup)" },
  { value: "Analytics", label: "Analitik (Analytics)" },
];

const SelectField = ({ label, icon: Icon, value, onChange, options, placeholder, error }: {
  label: string; icon: React.ElementType; value: string;
  onChange: (v: string) => void; options: { value: string; label: string }[] | string[]; placeholder: string;
  error?: string;
}) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 ml-1">
      <Icon size={13} className="text-blue-400" />{label}
    </label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-[#121226]/50 hover:bg-[#121226]/75 border ${error ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-blue-500/50"} text-white rounded-2xl py-3.5 pl-4 pr-9 text-xs font-semibold outline-none focus:bg-[#121226] focus:ring-4 ${error ? "focus:ring-rose-500/10" : "focus:ring-blue-500/10"} transition shadow-md`}>
        <option value="" className="bg-[#121226] text-gray-300">{placeholder}</option>
        {options.map((o) => {
          const val = typeof o === "string" ? o : o.value;
          const lbl = typeof o === "string" ? o : o.label;
          return <option key={val} value={val} className="bg-[#121226] text-white">{lbl}</option>;
        })}
      </select>
      <ChevronDown size={14} className="absolute right-3.5 top-4 text-gray-500 pointer-events-none" />
    </div>
    {error && <p className="text-[10px] text-rose-500 font-bold ml-1 animate-pulse">{error}</p>}
  </div>
);

const NumberField = ({ label, icon: Icon, value, onChange, placeholder, prefix, hint, error }: {
  label: string; icon: React.ElementType; value: number | "";
  onChange: (v: number | "") => void; placeholder?: string; prefix?: string; hint?: string;
  error?: string;
}) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 ml-1">
      <Icon size={13} className="text-blue-400" />{label}
    </label>
    <div className="relative">
      {prefix && <span className="absolute left-4 top-3.5 text-xs font-semibold text-gray-450">{prefix}</span>}
      <input type="number" min={0} value={value} onChange={(e) => {
        const val = e.target.value;
        onChange(val === "" ? "" : parseFloat(val) || 0);
      }}
        placeholder={placeholder || "0"}
        className={`w-full bg-[#121226]/50 hover:bg-[#121226]/75 border ${error ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-blue-500/50"} text-white rounded-2xl py-3.5 text-xs font-semibold outline-none focus:bg-[#121226] focus:ring-4 ${error ? "focus:ring-rose-500/10" : "focus:ring-blue-500/10"} transition shadow-md ${prefix ? "pl-8 pr-4" : "px-4"}`} />
    </div>
    {error ? (
      <p className="text-[10px] text-rose-500 font-bold ml-1 animate-pulse">{error}</p>
    ) : (
      hint && <p className="text-[10px] text-gray-500 font-medium ml-1">{hint}</p>
    )}
  </div>
);

export const InputDashboard: React.FC = () => {
  const [input, setInput] = useState<any>({
    Region: "", Billing_Period: "", Service_Category: "", Instance_Status: "",
    Storage_Used_GB: "", Required_CPU_Hours: "", Actual_CPU_Hours: "", CPU_Utilization: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [options, setOptions] = useState<OptionsResponse | null>(null);

  const { handlePredict, isLoading } = usePrediction();
  const router = useRouter();

  useEffect(() => {
    getOptions().then(setOptions).catch(() => setOptions(null));
  }, []);

  const set = (key: string) => (val: any) => {
    setInput((prev: any) => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form input
    const newErrors: Record<string, string> = {};
    if (!input.Service_Category) newErrors.Service_Category = "Kategori layanan wajib dipilih.";
    if (!input.Region) newErrors.Region = "Wilayah (Region) wajib dipilih.";
    if (!input.Billing_Period) newErrors.Billing_Period = "Periode tagihan wajib dipilih.";
    if (!input.Instance_Status) newErrors.Instance_Status = "Status instansi wajib dipilih.";
    
    if (input.Storage_Used_GB === "") {
      newErrors.Storage_Used_GB = "Penyimpanan wajib diisi.";
    } else if (Number(input.Storage_Used_GB) < 1 || Number(input.Storage_Used_GB) > 1000) {
      newErrors.Storage_Used_GB = "Penyimpanan harus di antara 1 – 1000 GB.";
    }
    
    if (input.Required_CPU_Hours === "") {
      newErrors.Required_CPU_Hours = "CPU Hours dibutuhkan wajib diisi.";
    } else if (Number(input.Required_CPU_Hours) < 1 || Number(input.Required_CPU_Hours) > 744) {
      newErrors.Required_CPU_Hours = "CPU Hours dibutuhkan harus di antara 1 – 744 jam.";
    }
    
    if (input.Actual_CPU_Hours === "") {
      newErrors.Actual_CPU_Hours = "CPU Hours aktual wajib diisi.";
    } else if (Number(input.Actual_CPU_Hours) < 1 || Number(input.Actual_CPU_Hours) > 744) {
      newErrors.Actual_CPU_Hours = "CPU Hours aktual harus di antara 1 – 744 jam.";
    }
    
    if (input.CPU_Utilization === "") {
      newErrors.CPU_Utilization = "Utilisasi CPU wajib diisi.";
    } else if (Number(input.CPU_Utilization) < 1 || Number(input.CPU_Utilization) > 99) {
      newErrors.CPU_Utilization = "Utilisasi CPU harus di antara 1 – 99%.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const fullInput = {
      Project_Type: "Analytics",
      Cloud_Service: "AWS S3",
      Service_Category: input.Service_Category,
      Billing_Period: input.Billing_Period,
      Required_CPU_Hours: Number(input.Required_CPU_Hours),
      Actual_CPU_Hours: Number(input.Actual_CPU_Hours),
      CPU_Utilization: Number(input.CPU_Utilization),
      Storage_Used_GB: Number(input.Storage_Used_GB),
      Storage_Cost: 0, Compute_Cost: 0, Network_Cost: 0,
      Region: input.Region,
      Owner_Team: "DevOps",
      Instance_Status: input.Instance_Status,
      Remarks: "Optimal",
    };

    await handlePredict(fullInput);
    router.push("/output");
  };

  const opts = {
    Region: options?.Region || ["Africa-North1", "Asia-East1", "Asia-South1", "Asia-Southeast1", "Australia-East1", "Europe-North1", "Europe-West3", "SouthAmerica-East1", "US-Central-1", "US-East-1", "US-West-2"],
    Billing_Period: options?.Billing_Period || ["Annually", "Daily", "Hourly", "Monthly", "Quarterly", "Weekly"],
    Instance_Status: options?.Instance_Status || ["Archived", "Decommissioned", "Error", "Idle", "Maintenance", "Migrating", "Pending", "Restarting", "Running", "Scaling", "Stopped", "Suspended", "Terminated"],
    Service_Category: SERVICE_CATEGORIES,
  };

  return (
    <div className="max-w-[850px] mx-auto w-full px-6 py-8 md:py-12 animate-fade-in relative z-10">
      <div className="mb-10 space-y-3 text-center sm:text-left">
        <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md animate-bounce">
            <Sparkles size={11} />Prediksi Biaya ML
          </div>
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight pt-1">
          Kalkulator Biaya Cloud Komprehensif
        </h1>
        <p className="text-sm text-gray-400 font-medium max-w-lg leading-relaxed">
          Isi parameter arsitektur cloud kamu untuk memprediksi total biaya operasional secara akurat.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-[#121226]/80 border border-white/5 backdrop-blur-sm rounded-[32px] p-8 space-y-6 shadow-xl shadow-black/25 relative overflow-hidden group hover:border-blue-500/10 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-white/10 pb-2">I. Parameter Konfigurasi</h3>
              <SelectField label="Kategori Layanan" icon={Server} value={input.Service_Category} onChange={set("Service_Category")} options={opts.Service_Category} placeholder="Pilih kategori layanan" error={errors.Service_Category} />
              <SelectField label="Wilayah (Region)" icon={MapPin} value={input.Region} onChange={set("Region")} options={opts.Region} placeholder="Pilih wilayah region" error={errors.Region} />
              <SelectField label="Periode Tagihan" icon={Calendar} value={input.Billing_Period} onChange={set("Billing_Period")} options={opts.Billing_Period} placeholder="Pilih periode tagihan" error={errors.Billing_Period} />
              <SelectField label="Status Instansi" icon={ToggleLeft} value={input.Instance_Status} onChange={set("Instance_Status")} options={opts.Instance_Status} placeholder="Pilih status instansi" error={errors.Instance_Status} />
            </div>
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-white/10 pb-2">II. Kapasitas & Penggunaan CPU</h3>
              <NumberField label="Storage Digunakan (GB)" icon={HardDrive} value={input.Storage_Used_GB} onChange={set("Storage_Used_GB")} placeholder="Contoh: 250" hint="Range dataset: 1 – 1001 GB" error={errors.Storage_Used_GB} />
              <NumberField label="CPU Hours Dibutuhkan" icon={Cpu} value={input.Required_CPU_Hours} onChange={set("Required_CPU_Hours")} placeholder="Contoh: 372" hint="Range dataset: 1 – 744 jam" error={errors.Required_CPU_Hours} />
              <NumberField label="CPU Hours Aktual" icon={Activity} value={input.Actual_CPU_Hours} onChange={set("Actual_CPU_Hours")} placeholder="Contoh: 400" hint="Range dataset: 1 – 744 jam" error={errors.Actual_CPU_Hours} />
              <NumberField label="Utilisasi CPU (%)" icon={Server} value={input.CPU_Utilization} onChange={set("CPU_Utilization")} placeholder="Contoh: 65" hint="Range dataset: 1 – 99%" error={errors.CPU_Utilization} />
            </div>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-blue-500/25 transition duration-300 flex items-center justify-center gap-2 cursor-pointer hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0">
          {isLoading ? <><Loader2 size={15} className="animate-spin" />Memproses Estimasi...</> : <><Sparkles size={15} />Hitung Prediksi Biaya</>}
        </button>
      </form>
    </div>
  );
};
