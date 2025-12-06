import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task } from '@/types/models';

interface CreateTaskData {
  projectId: string;
  title: string;
  description?: string;
  assigneeId: string;
  priority: 'high' | 'medium' | 'low';
  status?: 'todo' | 'in_progress' | 'review' | 'done';
  estimatedHours?: number;
  dueDate: string;
  dependencies?: string[];
  tags?: string[];
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  assigneeId?: string;
  priority?: 'high' | 'medium' | 'low';
  status?: 'todo' | 'in_progress' | 'review' | 'done';
  estimatedHours?: number;
  actualHours?: number;
  dueDate?: string;
  dependencies?: string[];
  tags?: string[];
}

interface UseTasksParams {
  projectId?: string;
  status?: string;
  assigneeId?: string;
}

/**
 * タスク一覧を取得するカスタムフック
 */
export function useTasks(params?: UseTasksParams) {
  const queryParams = new URLSearchParams();
  if (params?.projectId) queryParams.set('projectId', params.projectId);
  if (params?.status) queryParams.set('status', params.status);
  if (params?.assigneeId) queryParams.set('assigneeId', params.assigneeId);

  const queryString = queryParams.toString();

  return useQuery({
    queryKey: ['tasks', params],
    queryFn: async () => {
      const res = await fetch(`/api/tasks${queryString ? `?${queryString}` : ''}`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      return data.tasks as Task[];
    },
  });
}

/**
 * 単一タスクを取得するカスタムフック
 */
export function useTask(taskId: string) {
  return useQuery({
    queryKey: ['tasks', taskId],
    queryFn: async () => {
      const res = await fetch(`/api/tasks/${taskId}`);
      if (!res.ok) throw new Error('Failed to fetch task');
      const data = await res.json();
      return data.task as Task;
    },
    enabled: !!taskId,
  });
}

/**
 * タスク作成のカスタムフック
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskData) => {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create task');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

/**
 * タスク更新のカスタムフック
 */
export function useUpdateTask(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateTaskData) => {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update task');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
    },
  });
}

/**
 * タスク削除のカスタムフック
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete task');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
