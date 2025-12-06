'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateProject } from '@/lib/hooks/use-projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * プロジェクト作成フォームコンポーネント
 * 新規プロジェクトの情報を入力して作成する
 */
export function ProjectForm() {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProject();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    goals: [''],
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // バリデーション
    if (!formData.name.trim()) {
      setError('プロジェクト名は必須です');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setError('開始日と終了日は必須です');
      return;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('終了日は開始日より後である必要があります');
      return;
    }

    // 空の目標を除外
    const filteredGoals = formData.goals.filter((goal) => goal.trim());
    if (filteredGoals.length === 0) {
      setError('少なくとも1つの目標を入力してください');
      return;
    }

    createProject(
      {
        name: formData.name.trim(),
        description: formData.description.trim(),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        goals: filteredGoals,
        status: 'planning',
      },
      {
        onSuccess: () => {
          router.push('/projects');
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : 'プロジェクトの作成に失敗しました');
        },
      }
    );
  };

  const handleAddGoal = () => {
    setFormData({ ...formData, goals: [...formData.goals, ''] });
  };

  const handleRemoveGoal = (index: number) => {
    const newGoals = formData.goals.filter((_, i) => i !== index);
    setFormData({ ...formData, goals: newGoals });
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...formData.goals];
    newGoals[index] = value;
    setFormData({ ...formData, goals: newGoals });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>新規プロジェクト作成</CardTitle>
        <CardDescription>チーム開発プロジェクトの情報を入力してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">プロジェクト名 *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="例: 冬ハッカソン 2025"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="プロジェクトの説明を入力してください"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">開始日 *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">終了日 *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>目標 *</Label>
            {formData.goals.map((goal, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={goal}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  placeholder={`目標 ${index + 1}`}
                />
                {formData.goals.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveGoal(index)}
                  >
                    削除
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="secondary" size="sm" onClick={handleAddGoal}>
              + 目標を追加
            </Button>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              disabled={isPending}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? '作成中...' : 'プロジェクトを作成'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
