'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Bot,
  Sparkles,
  ArrowRight,
  Maximize2,
  Minimize2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  ChevronRight,
  Activity,
  Zap
} from 'lucide-react';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  assignee: {
    name: string;
    avatar: string;
    role: string;
  };
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Overdue' | 'Done';
  riskLevel: 'High' | 'Medium' | 'Low';
  aiConfidence: number;
}

const INITIAL_ACTIONS: ActionItem[] = [
  {
    id: 'action-101',
    title: 'Enforce AWS S3 Log Encryption at Rest',
    description: 'Configure AWS IAM bucket policies to require SSE-KMS on all customer audit logs.',
    assignee: {
      name: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      role: 'Security Lead'
    },
    deadline: '2026-08-14',
    status: 'Pending',
    riskLevel: 'High',
    aiConfidence: 98
  },
  {
    id: 'action-102',
    title: 'Update Vendor Data Processing Agreements (DPA)',
    description: 'Execute updated HIPAA DPAs with third-party LLM API providers.',
    assignee: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      role: 'Legal Counsel'
    },
    deadline: '2026-08-25',
    status: 'In Progress',
    riskLevel: 'Medium',
    aiConfidence: 95
  },
  {
    id: 'action-103',
    title: 'Setup Automated Multi-Region Database Backups',
    description: 'Configure cross-region database snapshot replication with 30-day retention.',
    assignee: {
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      role: 'DevOps Architect'
    },
    deadline: '2026-08-05',
    status: 'Overdue',
    riskLevel: 'High',
    aiConfidence: 96
  }
];

// Spring physics transition configuration
const springTransition = {
  type: 'spring',
  stiffness: 320,
  damping: 28,
  mass: 0.8
};

export default function MorphingTracker() {
  const [viewMode, setViewMode] = useState<'compact' | 'expanded'>('compact');
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);

  const toggleView = () => {
    setViewMode((prev) => (prev === 'compact' ? 'expanded' : 'compact'));
  };

  const updateStatus = (id: string, newStatus: ActionItem['status']) => {
    setActions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const updateDeadline = (id: string, newDate: string) => {
    setActions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, deadline: newDate } : item))
    );
  };

  const getStatusBadgeClass = (status: ActionItem['status']) => {
    switch (status) {
      case 'Done':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'In Progress':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'Overdue':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse';
      default:
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner Control Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-sky-500/20">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> HAKELIZE TECHWORKS • BUILD FEST '26
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              AI Meeting-to-Action Fluid Compliance Tracker
            </h1>
          </div>
        </div>

        {/* View Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={toggleView}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 transition-all duration-200"
        >
          {viewMode === 'compact' ? (
            <>
              <Maximize2 className="w-4 h-4" />
              View in Compliance Tracker
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              <Minimize2 className="w-4 h-4" />
              Back to Meeting Summary
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Main Morphing Layout Container */}
      <div className="relative min-h-[550px]">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: COMPACT CHAT / TRANSCRIPT SUMMARY CARD */}
          {viewMode === 'compact' && (
            <motion.div
              key="compact-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Left Side: Meeting Dialogue Transcript */}
              <div className="md:col-span-5 glass-panel rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-sky-400" />
                      Live Dialogue Transcript
                    </h2>
                    <span className="text-xs text-slate-400">SOC2 Audit Review</span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-sky-500/10">
                    <p><strong className="text-sky-400">Sarah (CTO):</strong> We need to enforce customer log encryption by Friday.</p>
                    <p><strong className="text-emerald-400">David (Security):</strong> I will take ownership of AWS IAM policies for S3 buckets.</p>
                    <p><strong className="text-purple-400">Elena (Legal):</strong> HIPAA mandates DPAs updated with AI vendor APIs by Aug 25.</p>
                    <p><strong className="text-amber-400">Marcus (DevOps):</strong> Multi-region DB backup snapshots must be setup daily.</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>3 action items extracted by ActionExtractor Agent</span>
                </div>
              </div>

              {/* Right Side: Compact Summary Card containing morphing items */}
              <div className="md:col-span-7 glass-panel rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <h2 className="text-base font-bold text-white">Extracted Action Items</h2>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
                      Compact Summary Mode
                    </span>
                  </div>

                  {/* Morphing Item List with layoutId */}
                  <div className="space-y-3">
                    {actions.map((item) => (
                      <motion.div
                        key={item.id}
                        layoutId={`card-container-${item.id}`}
                        transition={springTransition}
                        whileHover={{ scale: 1.015, translateY: -2 }}
                        className="glass-card-item rounded-xl p-4 cursor-pointer hover:bg-slate-800/80 transition-colors"
                        onClick={toggleView}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <motion.h3
                              layoutId={`card-title-${item.id}`}
                              className="text-sm font-semibold text-white flex items-center gap-2"
                            >
                              {item.title}
                              <ChevronRight className="w-4 h-4 opacity-50" />
                            </motion.h3>
                            <motion.p
                              layoutId={`card-desc-${item.id}`}
                              className="text-xs text-slate-400 line-clamp-1"
                            >
                              {item.description}
                            </motion.p>
                          </div>

                          <motion.span
                            layoutId={`card-badge-${item.id}`}
                            className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusBadgeClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </motion.span>
                        </div>

                        {/* Assignee & Deadline snippet */}
                        <motion.div
                          layoutId={`card-footer-${item.id}`}
                          className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={item.assignee.avatar}
                              alt={item.assignee.name}
                              className="w-5 h-5 rounded-full object-cover ring-1 ring-sky-400/40"
                            />
                            <span>{item.assignee.name}</span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            {item.deadline}
                          </span>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={toggleView}
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 underline underline-offset-4"
                  >
                    Click any card to morph layout into Compliance Tracker
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW 2: EXPANDED ACTION COMPLIANCE TRACKER TABLE/BOARD VIEW */}
          {viewMode === 'expanded' && (
            <motion.div
              key="expanded-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    Action Compliance Tracker
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Expanded compliance workflow matrix with real-time status management & due date pickers.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={toggleView}
                  className="text-xs px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 font-medium"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  Collapse View
                </motion.button>
              </div>

              {/* Table / Grid Container */}
              <div className="space-y-4">
                {actions.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`card-container-${item.id}`}
                    transition={springTransition}
                    whileHover={{ scale: 1.01 }}
                    className="glass-card-item rounded-xl p-5 border border-sky-500/20 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
                  >
                    {/* Column 1: Title & Description */}
                    <div className="lg:col-span-5 space-y-1">
                      <motion.h3
                        layoutId={`card-title-${item.id}`}
                        className="text-base font-bold text-white flex items-center gap-2"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`card-desc-${item.id}`}
                        className="text-xs text-slate-400 leading-relaxed"
                      >
                        {item.description}
                      </motion.p>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-[11px] text-purple-400 flex items-center gap-1 font-medium">
                          <Zap className="w-3 h-3" /> AI Confidence: {item.aiConfidence}%
                        </span>
                        <span className="text-[11px] text-amber-400 font-semibold">
                          Risk: {item.riskLevel}
                        </span>
                      </div>
                    </div>

                    {/* Column 2: Assignee Avatar & Info */}
                    <div className="lg:col-span-3 flex items-center gap-3 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                      <img
                        src={item.assignee.avatar}
                        alt={item.assignee.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-500/40"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {item.assignee.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.assignee.role}
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Interactive Due Date Picker */}
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-sky-400" /> Due Date
                      </label>
                      <input
                        type="date"
                        value={item.deadline}
                        onChange={(e) => updateDeadline(item.id, e.target.value)}
                        className="w-full bg-slate-900 text-xs text-white border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    {/* Column 4: Compliance Status Dropdown & Badge */}
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[11px] font-medium text-slate-400">
                        Compliance Status
                      </label>
                      <motion.select
                        layoutId={`card-badge-${item.id}`}
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(item.id, e.target.value as ActionItem['status'])
                        }
                        className={`w-full text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Done">Done</option>
                      </motion.select>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
