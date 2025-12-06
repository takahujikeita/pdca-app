import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PDCA App for POSSE
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            プロジェクト、タスク、日常の振り返りを通じた継続的改善と成長を実現
          </p>
          <p className="text-sm text-gray-500">Phase 2: 基本UIコンポーネント実装完了</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* UIコンポーネントデモ */}
          <Card>
            <CardHeader>
              <CardTitle>基本コンポーネント</CardTitle>
              <CardDescription>Button, Input, Card などの基本UIコンポーネント</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-input">デモ入力</Label>
                <Input id="demo-input" placeholder="入力してください..." />
              </div>
              <div className="flex gap-2">
                <Button variant="primary" size="md">
                  Primary
                </Button>
                <Button variant="secondary" size="md">
                  Secondary
                </Button>
                <Button variant="danger" size="sm">
                  Danger
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">TailwindCSS + TypeScript</p>
            </CardFooter>
          </Card>

          {/* データベース情報 */}
          <Card>
            <CardHeader>
              <CardTitle>データベース</CardTitle>
              <CardDescription>Prisma + SQLite セットアップ完了</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <p className="font-semibold">✅ モデル定義完了:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>User - ユーザー管理</li>
                  <li>Project - プロジェクト管理</li>
                  <li>Task - タスク管理</li>
                  <li>Evaluation - 評価管理</li>
                  <li>Action - 改善アクション管理</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">Prisma v6.19.0</p>
            </CardFooter>
          </Card>

          {/* 次のステップ */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>次のステップ</CardTitle>
              <CardDescription>Phase 3以降の実装予定</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">Phase 3-4: 認証実装</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>NextAuth.js設定</li>
                    <li>GitHub/Google OAuth</li>
                    <li>ログイン/登録画面</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-600">Phase 5-6: コア機能</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>プロジェクト管理</li>
                    <li>タスク管理</li>
                    <li>進捗記録</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Phase 7-8: 評価機能</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>自己評価</li>
                    <li>改善アクション提案</li>
                    <li>レポート機能</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>🤖 Powered by Next.js 16 + TypeScript + Prisma + TailwindCSS</p>
        </div>
      </div>
    </main>
  );
}
