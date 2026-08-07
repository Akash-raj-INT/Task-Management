'use client';

import { Calendar, Trash2, GripVertical } from 'lucide-react';
import { Task, TaskPriority } from '@/lib/api';

const priorityStyles: Record<TaskPriority, { bg: string; text: string; label: string }> = {
  high: { bg: 'bg-high/10', text: 'text-high', label: 'High' },
  medium: { bg: 'bg-medium/10', text: 'text-medium', label: 'Medium' },
  low: { bg: 'bg-low/10', text: 'text-low', label: 'Low' },
};

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDelete: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

export function TaskCard({ task, onClick, onDelete, draggable, onDragStart }: TaskCardProps) {
  const priority = priorityStyles[task.priority];

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      className="group cursor-pointer rounded-card border border-border bg-surface p-4 shadow-card transition hover:border-accent/40"
      onClick={onClick}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        {/* Signature element: pennant-shaped priority flag */}
        <span
          className={`pennant inline-flex items-center py-1 pl-2.5 pr-3.5 text-[11px] font-semibold ${priority.bg} ${priority.text}`}
        >
          {priority.label}
        </span>
        <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
          <GripVertical size={14} className="text-muted" />
          <button
            aria-label="Delete task"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded p-1 text-muted hover:bg-surfaceHover hover:text-high"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <h3 className="font-display text-sm font-semibold leading-snug text-text">
        {task.title}
      </h3>
      {task.description && (
        <p className="mt-1 line-clamp-2 text-xs text-muted">{task.description}</p>
      )}

      {task.dueDate && (
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted">
          <Calendar size={12} />
          <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        </div>
      )}
    </div>
  );
}
