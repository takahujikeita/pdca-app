'use client';

import { useProjects } from '@/lib/hooks/use-projects';
import { ProjectCard } from '@/components/features/projects/project-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * プロジェクトリストコンポーネント
 * プロジェクト一覧を表示
 */
export function ProjectList() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-red-600">エラーが発生しました: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>プロジェクトがまだありません</CardTitle>
          <CardDescription>新しいプロジェクトを作成して、PDCAサイクルを始めましょう</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/projects/new">
            <Button>最初のプロジェクトを作成</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
