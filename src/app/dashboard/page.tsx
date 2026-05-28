"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Cpu,
  Database,
  Globe,
  Plus,
  Search,
  Zap,
  CheckCircle2,
  MoreHorizontal,
  Sparkles,
  Terminal,
  Play,
  PlayCircle,
  FileText,
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  X,
  Check,
  Menu,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import TaskRow from "@/components/ui/TaskRow";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import DataChart from "@/components/charts/DataChart";
import { cn } from "@/lib/utils";
import {
  aiSystemMetrics,
  initialPipelineTasks,
  pipelineTerminalLogs,
  PipelineTask,
} from "@/lib/dummyData";

const statsConfig = [
  {
    title: "Live Models",
    value: "12",
    label: "Active Nodes",
    icon: Database,
    accent: "from-sky-400 to-blue-500",
    glow: "shadow-sky-500/10",
  },
  {
    title: "Running Pipelines",
    value: "7",
    label: "In progress logs",
    icon: Cpu,
    accent: "from-violet-500 to-fuchsia-500",
    glow: "shadow-fuchsia-500/10",
  },
  {
    title: "Alerts",
    value: "4",
    label: "Requires audit",
    icon: Zap,
    accent: "from-orange-400 to-amber-500",
    glow: "shadow-amber-500/10",
  },
  {
    title: "Predictions / sec",
    value: "184 req",
    label: "Cluster aggregate",
    icon: Activity,
    accent: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/10",
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<PipelineTask[]>(initialPipelineTasks);
  const [selectedTask, setSelectedTask] = useState<PipelineTask | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Simulated terminal states
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [terminalIndex, setTerminalIndex] = useState(0);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // New Task Form States
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskType, setNewTaskType] = useState<"Globe" | "Database" | "Zap" | "Cpu">("Cpu");

  // Stream logs simulator
  useEffect(() => {
    let intervalId: any;
    if (selectedTask) {
      const allLogs = pipelineTerminalLogs[selectedTask.id] || [
        "Initializing pipeline operational logs...",
        "Connection status: STABLE",
        "Loading dataset configuration...",
        "Task processing running in background threads...",
      ];

      setActiveLogs([allLogs[0]]);
      setTerminalIndex(1);

      intervalId = setInterval(() => {
        setTerminalIndex((prevIndex) => {
          if (prevIndex < allLogs.length) {
            setActiveLogs((prevLogs) => [...prevLogs, allLogs[prevIndex]]);
            return prevIndex + 1;
          } else {
            clearInterval(intervalId);
            return prevIndex;
          }
        });
      }, 350);
    } else {
      setActiveLogs([]);
      setTerminalIndex(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedTask]);

  // Scroll to bottom of terminal whenever logs stream in
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeLogs]);

  // Filter tasks based on search input
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const newTask: PipelineTask = {
      id: `task-${Date.now()}`,
      iconBg: newTaskType === "Globe" 
        ? "bg-rose-500/10" 
        : newTaskType === "Database" 
          ? "bg-blue-500/10" 
          : newTaskType === "Zap" 
            ? "bg-purple-500/10" 
            : "bg-emerald-500/10",
      iconColor: newTaskType === "Globe" 
        ? "text-rose-500" 
        : newTaskType === "Database" 
          ? "text-blue-500" 
          : newTaskType === "Zap" 
            ? "text-purple-500" 
            : "text-emerald-500",
      iconName: newTaskType,
      title: newTaskTitle,
      desc: newTaskDesc || "Pipeline task successfully queued.",
      avatars: ["A", "D"], // Default assignment team initials
      status: "running",
      progress: 0,
    };

    // Inject unique terminal logs for newly spawned tasks
    pipelineTerminalLogs[newTask.id] = [
      `[LAUNCH] Booting pipeline worker: ${newTask.title}...`,
      `[INFO] Target environment initialized. Nodes allocated: CUDA_CORE_#2.`,
      `[INFO] Resolving repository branches... COMPLETE.`,
      `[SUCCESS] DB connection established. Operational sync completed.`,
      `[INFO] Pipeline streaming metric data points to monitoring dashboard...`,
      `Running classification audits...`,
      `Task successfully running in container block #94.`,
    ];

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskType("Cpu");
    setShowNewTaskModal(false);
  };

  const getLucideIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return Globe;
      case "Database":
        return Database;
      case "Zap":
        return Zap;
      case "CheckCircle2":
        return CheckCircle2;
      case "Cpu":
      default:
        return Cpu;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 font-sans flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Top Navbar Header */}
      <header className="lg:hidden h-16 bg-slate-950 text-white flex items-center justify-between px-6 border-b border-slate-800 shrink-0 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition cursor-pointer"
            title="Open Navigation"
          >
            <Menu size={22} />
          </button>
          <span className="font-extrabold text-sm tracking-wider uppercase text-emerald-400">
            AI Studio
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-[10px] font-black uppercase text-slate-400">Online</span>
        </div>
      </header>

      {/* Sidebar navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-8 xl:grid-cols-[1.15fr_0.5fr] animate-fade-in-up">
          {/* Main workspace layout */}
          <section className="space-y-8">
            
            {/* Header: Engineer welcome panel */}
            <header className="rounded-[32px] bg-slate-950 text-white p-8 shadow-2xl border border-slate-800 relative overflow-hidden group">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition duration-500 pointer-events-none" />
              
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between relative z-10">
                <div>
                  <p className="text-xs uppercase font-extrabold tracking-[0.24em] text-emerald-400">
                    AI Engineering Dashboard
                  </p>
                  <h1 className="mt-3 text-3xl font-black text-white tracking-tight flex items-center gap-2">
                    Welcome back, Engineer.
                    <Sparkles size={24} className="text-emerald-400 animate-pulse" />
                  </h1>
                  <p className="mt-2 max-w-xl text-xs text-slate-400 font-semibold leading-relaxed">
                    Overview pipelines operation metrics, analyze dataset anomalies, check training evaluations, and secure stable predictions thresholds.
                  </p>
                </div>
                
                {/* Cluster status live widget */}
                <div className="rounded-2xl bg-slate-900/90 p-5 text-white border border-slate-800/80 shadow-xl shadow-slate-950/20 backdrop-blur-sm shrink-0 min-w-[220px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse shadow-[0_0_8px_#10b981]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-300">Live Status</p>
                  </div>
                  <p className="mt-2.5 text-3xl font-black text-white">Online</p>
                  <p className="mt-1 text-[10px] text-slate-500 font-black uppercase tracking-wider">
                    12 models &bull; 7 pipelines &bull; 4 alerts
                  </p>
                </div>
              </div>
            </header>

            {/* Metrics cards grid */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statsConfig.map((item) => (
                <Card 
                  key={item.title} 
                  variant="default"
                  className="p-5 flex flex-col justify-between border-slate-200/80 shadow-sm hover:shadow-lg transition-shadow group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-emerald-600 transition">
                      {item.title}
                    </div>
                    <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} p-3 text-white shadow-md`}>
                      <item.icon size={18} />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="text-3xl font-black text-slate-800 tracking-tight">{item.value}</div>
                    <p className="mt-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{item.label}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Dynamic visual graph load monitoring */}
            <Card className="p-8 shadow-sm border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    Cluster Predictions & System Load
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-wider">
                    Real-time request metrics of the NLP inference clusters
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600">
                    <RefreshCw size={12} className="animate-spin text-emerald-500" />
                    Live Updating
                  </span>
                </div>
              </div>

              <div className="w-full">
                <DataChart
                  data={aiSystemMetrics}
                  type="area"
                  height={240}
                  xAxisKey="time"
                  series={[
                    { key: "predictions", name: "Predictions volume (req/s)", color: "#10b981" },
                    { key: "cpu", name: "CPU Utilization (%)", color: "#8b5cf6" },
                  ]}
                />
              </div>
            </Card>

            {/* Pipelines workload monitor table */}
            <div className="rounded-[32px] bg-white p-8 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Workloads & Pipelines</h2>
                  <p className="mt-1 text-xs text-slate-400 font-semibold">
                    Top running training, parsing, and inference tasks scheduled on the platform.
                  </p>
                </div>
                
                {/* Workload control panels */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Realtime Search bar input */}
                  <div className="relative flex-1 sm:w-60">
                    <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search active pipelines..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl py-2 pl-10 pr-4 text-xs font-semibold outline-none focus:bg-white focus:border-slate-400"
                    />
                  </div>
                  <Button
                    variant="glow"
                    size="sm"
                    leftIcon={<PlusCircle size={16} />}
                    onClick={() => setShowNewTaskModal(true)}
                  >
                    New Task
                  </Button>
                </div>
              </div>

              {/* Tasks workload loop list */}
              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => {
                    const TaskIcon = getLucideIcon(task.iconName);
                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-100 hover:border-slate-200 bg-white p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 gap-4 relative overflow-hidden group"
                      >
                        {/* Interactive overlay card highlights */}
                        <div className="absolute inset-y-0 left-0 w-1.5 bg-emerald-500 rounded-r-xl scale-y-0 group-hover:scale-y-100 transition duration-300" />
                        
                        <div className="flex items-center gap-4 relative z-10">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shrink-0 ${task.iconBg}`}>
                            <TaskIcon className={task.iconColor} size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                              {task.title}
                              {task.status === "running" && (
                                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                              )}
                            </h4>
                            <p className="mt-1 text-xs text-slate-400 font-semibold">{task.desc}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 justify-between sm:justify-end shrink-0 relative z-10">
                          {/* Progress bar info */}
                          {task.progress !== undefined && (
                            <div className="w-32 hidden md:block">
                              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Avatars */}
                          <div className="flex -space-x-2">
                            {task.avatars.map((av, index) => (
                              <Avatar
                                key={index}
                                initials={av}
                                color={
                                  index === 0
                                    ? "bg-blue-500"
                                    : index === 1
                                      ? "bg-rose-500"
                                      : "bg-purple-500"
                                }
                              />
                            ))}
                          </div>
                          
                          {/* Terminal logs shortcut link */}
                          <div className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition">
                            <Terminal size={14} />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <AlertTriangle size={24} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">No active pipelines match your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right pulse monitoring section */}
          <RightSidebar />
        </div>
      </main>

      {/* Simulated Live Terminal Logs Modal Drawer */}
      <Modal
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        title={selectedTask ? `Live Pipeline Terminal: ${selectedTask.title}` : ""}
        size="lg"
      >
        {selectedTask && (
          <div className="space-y-4">
            {/* Terminal log window box */}
            <div className="bg-slate-950 font-mono text-emerald-400 p-6 rounded-3xl shadow-2xl h-[380px] overflow-y-auto flex flex-col border border-slate-800 relative">
              <div className="absolute top-3 right-4 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block animate-pulse" />
              </div>
              <div className="flex-1 space-y-1.5 text-xs">
                {activeLogs.map((log, idx) => {
                  let isAlert = log.includes("[ALERT]");
                  let isSuccess = log.includes("[SUCCESS]");
                  let isLaunch = log.includes("[LAUNCH]");
                  
                  return (
                    <div 
                      key={idx} 
                      className={cn(
                        "leading-relaxed font-semibold",
                        isAlert ? "text-amber-300" : isSuccess ? "text-emerald-300" : isLaunch ? "text-sky-300" : "text-emerald-400"
                      )}
                    >
                      <span className="text-slate-600 font-black mr-2 select-none">&bull;&bull;&bull;</span>
                      {log}
                    </div>
                  );
                })}
                {/* Blinking cursor */}
                {terminalIndex < (pipelineTerminalLogs[selectedTask.id] || []).length && (
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] pt-1">
                    <span className="w-1.5 h-3 bg-emerald-400 animate-cursor-blink" />
                    <span className="italic">Streaming buffer...</span>
                  </div>
                )}
                <div ref={terminalBottomRef} />
              </div>
            </div>

            {/* Logs summary details */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="font-extrabold text-slate-700">Pipeline logs active</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Model: {selectedTask.title} &bull; Thread #16
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                leftIcon={<FileText size={14} />}
                onClick={() => {
                  // Simulate log download
                  alert(`Downloading logs package: ${selectedTask.title.toLowerCase().replace(/ /g, "-")}-logs.txt`);
                }}
              >
                Download Raw Logs
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Task Creator Modal */}
      <Modal
        isOpen={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        title="Deploy New Pipeline Task"
      >
        <form onSubmit={handleCreateTask} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Task Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Vision Object Classifier"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl py-3 px-4 text-sm font-medium transition-all outline-none focus:bg-white focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Task Description</label>
              <input
                type="text"
                placeholder="e.g. Ingestion block for global dataset, tuning metrics"
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl py-3 px-4 text-sm font-medium transition-all outline-none focus:bg-white focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Pipeline Engine Core</label>
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                {[
                  { type: "Cpu", label: "General CPU Core Ingestion", desc: "Data pipelines & processing" },
                  { type: "Globe", label: "Global Web Scraper API", desc: "Crawling thread processes" },
                  { type: "Database", label: "Analytics Ingestion Cluster", desc: "Customer datasets, SQL models" },
                  { type: "Zap", label: "Real-time Tensor Inference", desc: "Transformer deep weights tuning" },
                ].map((engine) => (
                  <button
                    key={engine.type}
                    type="button"
                    onClick={() => setNewTaskType(engine.type as any)}
                    className={cn(
                      "p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col gap-1",
                      newTaskType === engine.type
                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-800 dark:text-emerald-400"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                    )}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">{engine.label}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{engine.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-900/60 pt-4">
            <Button variant="outline" type="button" onClick={() => setShowNewTaskModal(false)}>
              Cancel
            </Button>
            <Button variant="glow" type="submit">
              Queue & Deploy Pipeline
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
