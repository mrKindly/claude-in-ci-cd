import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from './TaskInput';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="mb-6 space-y-4">
      {/* Upper row: Search & Status Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-slate-900/80 border border-slate-800 text-slate-200 text-xs sm:text-sm rounded-xl pl-10 pr-9 py-2.5 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 self-start md:self-auto">
          {['all', 'active', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`capitalize px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === tab
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-slate-300 text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value="newest" className="bg-slate-900 text-slate-200">Newest First</option>
            <option value="oldest" className="bg-slate-900 text-slate-200">Oldest First</option>
            <option value="dueDate" className="bg-slate-900 text-slate-200">Due Date</option>
            <option value="priority" className="bg-slate-900 text-slate-200">Priority</option>
            <option value="title" className="bg-slate-900 text-slate-200">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Lower row: Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 border ${
            categoryFilter === 'all'
              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-300 hover:border-slate-700'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 border ${
              categoryFilter === cat.id
                ? `${cat.color} font-semibold shadow-sm`
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-300 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
