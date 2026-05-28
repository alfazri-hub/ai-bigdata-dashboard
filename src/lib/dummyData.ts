// Sales and AI Dashboards mock datasets and configurations

// ==========================================
// 1. SALES & DISTRIBUTION DASHBOARD DATA
// ==========================================

export interface SalesTrendPoint {
  date: string;
  approved: number;
  submitted: number;
  delivered: number;
}

export const salesTrends: Record<string, SalesTrendPoint[]> = {
  "Total Sales Order Value": [
    { date: "Senin", approved: 350000, submitted: 480000, delivered: 220000 },
    { date: "Selasa", approved: 420000, submitted: 510000, delivered: 310000 },
    { date: "Rabu", approved: 680000, submitted: 750000, delivered: 450000 },
    { date: "Kamis", approved: 890000, submitted: 980000, delivered: 550000 },
    { date: "Jumat", approved: 1200000, submitted: 1350000, delivered: 880000 },
    { date: "Sabtu", approved: 1493875, submitted: 1650000, delivered: 990000 },
    { date: "Minggu", approved: 1350000, submitted: 1500000, delivered: 920000 },
  ],
  "SO Value Growth (YoY)": [
    { date: "Q1", approved: -10, submitted: -5, delivered: -15 },
    { date: "Q2", approved: -30, submitted: -20, delivered: -35 },
    { date: "Q3", approved: -60, submitted: -50, delivered: -65 },
    { date: "Q4", approved: -80.3, submitted: -75, delivered: -82 },
  ],
  "Total Sales Revenue": [
    { date: "Senin", approved: 80000, submitted: 95000, delivered: 75000 },
    { date: "Selasa", approved: 120000, submitted: 140000, delivered: 110000 },
    { date: "Rabu", approved: 190000, submitted: 210000, delivered: 180000 },
    { date: "Kamis", approved: 250000, submitted: 280000, delivered: 240000 },
    { date: "Jumat", approved: 290000, submitted: 310000, delivered: 280000 },
    { date: "Sabtu", approved: 319875, submitted: 350000, delivered: 310000 },
    { date: "Minggu", approved: 305000, submitted: 330000, delivered: 300000 },
  ],
  "Revenue Growth (YoY)": [
    { date: "Q1", approved: -15, submitted: -10, delivered: -20 },
    { date: "Q2", approved: -40, submitted: -35, delivered: -45 },
    { date: "Q3", approved: -75, submitted: -70, delivered: -78 },
    { date: "Q4", approved: -88.25, submitted: -85, delivered: -89 },
  ],
  "Order Fulfillment Rate": [
    { date: "Senin", approved: 85, submitted: 90, delivered: 80 },
    { date: "Selasa", approved: 80, submitted: 85, delivered: 75 },
    { date: "Rabu", approved: 70, submitted: 75, delivered: 68 },
    { date: "Kamis", approved: 60, submitted: 65, delivered: 55 },
    { date: "Jumat", approved: 55, submitted: 60, delivered: 50 },
    { date: "Sabtu", approved: 50, submitted: 55, delivered: 50 },
    { date: "Minggu", approved: 52, submitted: 58, delivered: 50 },
  ],
  "Fulfillment Rate": [
    { date: "Senin", approved: 85, submitted: 90, delivered: 80 },
    { date: "Selasa", approved: 80, submitted: 85, delivered: 75 },
    { date: "Rabu", approved: 70, submitted: 75, delivered: 68 },
    { date: "Kamis", approved: 60, submitted: 65, delivered: 55 },
    { date: "Jumat", approved: 55, submitted: 60, delivered: 50 },
    { date: "Sabtu", approved: 50, submitted: 55, delivered: 50 },
    { date: "Minggu", approved: 52, submitted: 58, delivered: 50 },
  ],
  "Fulfilled Volume Growth": [
    { date: "Mei", approved: 20, submitted: 25, delivered: 18 },
    { date: "Jun", approved: 50, submitted: 55, delivered: 45 },
    { date: "Jul", approved: 100, submitted: 110, delivered: 95 },
  ],
  "Sales Volume Growth": [
    { date: "Mei", approved: 30, submitted: 35, delivered: 28 },
    { date: "Jun", approved: 65, submitted: 70, delivered: 60 },
    { date: "Jul", approved: 100, submitted: 105, delivered: 98 },
  ],
};

// Default Sales metrics dictionary (EN and ID)
export const salesLocalization = {
  ID: {
    title: "Dashboard Penjualan",
    filter: "Penyaringan",
    calendar: "Kalender",
    settings: "Atur Widget",
    chartTitle: "Penjualan dari Waktu ke Waktu",
    chartSubtitle: "Pesanan Disetujui dalam periode terpilih",
    legendApproved: "Total Disetujui",
    legendSubmitted: "Total Diajukan",
    legendDelivered: "Total Terkirim",
    transactionOverview: "Ikhtisar Transaksi",
    transactionSubtitle: "Pesanan Disetujui dalam periode terpilih",
    submitted: "Diajukan",
    approved: "Disetujui",
    delivered: "Terkirim",
    placeholderFilter: "Terapkan penyaringan untuk data...",
    placeholderSettings: "Sesuaikan tata letak kartu KPI Anda.",
    kpiNames: {
      "Total Sales Order Value": "Total Nilai Pesanan Penjualan",
      "SO Value Growth (YoY)": "Pertumbuhan Nilai SO (YoY)",
      "Total Sales Revenue": "Total Pendapatan Penjualan",
      "Revenue Growth (YoY)": "Pertumbuhan Pendapatan (YoY)",
      "Order Fulfillment Rate": "Tingkat Pemenuhan Pesanan",
      "Fulfillment Rate": "Tingkat Pemenuhan",
      "Fulfilled Volume Growth": "Pertumbuhan Volume Terpenuhi",
      "Sales Volume Growth": "Pertumbuhan Volume Penjualan",
    }
  },
  EN: {
    title: "Sales Dashboard",
    filter: "Filter",
    calendar: "Calendar",
    settings: "Widget Settings",
    chartTitle: "Sales Over Time",
    chartSubtitle: "Approved Order in selected period",
    legendApproved: "Total Approved",
    legendSubmitted: "Total Submitted",
    legendDelivered: "Total Delivered",
    transactionOverview: "Transaction Overview",
    transactionSubtitle: "Approved Order in selected period",
    submitted: "Submitted",
    approved: "Approved",
    delivered: "Delivered",
    placeholderFilter: "Apply filters to dashboard data...",
    placeholderSettings: "Adjust your KPI cards layout.",
    kpiNames: {
      "Total Sales Order Value": "Total Sales Order Value",
      "SO Value Growth (YoY)": "SO Value Growth (YoY)",
      "Total Sales Revenue": "Total Sales Revenue",
      "Revenue Growth (YoY)": "Revenue Growth (YoY)",
      "Order Fulfillment Rate": "Order Fulfillment Rate",
      "Fulfillment Rate": "Fulfillment Rate",
      "Fulfilled Volume Growth": "Fulfilled Volume Growth",
      "Sales Volume Growth": "Sales Volume Growth",
    }
  }
};

// ==========================================
// 2. AI ENGINEERING DASHBOARD DATA
// ==========================================

export interface AISystemMetric {
  time: string;
  predictions: number;
  cpu: number;
  memory: number;
}

export const aiSystemMetrics: AISystemMetric[] = [
  { time: "15:00", predictions: 120, cpu: 45, memory: 64 },
  { time: "15:05", predictions: 145, cpu: 52, memory: 66 },
  { time: "15:10", predictions: 130, cpu: 48, memory: 65 },
  { time: "15:15", predictions: 165, cpu: 58, memory: 68 },
  { time: "15:20", predictions: 184, cpu: 82, memory: 72 },
  { time: "15:25", predictions: 172, cpu: 75, memory: 71 },
  { time: "15:30", predictions: 190, cpu: 85, memory: 74 },
];

export interface PipelineTask {
  id: string;
  iconBg: string;
  iconColor: string;
  iconName: "Globe" | "Database" | "Zap" | "CheckCircle2" | "Cpu";
  title: string;
  desc: string;
  avatars: string[];
  status: "idle" | "running" | "completed" | "failed";
  progress?: number;
}

export const initialPipelineTasks: PipelineTask[] = [
  {
    id: "task-1",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
    iconName: "Globe",
    title: "Global Web Scraper",
    desc: "Data collection pipeline, 16 days running",
    avatars: ["A", "B", "C"],
    status: "running",
    progress: 88,
  },
  {
    id: "task-2",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    iconName: "Database",
    title: "Customer DB Analytics",
    desc: "Model tuning and reporting, updated 5 days ago",
    avatars: ["D", "E", "F"],
    status: "completed",
    progress: 100,
  },
  {
    id: "task-3",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    iconName: "Zap",
    title: "Real-time Inference",
    desc: "API gateway optimization, due in 3 days",
    avatars: ["G", "H", "I"],
    status: "running",
    progress: 42,
  },
  {
    id: "task-4",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    iconName: "CheckCircle2",
    title: "Model Validation",
    desc: "Evaluating F1 scores, assigned 10 minutes ago",
    avatars: ["J", "K", "L"],
    status: "running",
    progress: 15,
  },
];

// Rich terminal logs mapping for each task
export const pipelineTerminalLogs: Record<string, string[]> = {
  "task-1": [
    "Initializing WebScraper instance v4.11.2...",
    "Connecting to proxy rotators... SUCCESS (32 nodes online)",
    "Seeding starting URLs for global e-commerce scrape...",
    "Crawling thread pool spawned: 16 active worker threads",
    "[INFO] Crawling speed: 2,420 pages/min",
    "[DB] Ingesting raw JSON payloads to Landing Bucket...",
    "[SUCCESS] Processed 1.48M product SKU objects",
    "[INFO] Storage consumption: +4.2 GB cluster block storage",
    "[SUCCESS] Deduplication filter active: 184 duplicates omitted",
    "Pipeline status: RUNNING. Network latency stable at 112ms.",
    "[INFO] Scanning target dom structure updates...",
    "[INFO] WebScraper thread #4: Page crawled successfully",
    "[INFO] WebScraper thread #7: Content parsed cleanly",
    "[DB] Executing batch write transaction, committing 1000 nodes...",
  ],
  "task-2": [
    "Checking database credentials...",
    "Opening encrypted connection tunnel to Customer-Analytics-Prod...",
    "Retrieving data blocks from dates: 2026-01-01 to 2026-05-25",
    "Running tokenization and embedding workflows on corpus...",
    "Training classifier models (RandomForest, XGBoost ensemble)...",
    "Evaluating test split: Validation Accuracy = 94.62%",
    "F1 score rating: 0.938. Precision = 0.941. Recall = 0.935.",
    "Updating operational weights in storage bucket...",
    "Exporting performance report PDF to s3://artifacts/models/v2.1-eval.pdf",
    "[SUCCESS] Pipeline executed cleanly in 12m 45s",
    "Database connection closed gracefully.",
  ],
  "task-3": [
    "Booting API Gateway real-time middleware...",
    "Loading inference weights matrix for Transformer-NLP-v2...",
    "Preheating GPU tensor cores (CUDA 12.2 detected)...",
    "Registering endpoint: /v1/predictions/inference",
    "Conducting health checks... GPU TEMP: 58°C, RAM: 24.2GB/32.0GB",
    "Streaming request queues initialized.",
    "[ALERT] Request throughput spike: 8.4K req/sec. Throttling active.",
    "Inference routing optimizer: dynamically balancing across Node-A and Node-B",
    "[INFO] Request ID #238914-A: inference completed in 14ms",
    "[INFO] Request ID #238915-B: inference completed in 18ms",
    "[INFO] Request ID #238916-A: inference completed in 12ms",
    "Pipeline status: RUNNING. Active gateway optimization active.",
  ],
  "task-4": [
    "Starting validation pipeline task...",
    "Retrieving golden evaluation set (10,000 labeled samples)...",
    "Spawning local runner for validation loop...",
    "Predicting on batch #1/100...",
    "Predicting on batch #15/100...",
    "[INFO] Partial F1 score: 0.912",
    "Predicting on batch #32/100...",
    "Predicting on batch #48/100...",
    "[ALERT] Slight model drift detected: Deviance = +1.2% versus baseline",
    "Predicting on batch #64/100...",
    "Predicting on batch #80/100...",
  ]
};
