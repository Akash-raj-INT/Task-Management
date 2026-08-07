'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Layers } from 'lucide-react';
import { api, getToken, setSession } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already signed in, skip straight to the board
  useEffect(() => {
    if (getToken()) router.replace('/dashboard');
  }, [router]);

  const handleGuestLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { accessToken, user } = await api.guestLogin(name || 'Guest');
      setSession(accessToken, user);
      router.push('/dashboard');
    } catch (err) {
      setError('Could not start a guest session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-bg font-body text-text">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
            <Layers size={16} />
          </div>
          <span className="font-display text-lg font-semibold">Flowboard</span>
        </div>
        <ThemeToggle />
      </header>

      <section className="flex flex-1 items-center justify-center px-6 pb-24">
        <div className="w-full max-w-sm">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
            Welcome
          </p>
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Plan your work.
            <br />
            Skip the sign-up.
          </h1>
          <p className="mt-3 text-sm text-muted">
            Continue as a guest to try Flowboard instantly — no account or
            password needed. Your tasks stay tied to this browser session.
          </p>

          <div className="mt-8 space-y-3">
            <label htmlFor="name" className="text-xs font-medium text-muted">
              Display name (optional)
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya"
              className="w-full rounded-card border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
            />

            {error && <p className="text-sm text-high">{error}</p>}

            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-card bg-accent px-4 py-3 text-sm font-semibold text-white shadow-card transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Starting session…' : 'Continue as Guest'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
