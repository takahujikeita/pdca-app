import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types/models';

interface ProjectCardProps {
  project: Project;
}

/**
 * プロジェクトカードコンポーネント
 * プロジェクトの基本情報を表示
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    planning: 'bg-gray-100 text-gray-700',
    active: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    suspended: 'bg-red-100 text-red-700',
  };

  const statusLabels = {
    planning: '計画中',
    active: '進行中',
    completed: '完了',
    suspended: '中断',
  };

  const goals = project.goals ? (typeof project.goals === 'string' ? JSON.parse(project.goals) : project.goals) : [];

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status as keyof typeof statusColors]}`}
            >
              {statusLabels[project.status as keyof typeof statusLabels]}
            </span>
          </div>
          {project.description && (
            <CardDescription className="line-clamp-2">{project.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-semibold mr-2">期間:</span>
              {new Date(project.startDate).toLocaleDateString('ja-JP')} -{' '}
              {new Date(project.endDate).toLocaleDateString('ja-JP')}
            </div>

            {goals.length > 0 && (
              <div>
                <span className="text-sm font-semibold text-gray-600 block mb-1">目標:</span>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {goals.slice(0, 2).map((goal: string, index: number) => (
                    <li key={index} className="line-clamp-1">
                      {goal}
                    </li>
                  ))}
                  {goals.length > 2 && (
                    <li className="text-gray-400">他{goals.length - 2}件</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
