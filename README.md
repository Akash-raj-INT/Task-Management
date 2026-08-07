# Flowboard — Task Management System

A full-stack task management app built for the Full Stack Developer (Fresher) technical
assessment.

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** NestJS + TypeORM + SQLite + JWT auth
- **Auth:** Guest login (no email/password) — issues a JWT tied to a throwaway user record
- **Theme:** Light/dark theme toggle, persisted in `localStorage` and re-applied on refresh

## Project structure

```
task-manager/
├── backend/     NestJS API (auth, tasks, users)
└── frontend/    Next.js app (guest login, kanban board)
```

## Getting started

### Backend

```bash
cd backend
cp .env.example .env      # edit JWT_SECRET before deploying anywhere real
npm install
npm run start:dev         # http://localhost:3001/api
```

Uses SQLite (`task-manager.sqlite`, auto-created) so there's zero external DB setup for local
development. Swap the `TypeOrmModule.forRoot` config in `src/app.module.ts` for Postgres/Mongo
in production if you prefer.

### Frontend

```bash
cd frontend
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at your backend
npm install
npm run dev                # http://localhost:3000
```

## Features implemented

- **Guest login** — `POST /api/auth/guest`, no password required, returns a JWT
- **JWT-protected task CRUD** — `GET/POST/PATCH/DELETE /api/tasks`, scoped to the logged-in user
- **Validation** — `class-validator` DTOs (`CreateTaskDto`, `UpdateTaskDto`) with whitelisting,
  so unexpected/invalid fields are rejected at the API boundary
- **Kanban board** — drag-and-drop cards between To Do / In Progress / Done, optimistic UI
  updates with rollback on failure
- **Theme switching** — light/dark, persisted across refreshes, respects OS preference on first
  visit
- **Reusable components** — `TaskCard`, `TaskModal`, `TaskColumn`, `Navbar`, `ThemeToggle`
- **Responsive layout** — columns stack vertically on mobile, side-by-side from `sm:` up

## Architecture notes

- **Backend:** modular NestJS structure (`auth/`, `tasks/`, `users/`), Passport JWT strategy,
  a guard on every task route, and ownership checks in `TasksService` so users can only read/
  modify their own tasks.
- **Frontend:** a thin `lib/api.ts` fetch wrapper centralizes auth headers and error handling;
  `ThemeProvider` is a small context instead of a heavier state library, since theme is the only
  cross-page client state besides auth (which lives in `localStorage` + is re-read on mount).

## Deploying (so the review link works)

1. **Backend:** deploy `backend/` to Render or Railway (both have a free Node.js tier). Set
   `JWT_SECRET`, `FRONTEND_URL`, and (optionally) `DB_PATH` as environment variables.
2. **Frontend:** deploy `frontend/` to Vercel. Set `NEXT_PUBLIC_API_URL` to your deployed
   backend's `/api` URL.
3. Push this repo to a **public GitHub repository** with multiple small commits (see suggested
   commit breakdown below), and keep both the repo and deployment live for at least 45 days.

### Suggested commit breakdown

```
chore: scaffold backend (NestJS + TypeORM + SQLite)
feat: guest login + JWT auth
feat: task CRUD API with validation and ownership guards
chore: scaffold frontend (Next.js + Tailwind)
feat: theme provider with persisted light/dark mode
feat: guest login page
feat: kanban board with drag-and-drop
feat: task create/edit modal
docs: README + Part 2 product understanding writeup
```

## Part 2

See [`PART2-product-understanding.md`](./PART2-product-understanding.md) for the AbleSpace
Caseload → Take Data walkthrough and suggested improvements.
