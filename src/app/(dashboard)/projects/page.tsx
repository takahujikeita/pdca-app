import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Projects List Page
 * Display and manage team development projects
 */
export default async function ProjectsPage() {
  // TODO: Fetch projects from API
  // Currently showing mock data for empty state
  const projects: unknown[] = [];

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

      {projects.length === 0 ? (
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
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Project cards will be displayed here */}
        </div>
      )}
    </div>
  );
}
