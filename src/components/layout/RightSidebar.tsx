"use client";

import React, { useState } from "react";
import { Calendar, Flame, Zap, MoreHorizontal, Database, Cpu, ShieldAlert, Sparkles, Check } from "lucide-react";
import { Avatar, Modal, Button } from "../ui";

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  type: "drift" | "sync" | "audit";
  desc: string;
}

export default function RightSidebar() {
  const [activeTeamMember, setActiveTeamMember] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: "event-1",
      title: "Review model drift",
      time: "Today · 10:00 AM",
      type: "drift",
      desc: "Checking Transformer weights drift on latest golden eval set.",
    },
    {
      id: "event-2",
      title: "Sync dataset logs",
      time: "Today · 2:00 PM",
      type: "sync",
      desc: "Synchronizing cold storage logs from Amazon S3 bucket to local cluster.",
    },
  ]);
  
  // Add Event Form State
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventTime) return;

    const newEvent: ScheduleItem = {
      id: `event-${Date.now()}`,
      title: newEventTitle,
      time: newEventTime,
      type: "audit",
      desc: newEventDesc || "Custom scheduled event.",
    };

    setSchedules([...schedules, newEvent]);
    setNewEventTitle("");
    setNewEventTime("");
    setNewEventDesc("");
    setShowAddEventModal(false);
  };

  const teamMembers = [
    { name: "Agnes H.", role: "Owner & Lead", status: "Active in branch dev-main", avatar: "A", color: "bg-cyan-500" },
    { name: "Beatrix S.", role: "Senior Data Scientist", status: "Reviewing F1 thresholds", avatar: "B", color: "bg-rose-500" },
    { name: "Caleb K.", role: "DevOps Engineer", status: "Optimizing database cluster nodes", avatar: "C", color: "bg-amber-500" },
  ];

  return (
    <aside className="hidden xl:flex w-[360px] shrink-0 flex-col bg-slate-950 text-white sticky top-0 h-screen overflow-y-auto p-8 border-l border-slate-900 shadow-2xl">
      {/* Header section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">Workload</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Today’s pulse
            <Sparkles size={16} className="text-emerald-400 animate-pulse" />
          </h2>
        </div>
        <button 
          onClick={() => setShowAddEventModal(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 transition cursor-pointer"
          title="Add schedule event"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Metrics widgets */}
      <div className="grid gap-6">
        {/* Widget 1: System load state */}
        <div className="rounded-[28px] bg-slate-900/60 border border-slate-800/80 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Jobs</p>
              <p className="mt-1 text-3xl font-black tracking-tight text-emerald-400">8 Running</p>
            </div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-emerald-400 shadow-inner border border-slate-800 animate-pulse-glow">
              <Cpu size={18} />
            </div>
          </div>
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl bg-slate-950/80 p-3.5 border border-slate-900/60 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Alerts Status</span>
              <span className="inline-flex items-center gap-1 text-xs font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-lg border border-rose-500/20">
                <ShieldAlert size={12} />
                <span>4 open</span>
              </span>
            </div>
            <div className="rounded-2xl bg-slate-950/80 p-3.5 border border-slate-900/60 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Next Sync</span>
              <span className="text-xs font-black text-sky-400">12:30 PM</span>
            </div>
          </div>
        </div>

        {/* Widget 2: Team status */}
        <div className="rounded-[28px] bg-slate-900/60 border border-slate-800/80 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Team status</p>
            <span className="rounded-full bg-emerald-500/15 px-3 py-0.5 text-[10px] font-black text-emerald-300 border border-emerald-500/20 uppercase tracking-wide">Stable</span>
          </div>
          
          {/* Interactive Avatars */}
          <div className="mt-5 flex items-center gap-3">
            {teamMembers.map((member, i) => (
              <div 
                key={i} 
                onClick={() => setActiveTeamMember(activeTeamMember === member.name ? null : member.name)}
                className="cursor-pointer relative hover:scale-110 transition duration-200"
                title={member.name}
              >
                <Avatar initials={member.avatar} color={member.color} border={activeTeamMember === member.name ? "border-emerald-400" : "border-slate-800"} />
                {activeTeamMember === member.name && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border border-slate-950 rounded-full flex items-center justify-center text-[8px]">
                    <Check size={8} className="text-slate-950 stroke-[4px]" />
                  </span>
                )}
              </div>
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-400 shadow-inner">+2</div>
          </div>

          {/* Active inspected team member panel */}
          {activeTeamMember && (
            <div className="mt-4 p-3 bg-slate-950/80 border border-slate-900 rounded-2xl animate-fade-in-up">
              {teamMembers.filter(m => m.name === activeTeamMember).map((m) => (
                <div key={m.name} className="text-xs">
                  <p className="font-extrabold text-emerald-400">{m.name}</p>
                  <p className="text-slate-400 font-semibold mt-0.5">{m.role}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed border-t border-slate-900 pt-1">{m.status}</p>
                </div>
              ))}
            </div>
          )}

          {/* Glowing loaders */}
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl bg-slate-950/80 p-3.5 border border-slate-900/60 flex items-center justify-between group cursor-pointer hover:border-orange-500/30 transition">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inference load</p>
                <p className="mt-0.5 font-bold text-slate-200 text-sm">82% Capacity</p>
              </div>
              <Flame className="text-orange-400 animate-pulse" size={18} />
            </div>
            
            <div className="rounded-2xl bg-slate-950/80 p-3.5 border border-slate-900/60 flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 transition">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data Sync status</p>
                <p className="mt-0.5 font-bold text-slate-200 text-sm">24m remaining</p>
              </div>
              <Zap className="text-emerald-400 animate-pulse-glow" size={18} />
            </div>
          </div>
        </div>

        {/* Widget 3: Upcoming schedule */}
        <div className="rounded-[28px] bg-slate-900/60 border border-slate-800/80 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming schedule</p>
            <div className="inline-flex rounded-lg bg-slate-950 px-2 py-0.5 text-[10px] font-black text-slate-400 border border-slate-900 uppercase tracking-wider">
              {schedules.length} Events
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                onClick={() => setSelectedSchedule(schedule)}
                className="rounded-2xl bg-slate-950/80 p-3.5 border border-slate-900/60 hover:border-slate-700/80 hover:bg-slate-900/30 cursor-pointer transition flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-200 truncate group-hover:text-emerald-400 transition">{schedule.title}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500 font-semibold">{schedule.time}</p>
                </div>
                {schedule.type === "drift" ? (
                  <Flame className="text-sky-400 shrink-0" size={16} />
                ) : (
                  <Database className="text-cyan-400 shrink-0" size={16} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Detail Modal */}
      <Modal
        isOpen={selectedSchedule !== null}
        onClose={() => setSelectedSchedule(null)}
        title="Schedule Event Details"
      >
        {selectedSchedule && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 rounded-2xl text-emerald-600 dark:text-emerald-400">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{selectedSchedule.title}</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">{selectedSchedule.time}</p>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Details</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                {selectedSchedule.desc}
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="primary" onClick={() => setSelectedSchedule(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Event Modal */}
      <Modal
        isOpen={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        title="Schedule Sync/Audit Event"
      >
        <form onSubmit={handleAddEvent} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Event Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Ingest Model Alpha weights"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl py-3 px-4 text-sm font-medium transition-all outline-none focus:bg-white focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Time Schedule</label>
              <input
                type="text"
                required
                placeholder="e.g. Today · 5:30 PM"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl py-3 px-4 text-sm font-medium transition-all outline-none focus:bg-white focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Description (Optional)</label>
              <textarea
                placeholder="Brief summary of event purposes..."
                value={newEventDesc}
                onChange={(e) => setNewEventDesc(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl py-3 px-4 text-sm font-medium transition-all outline-none focus:bg-white focus:border-emerald-500 h-20 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-900/60 pt-4">
            <Button variant="outline" type="button" onClick={() => setShowAddEventModal(false)}>
              Cancel
            </Button>
            <Button variant="glow" type="submit">
              Schedule Event
            </Button>
          </div>
        </form>
      </Modal>
    </aside>
  );
}
