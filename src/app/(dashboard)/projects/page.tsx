import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectList } from '@/components/features/projects/project-list';

/**
 * Projects List Page
 * Display and manage team development projects
 */
export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">プロジェクト</h1>
          <p className="text-gray-600 mt-2">チーム開発プロジェクトを管理しましょう</p>
        </div>
        <Link href="/projects/new">
          <Button>新規プロジェクト作成</Button>
        </Link>
      </div>

      <ProjectList />
    </div>
  );
}
