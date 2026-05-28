"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ChartDataPoint {
  [key: string]: any;
}

interface DataChartProps {
  data: ChartDataPoint[];
  type?: "line" | "area" | "bar";
  height?: number | string;
  gridColor?: string;
  xAxisKey?: string;
  series: {
    key: string;
    name: string;
    color: string;
    gradient?: boolean;
  }[];
  customTooltip?: React.FC<any>;
}

export default function DataChart({
  data,
  type = "area",
  height = 300,
  gridColor = "#f1f5f9",
  xAxisKey = "date",
  series,
  customTooltip,
}: DataChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Avoid SSR hydration mismatch with Recharts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div 
        style={{ height }} 
        className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl animate-pulse flex items-center justify-center text-xs font-semibold text-slate-400"
      >
        Loading Chart Engine...
      </div>
    );
  }

  // Fallback default Tooltip
  const DefaultTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800 text-xs font-medium space-y-1.5 min-w-[120px]">
          <p className="font-extrabold text-slate-400 mb-1 border-b border-slate-800 pb-1">{label}</p>
          {payload.map((entry: any, i: number) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block" 
                  style={{ backgroundColor: entry.color }} 
                />
                <span className="text-slate-300">{entry.name}</span>
              </span>
              <span className="font-black text-right">
                {typeof entry.value === "number" && entry.value < 0 
                  ? `${entry.value}%` 
                  : entry.value >= 1000 
                    ? `IDR ${new Intl.NumberFormat("id-ID").format(entry.value)}` 
                    : new Intl.NumberFormat("id-ID").format(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const ActiveTooltip = customTooltip || DefaultTooltip;

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} 
              dx={-5}
            />
            <Tooltip content={<ActiveTooltip />} />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={3}
                dot={{ stroke: s.color, strokeWidth: 2, r: 4, fill: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 0, fill: s.color }}
              />
            ))}
          </LineChart>
        );

      case "bar":
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} 
              dx={-5}
            />
            <Tooltip content={<ActiveTooltip />} />
            {series.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name}
                fill={s.color}
                radius={[8, 8, 0, 0]}
                maxBarSize={32}
              />
            ))}
          </BarChart>
        );

      case "area":
      default:
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {series.map((s) => (
                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={s.color} stopOpacity={0.0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} 
              dx={-5}
            />
            <Tooltip content={<ActiveTooltip />} />
            {series.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={3}
                fill={s.gradient !== false ? `url(#grad-${s.key})` : "none"}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0, fill: s.color }}
              />
            ))}
          </AreaChart>
        );
    }
  };

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
