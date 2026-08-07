'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '@/lib/api';

interface TaskModalProps {
  open: boolean;
  initialTask?: Task | null;
  defaultStatus?: TaskStatus;
  onClose: () => void;
  onSave: (data: Partial<Task>) => Promise<void>;
}

const emptyForm = {
  title: '',
  description: '',
  status: 'todo' as TaskStatus,
  priority: 'medium' as TaskPriority,
  dueDate: '',
};

export function TaskModal({ open, initialTask, defaultStatus, onClose, onSave }: TaskModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title,
        description: initialTask.description || '',
        status: initialTask.status,
        priority: initialTask.priority,
        dueDate: initialTask.dueDate?.slice(0, 10) || '',
      });
    } else {
      setForm({ ...emptyForm, status: defaultStatus || 'todo' });
    }
  }, [initialTask, defaultStatus, open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await onSave({ ...form, dueDate: form.dueDate || undefined });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-t-card border border-border bg-surface p-6 shadow-card sm:rounded-card"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">
            {initialTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1 text-muted hover:bg-surfaceHover"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Title</label>
            <input
              autoFocus
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Design the onboarding flow"
              className="w-full rounded-card border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Add more detail (optional)"
              rows={3}
              className="w-full resize-none rounded-card border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
                className="w-full rounded-card border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as TaskPriority })}
                className="w-full rounded-card border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Due date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full rounded-card border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-card border border-border py-2.5 text-sm font-medium text-text hover:bg-surfaceHover"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-card bg-accent py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving ? 'Saving…' : initialTask ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </div>
  );
}
