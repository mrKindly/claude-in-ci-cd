import React, { useState } from 'react';
import { Check, Trash2, Edit3, Calendar, AlertCircle, Tag, Save, X } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from './TaskInput';

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const categoryObj = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[0];
  const priorityObj = PRIORITIES.find((p) => p.id === task.priority) || PRIORITIES[0];

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, {
      title: editTitle.trim(),
      category: editCategory,
      priority: editPriority,
      dueDate: editDueDate || null,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  // Format due date indicator
  const getDueDateLabel = (dateString) => {
    if (!dateString) return null;
    const due = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `Overdue by ${Math.abs(diffDays)}d`, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
    } else if (diffDays === 0) {
      return { text: 'Due Today', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    } else if (diffDays === 1) {
      return { text: 'Due Tomorrow', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' };
    } else {
      return { text: `Due in ${diffDays}d`, color: 'text-slate-400 bg-slate-800/80 border-slate-700' };
    }
  };

  const dateStatus = getDueDateLabel(task.dueDate);

  return (
    <div
      className={`group relative rounded-2xl border p-4 transition-all duration-300 backdrop-blur-md animate-fade-in ${
        task.completed
          ? 'bg-slate-900/40 border-slate-800/60 text-slate-500'
          : 'bg-slate-900/90 border-slate-800 text-slate-100 hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-500/5'
      }`}
    >
      {isEditing ? (
        // EDIT MODE
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            autoFocus
          />
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2 py-1"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>

            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2 py-1"
            >
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label} Priority
                </option>
              ))}
            </select>

            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2 py-1 scheme-dark"
            />

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 font-semibold"
              >
                <Save className="w-3.5 h-3.5" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 font-semibold"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        // VIEW MODE
        <div className="flex items-start justify-between gap-3">
          {/* Left: Checkbox & Task details */}
          <div className="flex items-start gap-3.5 flex-1 min-w-0">
            {/* Interactive Checkbox */}
            <button
              onClick={() => onToggle(task.id)}
              className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-lg border transition-all duration-200 shrink-0 ${
                task.completed
                  ? 'bg-gradient-to-tr from-indigo-500 to-purple-600 border-transparent text-white shadow-md shadow-indigo-500/30 animate-pop'
                  : 'bg-slate-950/80 border-slate-700 hover:border-indigo-500/80 text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </button>

            {/* Content & Metadata */}
            <div className="flex-1 min-w-0">
              <p
                onDoubleClick={() => setIsEditing(true)}
                className={`text-sm sm:text-base font-medium leading-snug break-words transition-all ${
                  task.completed ? 'line-through text-slate-500' : 'text-slate-100'
                }`}
              >
                {task.title}
              </p>

              {/* Tags & Badges Row */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
                {/* Category Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border font-medium ${categoryObj.color}`}
                >
                  <Tag className="w-3 h-3" />
                  {categoryObj.label}
                </span>

                {/* Priority Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-medium ${priorityObj.color}`}
                >
                  <AlertCircle className="w-3 h-3" />
                  {priorityObj.label}
                </span>

                {/* Due Date Indicator */}
                {dateStatus && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-medium ${dateStatus.color}`}
                  >
                    <Calendar className="w-3 h-3" />
                    {dateStatus.text}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              title="Edit Task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              title="Delete Task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
