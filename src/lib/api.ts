import { CloudCostInput, OptionsResponse } from "./types";
import { calculateLocalCostPrediction, formatUSD } from "./utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function buildOfflineResult(input: CloudCostInput, errorMsg: string) {
  const computeVal = Number(input.Compute_Cost) || 0;
  const storageVal = Number(input.Storage_Cost) || 0;
  const networkVal = Number(input.Network_Cost) || 0;

  // Use the comprehensive local predictor from utils
  const local = calculateLocalCostPrediction(input);
  const predicted = local.prediksi_biaya;

  const ratio_cpu = input.Required_CPU_Hours > 0 ? (input.Actual_CPU_Hours / input.Required_CPU_Hours) : 1.0;
  const proyeksi_estimasi_biaya = Math.round(predicted * ratio_cpu * 100) / 100;

  let potensi_penghematan = 0;
  if (input.Actual_CPU_Hours > input.Required_CPU_Hours && input.Required_CPU_Hours > 0) {
    const perJam = computeVal / (input.Actual_CPU_Hours || 1);
    potensi_penghematan = (input.Actual_CPU_Hours - input.Required_CPU_Hours) * perJam;
  }
  if (input.CPU_Utilization < 60) {
    potensi_penghematan += computeVal * 0.3;
  }
  potensi_penghematan = Math.round(potensi_penghematan * 100) / 100;

  const workloadStatus = input.CPU_Utilization > 100 ? "Kelebihan Beban" : input.CPU_Utilization < 60 ? "Kurang Dimanfaatkan" : "Optimal";
  const anomaly = (input.CPU_Utilization > 95 || (computeVal > 0 && networkVal > (computeVal * 1.5))) ? 1 : 0;

  let recommendation = "Pertahankan arsitektur cloud Anda yang efisien.";
  if (computeVal > 0 && networkVal > (computeVal * 1.5)) {
    recommendation = "Cek anomali pada biaya jaringan.";
  } else if (input.CPU_Utilization < 60) {
    recommendation = "Kurangi alokasi CPU karena utilisasi rendah.";
  } else if (input.CPU_Utilization > 100) {
    recommendation = "Tingkatkan kapasitas CPU untuk menghindari kegagalan sistem.";
  }

  return {
    prediksi_biaya: predicted,
    formatted: formatUSD(predicted),
    analisis_tambahan: {
      proyeksi_estimasi_biaya,
      nilai_potensi_penghematan: potensi_penghematan,
      status_beban_kerja: workloadStatus,
      indikator_deteksi_anomali: anomaly,
      rekomendasi_tindakan: recommendation
    },
    error: errorMsg
  };
}

export async function predictBiaya(input: CloudCostInput) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
    clearTimeout(id);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();

    // Backend returned an error object (e.g. model crash) instead of prediction
    if (data.error && data.prediksi_biaya === undefined) {
      console.warn("Backend returned error:", data.error);
      return buildOfflineResult(input, `Backend error: ${data.error}. Menjalankan estimasi luring.`);
    }

    // Backend returned successfully but prediksi_biaya is invalid
    if (data.prediksi_biaya === undefined || data.prediksi_biaya === null || !Number.isFinite(Number(data.prediksi_biaya))) {
      console.warn("Backend returned invalid prediksi_biaya:", data.prediksi_biaya);
      return buildOfflineResult(input, "Backend mengembalikan data tidak valid. Menjalankan estimasi luring.");
    }

    return data;
  } catch (err: any) {
    clearTimeout(id);
    const isNetworkError = err.name === "AbortError" ||
      err.message?.includes("Failed to fetch") ||
      err.message?.includes("fetch") ||
      err.message?.includes("NetworkError");

    if (isNetworkError) {
      return buildOfflineResult(input, "Gagal terhubung ke API backend. Menjalankan estimasi luring.");
    }
    throw err;
  }
}

export async function getOptions(): Promise<OptionsResponse> {
  const res = await fetch(`${API_URL}/options`);
  if (!res.ok) throw new Error("Gagal ambil options");
  return res.json();
}