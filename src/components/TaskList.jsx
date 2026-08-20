import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList, SearchX, Sparkles, CheckCheck } from 'lucide-react';

export default function TaskList({
  tasks,
  allTasksCount,
  onToggle,
  onDelete,
  onUpdate,
  onClearCompleted,
  onLoadSampleTasks,
  onResetFilters,
}) {
  if (tasks.length === 0) {
    if (allTasksCount === 0) {
      // Empty overall state
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
            <ClipboardList className="w-7 h-7 stroke-[1.75]" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 mb-1">Your task list is empty</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-5">
            Get started by typing a new task above or try loading sample tasks to see how it works.
          </p>
          <button
            onClick={onLoadSampleTasks}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 text-xs font-semibold transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Load Demo Tasks</span>
          </button>
        </div>
      );
    } else {
      // Empty search/filter state
      return (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm animate-fade-in">
          <div className="w-12 h-12 rounded-xl bg-slate-800/60 flex items-center justify-center text-slate-400 mb-3">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-200 mb-1">No matching tasks found</h3>
          <p className="text-xs text-slate-400 max-w-xs mb-4">
            Try adjusting your search criteria or category filters.
          </p>
          <button
            onClick={onResetFilters}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all"
          >
            Reset Filters
          </button>
        </div>
      );
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-3">
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>

      {completedCount > 0 && (
        <div className="pt-3 flex justify-end">
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors font-medium px-2 py-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Clear completed ({completedCount})</span>
          </button>
        </div>
      )}
    </div>
  );
}
