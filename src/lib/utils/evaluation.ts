/**
 * 評価ビジネスロジック
 * ADR-0004に基づく評価指標計算
 */

/**
 * プロジェクト進捗率を計算
 * @param completedTasks - 完了タスク数
 * @param totalTasks - 全タスク数
 * @returns 進捗率（0-1）
 */
export function calculateProjectProgress(
  completedTasks: number,
  totalTasks: number
): number {
  if (totalTasks === 0) return 0;
  return Math.min(completedTasks / totalTasks, 1);
}

/**
 * タスク進捗率を計算
 * @param actualHours - 実績時間
 * @param estimatedHours - 見積もり時間
 * @returns 進捗率（0-1、上限100%）
 */
export function calculateTaskProgress(
  actualHours: number,
  estimatedHours: number
): number {
  if (estimatedHours === 0) return 0;
  return Math.min(actualHours / estimatedHours, 1);
}

/**
 * 技術成長度を計算
 * @param acquiredSkills - 習得技術数
 * @param averageScore - 平均評価スコア（1-5）
 * @returns 技術成長度
 */
export function calculateTechnicalGrowth(
  acquiredSkills: number,
  averageScore: number
): number {
  return acquiredSkills * averageScore;
}

/**
 * 実行力を計算
 * @param completionRate - 計画達成率（0-1）
 * @param onTimeRate - 納期遵守率（0-1）
 * @returns 実行力（0-100）
 */
export function calculateExecutionPower(
  completionRate: number,
  onTimeRate: number
): number {
  return completionRate * onTimeRate * 100;
}

/**
 * 学習効率を計算
 * @param skillAcquisition - 習得度（0-1）
 * @param learningHours - 学習時間
 * @returns 学習効率
 */
export function calculateLearningEfficiency(
  skillAcquisition: number,
  learningHours: number
): number {
  if (learningHours === 0) return 0;
  return skillAcquisition / learningHours;
}

/**
 * 貢献度を計算
 * @param teamContributions - チームへの貢献回数
 * @param helpProvided - ヘルプ提供回数
 * @returns 貢献度
 */
export function calculateContribution(
  teamContributions: number,
  helpProvided: number
): number {
  return teamContributions + helpProvided;
}

/**
 * 自動評価スコアを計算
 * 計画vs実績の比較に基づく
 * @param estimatedHours - 見積もり時間
 * @param actualHours - 実績時間
 * @param isCompleted - 完了フラグ
 * @returns 自動評価スコア（1-5）
 */
export function calculateAutoScore(
  estimatedHours: number,
  actualHours: number,
  isCompleted: boolean
): number {
  if (!isCompleted) return 1;
  if (estimatedHours === 0) return 3;

  const ratio = actualHours / estimatedHours;

  // 実績が見積もりの80-120%以内なら高評価（5点）
  if (ratio >= 0.8 && ratio <= 1.2) return 5;

  // 実績が見積もりの70-80%または120-150%なら良好（4点）
  if ((ratio >= 0.7 && ratio < 0.8) || (ratio > 1.2 && ratio <= 1.5)) return 4;

  // 実績が見積もりの60-70%または150-200%なら普通（3点）
  if ((ratio >= 0.6 && ratio < 0.7) || (ratio > 1.5 && ratio <= 2.0)) return 3;

  // 実績が見積もりの50-60%または200-300%ならやや低い（2点）
  if ((ratio >= 0.5 && ratio < 0.6) || (ratio > 2.0 && ratio <= 3.0)) return 2;

  // それ以外は低評価（1点）
  return 1;
}

/**
 * アクションの優先度を自動判定
 * @param impact - 影響度
 * @param effort - 工数
 * @param dueDate - 期限
 * @returns 優先度
 */
export function autoAssignActionPriority(
  impact: 'high' | 'medium' | 'low',
  effort: 'high' | 'medium' | 'low',
  dueDate: Date
): 'high' | 'medium' | 'low' {
  const daysUntilDue = Math.floor(
    (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  // 期限が3日以内 → 高
  if (daysUntilDue <= 3) {
    return 'high';
  }

  // 影響度（高）×工数（低）を優先的に実行 → 高
  if (impact === 'high' && effort === 'low') {
    return 'high';
  }

  // 影響度（高）×工数（中）または影響度（中）×工数（低） → 中
  if (
    (impact === 'high' && effort === 'medium') ||
    (impact === 'medium' && effort === 'low')
  ) {
    return 'medium';
  }

  // それ以外 → 低
  return 'low';
}

/**
 * 評価スコアの統計を計算
 * @param scores - 評価スコアの配列（1-5）
 * @returns 平均、最小、最大、標準偏差
 */
export function calculateScoreStatistics(scores: number[]): {
  average: number;
  min: number;
  max: number;
  stdDev: number;
} {
  if (scores.length === 0) {
    return { average: 0, min: 0, max: 0, stdDev: 0 };
  }

  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const min = Math.min(...scores);
  const max = Math.max(...scores);

  const variance =
    scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) /
    scores.length;
  const stdDev = Math.sqrt(variance);

  return { average, min, max, stdDev };
}
