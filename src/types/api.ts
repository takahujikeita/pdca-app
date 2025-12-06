import type { Project, Task, Evaluation, Action } from './models';

/**
 * API共通レスポンス型
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  message?: string;
}

/**
 * APIエラー型
 */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * プロジェクト作成リクエスト
 */
export interface CreateProjectRequest {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  goals: string[];
}

/**
 * プロジェクト更新リクエスト
 */
export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: Project['status'];
  goals?: string[];
}

/**
 * タスク作成リクエスト
 */
export interface CreateTaskRequest {
  projectId: string;
  title: string;
  description?: string;
  assignee: string;
  priority: Task['priority'];
  estimatedHours?: number;
  dueDate: string;
  dependencies?: string[];
  tags?: string[];
}

/**
 * タスク更新リクエスト
 */
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  assignee?: string;
  priority?: Task['priority'];
  status?: Task['status'];
  estimatedHours?: number;
  actualHours?: number;
  dueDate?: string;
  dependencies?: string[];
  tags?: string[];
}

/**
 * 評価作成リクエスト
 */
export interface CreateEvaluationRequest {
  targetType: Evaluation['targetType'];
  targetId: string;
  selfScore: number;
  comments?: string;
  improvements: string[];
  learnings: string[];
}

/**
 * アクション作成リクエスト
 */
export interface CreateActionRequest {
  title: string;
  description?: string;
  assignee: string;
  dueDate: string;
  priority: Action['priority'];
  relatedEvaluation: string;
  impact: Action['impact'];
  effort: Action['effort'];
}
