export interface CloudCostInput {
  Project_Type: string;
  Cloud_Service: string;
  Service_Category: string;
  Billing_Period: string;
  Required_CPU_Hours: number;
  Actual_CPU_Hours: number;
  CPU_Utilization: number;
  Storage_Used_GB: number;
  Storage_Cost: number;
  Compute_Cost: number;
  Network_Cost: number;
  Region: string;
  Owner_Team: string;
  Instance_Status: string;
  Remarks: string;
}

export interface PredictionResult {
  prediksi_biaya: number;
  formatted: string;
  input: CloudCostInput;
  timestamp: string;
  error?: string;
  akurasi_prediksi?: number;
  analisis_tambahan?: {
    proyeksi_estimasi_biaya: number;
    nilai_potensi_penghematan: number;
    status_beban_kerja: string;
    indikator_deteksi_anomali: number;
    rekomendasi_tindakan: string;
  };
}

export interface OptionsResponse {
  Project_Type: string[];
  Cloud_Service: string[];
  Service_Category: string[];
  Billing_Period: string[];
  Region: string[];
  Owner_Team: string[];
  Instance_Status: string[];
  Remarks: string[];
}