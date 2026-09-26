import React from 'react';
import { Award, ShieldCheck, CheckCircle2, User, BookOpen, Clock, Download, ExternalLink } from 'lucide-react';
import { HaTraderLogo } from './HaTraderLogo';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  balance,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Student Verification Portal
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  Active Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Student ID: HA-2026-8942 · Haris Ahmad Mentorship
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs">
          {/* Progress Tracker */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 dark:text-blue-200">
                Institutional Certification Progress
              </span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                68% Completed
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-blue-200 dark:bg-blue-900/60 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-[68%]" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Next Milestone: Consequent Encroachment Mastery</span>
              <span>18 / 24 Lessons Done</span>
            </div>
          </div>

          {/* Prop Firm Challenge Status */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
              <span className="block text-[10px] uppercase font-sans text-slate-400 font-bold">
                Evaluation Balance
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
              <span className="block text-[10px] uppercase font-sans text-slate-400 font-bold">
                Max Daily Drawdown Buffer
              </span>
              <span className="text-base font-bold text-emerald-500 tabular-nums">
                $2,500.00 (Safe)
              </span>
            </div>
          </div>

          {/* Badges & Milestones */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Earned Badges & Credentials
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto" />
                <span className="block font-bold text-emerald-700 dark:text-emerald-300">
                  Risk Guardian
                </span>
                <span className="text-[10px] text-slate-500">Zero Drawdown Breaches</span>
              </div>

              <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 text-center space-y-1">
                <Award className="w-5 h-5 text-blue-500 mx-auto" />
                <span className="block font-bold text-blue-700 dark:text-blue-300">
                  SMC Certified
                </span>
                <span className="text-[10px] text-slate-500">FVG & Order Block Exam</span>
              </div>

              <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20 text-center space-y-1">
                <Clock className="w-5 h-5 text-amber-500 mx-auto" />
                <span className="block font-bold text-amber-700 dark:text-amber-300">
                  Session Master
                </span>
                <span className="text-[10px] text-slate-500">London Killzone Specialist</span>
              </div>
            </div>
          </div>

          {/* Trading Plan Download */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  HA Trader 2026 Institutional Trading Plan (PDF)
                </p>
                <p className="text-[11px] text-slate-400">
                  Mechanical rulebook, checklist, and risk calculations.
                </p>
              </div>
            </div>
            <button
              onClick={() => alert('Downloaded HA Trader Institutional Trading Plan!')}
              className="px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg border border-blue-500/30 flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>HA Trader Academy Student Portal</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
