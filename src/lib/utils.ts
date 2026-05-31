// Utility functions for class merging, currency formatting, and URL parsing

/**
 * Merges multiple CSS class names together cleanly, supporting standard syntax, arrays, and objects.
 */
export function cn(...inputs: any[]): string {
  const classes = [];
  for (const x of inputs) {
    if (!x) continue;
    if (typeof x === "string") {
      classes.push(x);
    } else if (Array.isArray(x)) {
      classes.push(cn(...x));
    } else if (typeof x === "object") {
      for (const k in x) {
        if (x[k]) classes.push(k);
      }
    }
  }
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a numeric value into Indonesian Rupiah (IDR) currency format.
 */
export function formatIDR(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(safe);
}

/**
 * Extracts phishing features from a URL locally for the auto-filling form & fallback prediction.
 */
export function extractFeaturesFromURL(url: string) {
  let cleanUrl = url.trim();
  if (!cleanUrl) {
    return {
      domain: "",
      urlLength: 0,
      urlDepth: 0,
      haveIp: 0,
      haveAt: 0,
      redirection: 0,
      httpsDomain: 0,
      tinyUrl: 0,
      prefixSuffix: 0,
      dnsRecord: 1,
      webTraffic: 1,
      domainAge: 1,
      domainEnd: 1,
      iFrame: 0,
      mouseOver: 0,
      rightClick: 0,
      webForwards: 0,
    };
  }

  let domain = "";
  let path = "";
  let search = "";

  try {
    let parsedUrl = cleanUrl;
    if (!parsedUrl.startsWith("http://") && !parsedUrl.startsWith("https://")) {
      parsedUrl = "http://" + parsedUrl;
    }
    const parsed = new URL(parsedUrl);
    domain = parsed.hostname;
    path = parsed.pathname;
    search = parsed.search;
  } catch (e) {
    // Fallback manual parsing if URL parsing fails
    const domainMatch = cleanUrl.match(/^(?:https?:\/\/)?([^/?#]+)/i);
    domain = domainMatch ? domainMatch[1] : cleanUrl;
    
    const pathMatch = cleanUrl.match(/^(?:https?:\/\/)?(?:[^/?#]+)([^?#]*)/i);
    path = pathMatch ? pathMatch[1] : "";
  }

  // 1. Informasi Teks URL
  const len = cleanUrl.length;
  let urlLength = 0;
  if (len < 54) urlLength = 0;
  else if (len <= 75) urlLength = 1;
  else urlLength = 2;

  const urlDepth = (path.match(/\//g) || []).length;

  // 2. Karakteristik Struktur & Jaringan
  // Have_IP (check IPv4)
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  const haveIp = ipRegex.test(domain) ? 1 : 0;

  // Have_At
  const haveAt = cleanUrl.includes("@") ? 1 : 0;

  // Redirection (double slash in URL after protocol)
  const redirection = cleanUrl.indexOf("//", 8) !== -1 ? 1 : 0;

  // https_Domain (presence of https/ssl keywords in domain portion)
  const httpsDomain = domain.includes("https") || domain.includes("ssl") ? 1 : 0;

  // Shortlink/TinyURL
  const shorteners = [
    "bit.ly", "tinyurl.com", "t.co", "goo.gl", "shorte.st", "is.gd", 
    "ow.ly", "t2mio.com", "buff.ly", "adf.ly", "bit.do", "mcaf.ee"
  ];
  const tinyUrl = shorteners.some(s => domain.includes(s)) ? 1 : 0;

  // Prefix/Suffix (hyphen in domain)
  const prefixSuffix = domain.includes("-") ? 1 : 0;

  return {
    domain,
    urlLength,
    urlDepth,
    haveIp,
    haveAt,
    redirection,
    httpsDomain,
    tinyUrl,
    prefixSuffix,
    dnsRecord: 1, // Assume standard DNS record is active initially
    webTraffic: 1, // Default to standard traffic
    domainAge: 1, // Default domain age >= 6 months
    domainEnd: 1, // Default domain expires >= 1 year
    iFrame: 0,
    mouseOver: 0,
    rightClick: 0,
    webForwards: 0,
  };
}

import { CloudCostInput } from "./types";

/**
 * Formats a numeric value into US Dollar (USD) currency format.
 */
export function formatUSD(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safe);
}

/**
 * Generates local heuristic cost prediction in case the FastAPI ML model is offline
 */
export function calculateLocalCostPrediction(input: CloudCostInput) {
  const compute = Number(input.Compute_Cost) || 0;
  const storage = Number(input.Storage_Cost) || 0;
  const network = Number(input.Network_Cost) || 0;
  
  // Base sum of components
  let baseSum = compute + storage + network;
  
  // Heuristic adjustments mimicking ML weights:
  // 1. Overrun penalty: If actual hours exceed required hours, add dynamic overhead
  const requiredHours = Number(input.Required_CPU_Hours) || 1;
  const actualHours = Number(input.Actual_CPU_Hours) || 1;
  if (actualHours > requiredHours) {
    const overrunRatio = (actualHours - requiredHours) / requiredHours;
    baseSum += baseSum * Math.min(0.25, overrunRatio * 0.4); 
  }
  
  // 2. CPU Utilization penalty: Inefficiently low CPU utilization (< 30%) incurs 10% premium cost
  const cpuUtil = Number(input.CPU_Utilization) || 0;
  if (cpuUtil > 0 && cpuUtil < 30) {
    baseSum += baseSum * 0.10;
  } else if (cpuUtil > 85) {
    // High optimization discount
    baseSum -= baseSum * 0.05;
  }
  
  // 3. Billing Period multipliers (Hourly incurs slightly higher management overhead)
  if (input.Billing_Period === "Hourly") {
    baseSum *= 1.03;
  } else if (input.Billing_Period === "Annually") {
    // Discount for annual commitment
    baseSum *= 0.90;
  }
  
  // 4. Multipliers based on Region costs
  const expensiveRegions = ["Europe-West3", "Australia-East1", "SouthAmerica-East1"];
  const cheapRegions = ["US-East-1", "US-Central-1"];
  if (expensiveRegions.includes(input.Region)) {
    baseSum *= 1.05;
  } else if (cheapRegions.includes(input.Region)) {
    baseSum *= 0.96;
  }

  const prediksi_biaya = Math.round(baseSum * 100) / 100;
  
  return {
    prediksi_biaya,
    formatted: formatUSD(prediksi_biaya),
    offline: true,
  };
}

