'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api, getToken, getStoredUser, AuthUser, Task, TaskStatus } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { TaskColumn } from '@/components/TaskColumn';
import { TaskModal } from '@/components/TaskModal';

const COLUMNS: { status: TaskStatus; title: string; accentClass: string }[] = [
  { status: 'todo', title: 'To Do', accentClass: 'bg-muted' },
  { status: 'in_progress', title: 'In Progress', accentClass: 'bg-medium' },
  { status: 'done', title: 'Done', accentClass: 'bg-low' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo');

  const loadTasks = useCallback(async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Could not load tasks. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/');
      return;
    }
    setUser(getStoredUser());
    loadTasks();
  }, [router, loadTasks]);

  const openNewTaskModal = (status: TaskStatus = 'todo') => {
    setEditingTask(null);
    setDefaultStatus(status);
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<Task>) => {
    if (editingTask) {
      const updated = await api.updateTask(editingTask.id, data);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      const created = await api.createTask({ ...data, status: data.status || defaultStatus });
      setTasks((prev) => [created, ...prev]);
    }
  };

  const handleDelete = async (id: string) => {
    // Optimistic UI update, rolled back if the request fails
    const prevTasks = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await api.deleteTask(id);
    } catch {
      setTasks(prevTasks);
      setError('Could not delete the task. Please try again.');
    }
  };

  const handleDropTask = async (taskId: string, status: TaskStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === status) return;
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));
    try {
      await api.updateTask(taskId, { status });
    } catch {
      loadTasks(); // resync on failure
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg text-muted">
        Loading your board…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg font-body text-text">
      <Navbar user={user} onNewTask={() => openNewTaskModal('todo')} />

      <div className="px-6 py-6 sm:px-10">
        <h1 className="font-display text-2xl font-semibold">Your Board</h1>
        <p className="mt-1 text-sm text-muted">
          Drag tasks between columns, or click a card to edit it.
        </p>

        {error && (
          <div className="mt-4 rounded-card border border-high/30 bg-high/10 px-4 py-2.5 text-sm text-high">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          {COLUMNS.map((col) => (
            <TaskColumn
              key={col.status}
              title={col.title}
              status={col.status}
              accentClass={col.accentClass}
              tasks={tasks.filter((t) => t.status === col.status)}
              onAddTask={() => openNewTaskModal(col.status)}
              onOpenTask={openEditModal}
              onDeleteTask={handleDelete}
              onDropTask={handleDropTask}
            />
          ))}
        </div>
      </div>

      <TaskModal
        open={modalOpen}
        initialTask={editingTask}
        defaultStatus={defaultStatus}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </main>
  );
}
