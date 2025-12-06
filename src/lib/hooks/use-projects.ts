import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Project } from '@/types/models';

interface CreateProjectData {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  goals: string[];
  status?: 'planning' | 'active' | 'completed' | 'suspended';
}

interface UpdateProjectData {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: 'planning' | 'active' | 'completed' | 'suspended';
  goals?: string[];
}

/**
 * プロジェクト一覧を取得するカスタムフック
 */
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      return data.projects as Project[];
    },
  });
}

/**
 * 単一プロジェクトを取得するカスタムフック
 */
export function useProject(projectId: string) {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`);
      if (!res.ok) throw new Error('Failed to fetch project');
      const data = await res.json();
      return data.project as Project;
    },
    enabled: !!projectId,
  });
}

/**
 * プロジェクト作成のカスタムフック
 */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProjectData) => {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create project');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

/**
 * プロジェクト更新のカスタムフック
 */
export function useUpdateProject(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProjectData) => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update project');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
  });
}

/**
 * プロジェクト削除のカスタムフック
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete project');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
