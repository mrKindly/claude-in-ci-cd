# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview the production build locally

There is no test suite and no lint script configured in this repo.

## Architecture

This is a single-page React + Vite todo-list app ("TaskPulse") styled with Tailwind CSS v4. There is no backend, no routing, and no external state management library.

- **`src/App.jsx`** is the single source of truth. All application state lives here via `useState`: the task list, dark-mode flag, search query, status/category filters, and sort order. All filtering and sorting logic (`filteredTasks`, `sortedTasks`) is computed inline in this component on every render.
- Tasks are persisted to `localStorage` under the key `taskpulse_tasks_v1`, synced via a `useEffect` on every change to `tasks`. If nothing is in storage, `App.jsx` seeds the UI with `INITIAL_DEMO_TASKS`.
- All components under `src/components/` (`Header`, `StatsBar`, `TaskInput`, `FilterBar`, `TaskList`, `TaskItem`) are controlled/presentational — they receive data and callback props (`onAddTask`, `onToggle`, `onDelete`, `onUpdate`, etc.) from `App.jsx` and hold no task state of their own. `TaskList` renders `TaskItem` per task.
- Task shape: `{ id, title, category, priority, completed, createdAt, dueDate }`.
- Entry point is `src/main.jsx`, which mounts `<App />` into `#root` (see `index.html`) inside `React.StrictMode`.

When adding features, keep state centralized in `App.jsx` and pass data/handlers down as props, consistent with the existing pattern — don't introduce a new state management layer for this scale of app.
