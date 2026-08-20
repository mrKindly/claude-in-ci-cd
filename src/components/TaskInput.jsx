import React, { useState } from 'react';
import { Plus, Calendar, Tag, AlertCircle } from 'lucide-react';

export const CATEGORIES = [
  { id: 'general', label: 'General', color: 'bg-slate-700 text-slate-200 border-slate-600' },
  { id: 'work', label: 'Work', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  { id: 'personal', label: 'Personal', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  { id: 'health', label: 'Health', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  { id: 'finance', label: 'Finance', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  { id: 'shopping', label: 'Shopping', color: 'bg-pink-500/10 text-pink-400 border-pink-500/30' },
];

export const PRIORITIES = [
  { id: 'low', label: 'Low', color: 'text-slate-400 bg-slate-800/80 border-slate-700' },
  { id: 'medium', label: 'Medium', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { id: 'high', label: 'High', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
];

export default function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      category,
      priority,
      dueDate: dueDate || null,
    });

    setTitle('');
    setDueDate('');
    setCategory('general');
    setPriority('medium');
    setIsExpanded(false);
  };

  return (
    <div className="mb-8 rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new task... (Press Enter or click Add)"
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base font-medium focus:outline-none px-2 py-1"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Expanded options: category, priority, due date */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs animate-fade-in">
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Dropdown */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-transparent text-slate-300 text-xs font-medium focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-slate-900 text-slate-200">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Dropdown */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="bg-transparent text-slate-300 text-xs font-medium focus:outline-none cursor-pointer"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                      {p.label} Priority
                    </option>
                  ))}
                </select>
              </div>

              {/* Due Date Input */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-transparent text-slate-300 text-xs font-medium focus:outline-none cursor-pointer scheme-dark"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-slate-500 hover:text-slate-400 text-xs font-medium underline underline-offset-2 ml-auto"
            >
              Minimize
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
