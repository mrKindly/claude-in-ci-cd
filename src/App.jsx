import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'taskpulse_tasks_v1';

const INITIAL_DEMO_TASKS = [
  {
    id: '1',
    title: 'Design high-fidelity dashboard wireframes for client presentation',
    category: 'work',
    priority: 'high',
    completed: false,
    createdAt: Date.now() - 1000000,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
  },
  {
    id: '2',
    title: '30-minute afternoon cardio session & hydration check',
    category: 'health',
    priority: 'medium',
    completed: true,
    createdAt: Date.now() - 2000000,
    dueDate: new Date().toISOString().split('T')[0], // Today
  },
  {
    id: '3',
    title: 'Review quarterly budget allocation and subscriptions',
    category: 'finance',
    priority: 'high',
    completed: false,
    createdAt: Date.now() - 3000000,
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], // 3 days
  },
  {
    id: '4',
    title: 'Buy organic fruits, oats, and almond milk',
    category: 'shopping',
    priority: 'low',
    completed: false,
    createdAt: Date.now() - 4000000,
    dueDate: null,
  },
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_TASKS;
    } catch {
      return INITIAL_DEMO_TASKS;
    }
  });

  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [tasks]);

  // Handle dark mode body class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Task actions
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
    }
  };

  const handleLoadSampleTasks = () => {
    setTasks(INITIAL_DEMO_TASKS);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  // Filter & Sort Logic
  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (statusFilter === 'active' && task.completed) return false;
    if (statusFilter === 'completed' && !task.completed) return false;

    // Category filter
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;

    // Search query
    if (
      searchQuery.trim() &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    ) {
      return false;
    }

    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'newest') return b.createdAt - a.createdAt;
    if (sortBy === 'oldest') return a.createdAt - b.createdAt;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'priority') {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    }
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Background Glow Elements */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <main className="relative max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header Component */}
        <Header
          tasksCount={tasks.length}
          completedCount={completedCount}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onClearAll={handleClearAll}
        />

        {/* Stats Dashboard */}
        <StatsBar tasks={tasks} />

        {/* Task Input Form */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Filter & Search Bar */}
        {tasks.length > 0 && (
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}

        {/* Task List */}
        <TaskList
          tasks={sortedTasks}
          allTasksCount={tasks.length}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          onClearCompleted={handleClearCompleted}
          onLoadSampleTasks={handleLoadSampleTasks}
          onResetFilters={handleResetFilters}
        />

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            Built with <span className="text-indigo-400 font-semibold">React 19</span>,{' '}
            <span className="text-cyan-400 font-semibold">Vite 6</span> &{' '}
            <span className="text-teal-400 font-semibold">Tailwind CSS v4</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
