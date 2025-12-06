import { ProjectForm } from '@/components/features/projects/project-form';

/**
 * プロジェクト作成ページ
 * 新しいプロジェクトを作成するフォームを表示
 */
export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">新規プロジェクト作成</h1>
        <p className="text-gray-600 mt-2">チーム開発プロジェクトを作成してPDCAサイクルを始めましょう</p>
      </div>

      <ProjectForm />
    </div>
  );
}
