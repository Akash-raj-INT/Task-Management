'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="relative flex h-9 w-16 items-center rounded-full border border-border bg-surfaceHover px-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-surface shadow-card transition-transform duration-200 ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? (
          <Moon size={14} className="text-accent" />
        ) : (
          <Sun size={14} className="text-accent" />
        )}
      </span>
    </button>
  );
}
