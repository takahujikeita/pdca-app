/**
 * アプリケーション内のルート定義
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROJECTS: '/dashboard/projects',
  PROJECT_DETAIL: (id: string) => `/dashboard/projects/${id}`,
  PROJECT_NEW: '/dashboard/projects/new',
  TASKS: '/dashboard/tasks',
  TASK_DETAIL: (id: string) => `/dashboard/tasks/${id}`,
  EVALUATIONS: '/dashboard/evaluations',
  EVALUATION_DETAIL: (id: string) => `/dashboard/evaluations/${id}`,
  REPORTS: '/dashboard/reports',
} as const;
