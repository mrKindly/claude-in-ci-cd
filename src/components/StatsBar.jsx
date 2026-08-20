import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Layers } from 'lucide-react';

export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter((t) => t.priority === 'high' && !t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (total === 0) return null;

  return (
    <div className="mb-6 space-y-3">
      {/* Progress Bar Container */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
          <span>Overall Progress</span>
          <span className="text-indigo-400 font-bold">{percentage}% Completed</span>
        </div>
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Total Tasks</p>
            <p className="text-base font-bold text-slate-100">{total}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Completed</p>
            <p className="text-base font-bold text-emerald-400">{completed}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Pending</p>
            <p className="text-base font-bold text-blue-400">{pending}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">High Priority</p>
            <p className="text-base font-bold text-rose-400">{highPriority}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
