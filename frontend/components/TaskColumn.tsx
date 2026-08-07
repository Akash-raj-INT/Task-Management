'use client';

import { Task, TaskStatus } from '@/lib/api';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  accentClass: string;
  onAddTask: () => void;
  onOpenTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onDropTask: (taskId: string, status: TaskStatus) => void;
}

export function TaskColumn({
  title,
  status,
  tasks,
  accentClass,
  onAddTask,
  onOpenTask,
  onDeleteTask,
  onDropTask,
}: TaskColumnProps) {
  return (
    <div
      className="flex w-full min-w-[280px] flex-1 flex-col rounded-card border border-border bg-surfaceHover/40 p-3 sm:min-w-[300px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData('taskId');
        if (taskId) onDropTask(taskId, status);
      }}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${accentClass}`} />
          <h2 className="font-display text-sm font-semibold">{title}</h2>
          <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          aria-label={`Add task to ${title}`}
          className="rounded p-1 text-muted hover:bg-surface hover:text-accent"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        {tasks.length === 0 && (
          <div className="rounded-card border border-dashed border-border p-6 text-center text-xs text-muted">
            Nothing here yet. Drag a task over or add a new one.
          </div>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
            onClick={() => onOpenTask(task)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
