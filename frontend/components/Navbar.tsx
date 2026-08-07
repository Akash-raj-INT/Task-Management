'use client';

import { useRouter } from 'next/navigation';
import { Layers, LogOut, Plus } from 'lucide-react';
import { clearSession, AuthUser } from '@/lib/api';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  user: AuthUser | null;
  onNewTask: () => void;
}

export function Navbar({ user, onNewTask }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.replace('/');
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4 sm:px-10">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
          <Layers size={16} />
        </div>
        <span className="font-display text-lg font-semibold">Flowboard</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onNewTask}
          className="flex items-center gap-1.5 rounded-card bg-accent px-3.5 py-2 text-sm font-semibold text-white shadow-card hover:opacity-90"
        >
          <Plus size={15} />
          New Task
        </button>
        <ThemeToggle />
        <div className="mx-1 h-6 w-px bg-border" />
        <span className="hidden text-sm text-muted sm:inline">
          {user?.displayName || 'Guest'}
        </span>
        <button
          onClick={handleLogout}
          aria-label="Log out"
          className="rounded p-2 text-muted hover:bg-surfaceHover hover:text-high"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
