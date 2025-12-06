import { auth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * ダッシュボードページ
 * ユーザーのプロジェクト一覧や統計情報を表示
 */
export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <p className="text-gray-600 mt-2">
          ようこそ、{session?.user?.name || session?.user?.email}さん
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>進行中のプロジェクト</CardTitle>
            <CardDescription>現在取り組んでいるプロジェクト</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">0</div>
            <p className="text-sm text-gray-500 mt-2">プロジェクトがまだありません</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今日のタスク</CardTitle>
            <CardDescription>本日実行予定のタスク</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">0</div>
            <p className="text-sm text-gray-500 mt-2">タスクがまだありません</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>評価待ち</CardTitle>
            <CardDescription>評価が必要なアクション</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">0</div>
            <p className="text-sm text-gray-500 mt-2">評価待ちのアクションはありません</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クイックスタート</CardTitle>
          <CardDescription>PDCAサイクルを開始しましょう</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold">プロジェクトを作成</h3>
                <p className="text-sm text-gray-600">新しいプロジェクトを作成して、目標を設定しましょう</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold">タスクを計画</h3>
                <p className="text-sm text-gray-600">目標達成のための具体的なタスクを計画します</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold">実行と評価</h3>
                <p className="text-sm text-gray-600">タスクを実行し、定期的に評価を行います</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold">改善アクション</h3>
                <p className="text-sm text-gray-600">評価結果から改善アクションを実行します</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
