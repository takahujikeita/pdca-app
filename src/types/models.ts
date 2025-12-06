/**
 * ユーザー型定義
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'guest';
  skills: string[];
  joinDate: Date;
  isActive: boolean;
}

/**
 * プロジェクト型定義
 */
export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed' | 'suspended';
  goals: string[];
  kpis: KPI[];
  teamMembers: ProjectMember[];
  createdBy: string;
  createdAt: Date;
}

/**
 * プロジェクトメンバー型定義
 */
export interface ProjectMember {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  joinedAt: Date;
}

/**
 * KPI型定義
 */
export interface KPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
}

/**
 * タスク型定義
 */
export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  estimatedHours?: number;
  actualHours?: number;
  dueDate: Date;
  dependencies: string[];
  tags: string[];
  createdAt: Date;
  completedAt?: Date;
}

/**
 * 評価型定義
 */
export interface Evaluation {
  id: string;
  userId: string;
  targetType: 'task' | 'project' | 'daily';
  targetId: string;
  selfScore: number;
  peerScores: PeerScore[];
  autoScore?: number;
  comments?: string;
  improvements: string[];
  learnings: string[];
  evaluatedAt: Date;
}

/**
 * 相互評価スコア型定義
 */
export interface PeerScore {
  evaluatorId: string;
  score: number;
  comment?: string;
}

/**
 * 改善アクション型定義
 */
export interface Action {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  dueDate: Date;
  status: 'planned' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  relatedEvaluation: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  createdAt: Date;
  completedAt?: Date;
}
