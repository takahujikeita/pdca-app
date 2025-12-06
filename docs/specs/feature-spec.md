# PDCA App for POSSE - 機能仕様書

## 1. システム概要

### 1.1 プロジェクト概要
- **プロジェクト名**: PDCA App for POSSE
- **対象ユーザー**: 大学生プログラミングコミュニティPOSSEのチーム開発メンバー
- **開発期間**: 10時間（ハッカソン）
- **技術スタック**: Next.js、React、TypeScript

### 1.2 システムの目的
POSSEのチーム開発メンバーがプロジェクト、タスク、日常の振り返りを通じて継続的な改善と成長を実現するためのPDCAサイクル支援システム。学習と成長をデータ化し、チーム全体のパフォーマンス向上を目指す。

### 1.3 PDCAの粒度
- **プロジェクトレベル**: チーム開発プロジェクト全体のPDCA
- **タスクレベル**: 個別のタスクや機能開発のPDCA
- **日常レベル**: 日々の学習や活動の振り返りPDCA

## 2. ユーザーストーリー

### 2.1 Plan（計画）関連
- **プロジェクトマネージャーとして**、チーム開発プロジェクトの目標と計画を明確に設定し、メンバー全員が理解できるようにしたい
- **開発メンバーとして**、自分の担当タスクの目標と期限を明確にし、効率的に作業を進めたい
- **学習者として**、日々の学習目標を設定し、継続的にスキルアップしたい

### 2.2 Do（実行）関連
- **開発メンバーとして**、タスクの進捗を記録し、チームメンバーと共有したい
- **学習者として**、日々の学習活動や成果を記録し、成長を実感したい
- **チームリーダーとして**、メンバーの進捗状況を把握し、必要に応じてサポートしたい

### 2.3 Check（評価）関連
- **開発メンバーとして**、タスク完了後に自分の成果と課題を客観的に評価したい
- **チーム全体として**、プロジェクトの進捗と品質を定量的に評価したい
- **学習者として**、自分の成長度合いを数値で確認したい

### 2.4 Action（改善）関連
- **開発メンバーとして**、評価結果から具体的な改善アクションを導き出したい
- **チームとして**、継続的な改善サイクルを実現したい
- **学習者として**、次の学習計画に反映させたい

## 3. 機能要件

### 3.1 Plan登録・立案支援機能
**優先度: 高**

#### 3.1.1 プロジェクト計画機能
- プロジェクト基本情報登録（名前、説明、期間、目標）
- チームメンバー登録・役割設定
- マイルストーン設定（中間目標の設定）
- 成功指標（KPI）の設定（コード品質、納期遵守率など）

#### 3.1.2 タスク計画機能
- タスク登録（タイトル、説明、担当者、期限）
- タスクの優先度設定（高・中・低）
- 依存関係の設定（前提タスク）
- 見積もり時間の登録

#### 3.1.3 学習計画機能
- 学習目標設定（技術スタック、期間、成果物）
- 学習ロードマップの作成
- 日次・週次目標の設定

#### 3.1.4 計画立案支援
- テンプレート機能（よく使われる計画パターン）
- 過去データからの推奨設定
- 実現可能性チェック（工数vs期間）

### 3.2 Action登録・支援機能
**優先度: 高**

#### 3.2.1 改善アクション管理
- Check結果からの改善アクション自動提案
- アクションアイテムの登録（内容、担当者、期限）
- アクションの実行状況追跡
- アクション効果の測定設定

#### 3.2.2 ナレッジ共有機能
- 改善事例の蓄積・検索
- ベストプラクティス集
- 失敗事例とその対策集
- チーム内での知見共有

#### 3.2.3 継続改善サポート
- 定期的なアクション実行リマインダー
- アクション効果の可視化
- 改善サイクルの効率化提案

### 3.3 Do支援機能
**優先度: 高**

#### 3.3.1 進捗記録機能
- 日次進捗報告（作業時間、完了タスク、課題）
- リアルタイム進捗更新
- 作業ログの自動記録（開始・終了時間）
- 成果物の添付・リンク機能

#### 3.3.2 コラボレーション機能
- チーム進捗の一覧表示
- メンバー間のコメント・フィードバック
- 助け合い要請機能（ヘルプリクエスト）
- ペアプログラミング記録

#### 3.3.3 モチベーション維持機能
- 進捗の可視化（プログレスバー、グラフ）
- マイルストーン達成時の祝福表示
- 学習ストリーク（連続日数）の表示
- チーム全体の士気向上機能

### 3.4 Check支援機能
**優先度: 高**

#### 3.4.1 自己評価機能
- タスク完了時の振り返り入力
- 技術習得度の自己採点（1-5段階）
- 課題・改善点の記録
- 学んだことの記録

#### 3.4.2 相互評価機能
- チームメンバー間のフィードバック
- コードレビュー結果の記録
- ソフトスキルの評価（コミュニケーション、協調性）
- メンタリング記録

#### 3.4.3 自動評価機能
- 計画vs実績の自動比較
- 品質指標の自動計算（バグ率、テストカバレッジ）
- 生産性指標の算出（時間当たりのタスク完了数）
- 学習効率の計算

### 3.5 定量的評価機能
**優先度: 中**

#### 3.5.1 個人評価指標
- **技術成長度**: 習得技術数、コード品質、問題解決能力
- **実行力**: 計画達成率、納期遵守率、作業効率
- **学習効率**: 学習時間vs習得度、継続性
- **貢献度**: チームへの貢献、ヘルプ提供回数

#### 3.5.2 チーム評価指標
- **チーム生産性**: 全体のタスク完了率、品質達成度
- **コラボレーション**: コミュニケーション頻度、相互サポート度
- **イノベーション**: 新しいアイデア提案数、採用数
- **継続改善**: 改善アクション実行率、効果測定

#### 3.5.3 プロジェクト評価指標
- **目標達成度**: KPI達成率、マイルストーン達成率
- **品質**: バグ発生率、テストカバレッジ、コードレビュー通過率
- **効率性**: 予定工数vs実工数、リソース活用率
- **成長**: メンバーのスキル向上度、新技術習得数

### 3.6 可視化機能
**優先度: 中**

#### 3.6.1 ダッシュボード
- 個人ダッシュボード（自分の進捗・評価・目標）
- チームダッシュボード（チーム全体の状況）
- プロジェクトダッシュボード（プロジェクトの健康状態）

#### 3.6.2 レポート・グラフ機能
- 進捗トレンドグラフ（日次・週次・月次）
- スキル成長レーダーチャート
- チーム貢献度円グラフ
- バーンダウンチャート（残タスク推移）

#### 3.6.3 比較分析機能
- 個人の過去データとの比較
- チーム内での相対的位置
- 他プロジェクトとの比較
- 業界標準との比較（参考値）

## 4. 非機能要件

### 4.1 性能要件
- **レスポンス時間**: 画面遷移3秒以内、データ更新1秒以内
- **同時利用者数**: 最大50名（POSSE規模を想定）
- **データ保存期間**: 1年間（学習履歴の蓄積のため）

### 4.2 可用性要件
- **稼働率**: 95%以上（ハッカソン期間中のデモ・発表時の安定性重視）
- **バックアップ**: 日次自動バックアップ
- **復旧時間**: 障害発生時30分以内の復旧

### 4.3 セキュリティ要件
- **認証**: GitHub OAuth またはGoogle OAuth
- **認可**: ロールベースアクセス制御（管理者、メンバー、ゲスト）
- **データ保護**: 個人情報の適切な取り扱い

### 4.4 ユーザビリティ要件
- **直感的操作**: 初回利用時にチュートリアル不要
- **レスポンシブデザイン**: PC・タブレット・スマートフォン対応
- **アクセシビリティ**: WCAG 2.1 AA準拠

### 4.5 保守性要件
- **コード品質**: TypeScript使用、ESLint/Prettier導入
- **テストカバレッジ**: 重要機能80%以上
- **ドキュメント**: README、API仕様書、コメント記述

## 5. ユーザーインターフェース設計

### 5.1 画面構成
```
┌─ Header (ナビゲーション)
├─ Sidebar (機能メニュー)
│  ├─ Dashboard
│  ├─ Plan Management
│  ├─ Progress Tracking
│  ├─ Evaluation
│  ├─ Reports
│  └─ Settings
└─ Main Content Area
   ├─ Quick Actions
   ├─ Recent Activities
   └─ Key Metrics
```

### 5.2 主要画面
1. **ダッシュボード**: 全体概要、今日のタスク、進捗サマリー
2. **プロジェクト管理**: プロジェクト一覧、詳細、メンバー管理
3. **タスク管理**: カンバンボード、ガントチャート、タスク詳細
4. **進捗記録**: 日次報告、作業ログ、成果記録
5. **評価・振り返り**: 自己評価、相互評価、改善アクション
6. **レポート**: グラフ・チャート、分析結果、比較データ

### 5.3 デザイン原則
- **シンプル**: 必要最小限の情報表示
- **一貫性**: 統一されたUIパターン
- **フィードバック**: 操作結果の明確な表示
- **効率性**: 最小クリック数での目標達成

## 6. データ構造設計

### 6.1 主要エンティティ

#### User（ユーザー）
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'guest';
  skills: string[];
  joinDate: Date;
  isActive: boolean;
}
```

#### Project（プロジェクト）
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed' | 'suspended';
  goals: string[];
  kpis: KPI[];
  teamMembers: ProjectMember[];
  createdBy: string;
  createdAt: Date;
}
```

#### Task（タスク）
```typescript
interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  estimatedHours: number;
  actualHours?: number;
  dueDate: Date;
  dependencies: string[];
  tags: string[];
  createdAt: Date;
  completedAt?: Date;
}
```

#### Evaluation（評価）
```typescript
interface Evaluation {
  id: string;
  userId: string;
  targetType: 'task' | 'project' | 'daily';
  targetId: string;
  selfScore: number;
  peerScores: PeerScore[];
  autoScore?: number;
  comments: string;
  improvements: string[];
  learnings: string[];
  evaluatedAt: Date;
}
```

#### Action（改善アクション）
```typescript
interface Action {
  id: string;
  title: string;
  description: string;
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
```

### 6.2 データ関係
```
User ──┐
       ├─ Project ─── Task
       │              └─ Progress
       ├─ Evaluation
       └─ Action
```

### 6.3 永続化
- **プライマリDB**: SQLite（開発簡易性重視）
- **セッション**: Next.js session management
- **ファイル**: Vercel Blob（画像、ドキュメント）

## 7. システム制約

### 7.1 時間制約
- **開発時間**: 10時間（ハッカソン）
- **MVP機能**: 最低限動作する機能に絞り込み
- **完成度**: デモ可能レベルの実装

### 7.2 技術制約
- **フレームワーク**: Next.js App Router必須
- **型安全性**: TypeScript strict mode
- **UI**: TailwindCSSまたはChakra UI使用
- **認証**: 外部サービス利用（Firebase Auth等）

### 7.3 スコープ制約
- **ユーザー数**: 50名以下（POSSEコミュニティ規模）
- **プロジェクト数**: 同時進行10プロジェクト以下
- **データ量**: 1年分の履歴データ

### 7.4 リソース制約
- **開発者**: 1〜3名
- **予算**: 無料または最小コストのサービス利用
- **インフラ**: Vercel無料プラン想定

## 8. 優先度付け（10時間での実装）

### 8.1 Phase 1（0-3時間）: 基盤構築
**必須 - MVP**
- [ ] プロジェクト基盤設定（Next.js、TypeScript、認証）
- [ ] 基本データモデル設計・実装
- [ ] ユーザー認証機能
- [ ] 基本的なUIコンポーネント

### 8.2 Phase 2（3-6時間）: コア機能実装
**必須 - MVP**
- [ ] プロジェクト・タスク管理機能（簡易版）
- [ ] 進捗記録機能（基本的な入力・表示）
- [ ] 簡易評価機能（自己評価のみ）
- [ ] 基本ダッシュボード

### 8.3 Phase 3（6-8時間）: 評価・可視化機能
**重要 - 差別化要素**
- [ ] 定量的評価機能（基本指標のみ）
- [ ] 簡易グラフ・チャート機能
- [ ] 改善アクション提案機能（基本版）
- [ ] レポート機能（基本版）

### 8.4 Phase 4（8-10時間）: 仕上げ・改善
**付加価値**
- [ ] UI/UX改善
- [ ] エラーハンドリング強化
- [ ] デモデータ投入
- [ ] 発表準備（スクリーンショット、説明資料）

### 8.5 Phase 5（時間があれば）: 拡張機能
**Nice to have**
- [ ] 相互評価機能
- [ ] 高度な分析機能
- [ ] 通知機能
- [ ] エクスポート機能

## 9. 成功指標

### 9.1 開発成果指標
- [ ] デモ実行可能な状態で完成
- [ ] 基本的なPDCAサイクル機能が動作
- [ ] TypeScript型安全性100%
- [ ] 致命的バグなし

### 9.2 ユーザー価値指標
- [ ] POSSEメンバーが実際に使いたいと思える機能
- [ ] 学習と成長をサポートする具体的な価値提供
- [ ] チーム開発の効率化に貢献
- [ ] 継続的改善の文化醸成に寄与

### 9.3 技術指標
- [ ] パフォーマンス: Core Web Vitals良好
- [ ] セキュリティ: 基本的な脆弱性なし
- [ ] 保守性: 将来の機能拡張が容易
- [ ] 拡張性: ユーザー・データ増加に対応可能

## 10. 今後の拡張計画

### 10.1 短期（ハッカソン後1ヶ月）
- 実際のPOSSEメンバーでのβテスト
- フィードバックに基づく機能改善
- パフォーマンス・セキュリティ強化

### 10.2 中期（3ヶ月）
- AI機能追加（改善提案、予測分析）
- 外部ツール連携（GitHub、Slack等）
- 高度な分析・レポート機能

### 10.3 長期（6ヶ月〜）
- 他コミュニティへの展開
- エンタープライズ機能
- モバイルアプリ化

## 11. 技術アーキテクチャ詳細

### 11.1 Next.js App Router 活用方針

#### 11.1.1 App Router 基本構造
```
src/
├── app/
│   ├── layout.tsx               # ルートレイアウト（全ページ共通）
│   ├── page.tsx                 # トップページ（ダッシュボード）
│   ├── (auth)/                  # 認証グループ
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/             # ダッシュボードグループ
│   │   ├── layout.tsx           # ダッシュボード共通レイアウト
│   │   ├── projects/
│   │   │   ├── page.tsx         # プロジェクト一覧
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx     # プロジェクト詳細
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx # プロジェクト編集
│   │   │   └── new/
│   │   │       └── page.tsx     # プロジェクト新規作成
│   │   ├── tasks/
│   │   │   ├── page.tsx         # タスク一覧
│   │   │   └── [id]/
│   │   │       └── page.tsx     # タスク詳細
│   │   ├── evaluations/
│   │   │   ├── page.tsx         # 評価一覧
│   │   │   └── [id]/
│   │   │       └── page.tsx     # 評価詳細
│   │   └── reports/
│   │       └── page.tsx         # レポート
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts     # NextAuth.js
│       ├── projects/
│       │   ├── route.ts         # プロジェクトAPI（GET, POST）
│       │   └── [id]/
│       │       └── route.ts     # プロジェクトAPI（GET, PUT, DELETE）
│       ├── tasks/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       └── evaluations/
│           ├── route.ts
│           └── [id]/
│               └── route.ts
├── components/
│   ├── ui/                      # 再利用可能なUIコンポーネント
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── features/                # 機能別コンポーネント
│   │   ├── projects/
│   │   │   ├── project-list.tsx
│   │   │   ├── project-card.tsx
│   │   │   └── project-form.tsx
│   │   ├── tasks/
│   │   │   ├── task-kanban.tsx
│   │   │   ├── task-list.tsx
│   │   │   └── task-form.tsx
│   │   ├── evaluations/
│   │   │   ├── evaluation-form.tsx
│   │   │   └── evaluation-chart.tsx
│   │   └── dashboard/
│   │       ├── dashboard-header.tsx
│   │       ├── stats-card.tsx
│   │       └── activity-feed.tsx
│   └── layouts/                 # レイアウトコンポーネント
│       ├── header.tsx
│       ├── sidebar.tsx
│       └── footer.tsx
├── lib/
│   ├── db/                      # データベース関連
│   │   ├── schema.ts            # Prismaスキーマ（または手動定義）
│   │   ├── client.ts            # DBクライアント
│   │   └── migrations/
│   ├── api/                     # APIクライアント・ユーティリティ
│   │   ├── client.ts            # API fetch wrapper
│   │   └── hooks.ts             # React Query hooks
│   ├── auth/                    # 認証関連
│   │   ├── config.ts            # NextAuth設定
│   │   └── utils.ts
│   ├── utils/                   # 汎用ユーティリティ
│   │   ├── date.ts
│   │   ├── format.ts
│   │   └── validation.ts
│   └── constants/               # 定数定義
│       ├── routes.ts
│       └── config.ts
├── types/                       # TypeScript型定義
│   ├── models.ts                # データモデル型
│   ├── api.ts                   # APIリクエスト/レスポンス型
│   └── index.ts
└── styles/
    └── globals.css              # グローバルスタイル
```

#### 11.1.2 Server Components vs Client Components

**Server Components（デフォルト）**
- データフェッチが必要なページ・コンポーネント
- 静的コンテンツ、レイアウト
- メリット: バンドルサイズ削減、初期ロード高速化

```typescript
// app/(dashboard)/projects/page.tsx
import { ProjectList } from '@/components/features/projects/project-list';
import { getProjects } from '@/lib/api/projects';

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}
```

**Client Components（"use client"指定）**
- インタラクティブな要素（フォーム、ボタン、状態管理）
- ブラウザAPIを使用（useState、useEffect、onClick等）

```typescript
// components/features/projects/project-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ProjectForm() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API呼び出し
    router.push('/projects');
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 11.2 状態管理戦略

#### 11.2.1 状態管理の階層

**1. URL State（最優先）**
- 検索パラメータ、フィルタ、ページネーション
- Next.js `useSearchParams`, `useRouter`を使用

**2. Server State（サーバーデータ）**
- TanStack Query (React Query)でキャッシュ管理
- データフェッチ、再取得、楽観的更新

```typescript
// lib/api/hooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch('/api/projects').then(r => r.json()),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProjectInput) =>
      fetch('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
```

**3. Local State（ローカル状態）**
- フォーム入力、UI状態（モーダル開閉、タブ選択等）
- React `useState`, `useReducer`

**4. Global State（グローバル状態）**
- 認証ユーザー情報、テーマ設定
- React Context または Zustandを使用（軽量なら Context、複雑なら Zustand）

```typescript
// lib/contexts/auth-context.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  return (
    <AuthContext.Provider value={{ user: session.data?.user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### 11.3 データフェッチング戦略

#### 11.3.1 Server Components でのデータフェッチ

```typescript
// app/(dashboard)/projects/[id]/page.tsx
import { notFound } from 'next/navigation';

async function getProject(id: string) {
  const res = await fetch(`${process.env.API_URL}/projects/${id}`, {
    next: { revalidate: 60 }, // ISR: 60秒ごとに再検証
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
```

#### 11.3.2 Client Components でのデータフェッチ

```typescript
// components/features/projects/project-card.tsx
'use client';

import { useQuery } from '@tanstack/react-query';

export function ProjectCard({ projectId }: { projectId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetch(`/api/projects/${projectId}`).then(r => r.json()),
  });

  if (isLoading) return <Skeleton />;
  return <div>{data.name}</div>;
}
```

### 11.4 認証・認可フロー

#### 11.4.1 NextAuth.js 設定

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // セッションにユーザーIDを追加
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
```

#### 11.4.2 ミドルウェアでの認証チェック

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // /dashboard 配下は認証必須
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return !!token;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

### 11.5 データベース設計

#### 11.5.1 SQLite + Prisma 構成

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  avatar    String?
  role      String   @default("member")
  createdAt DateTime @default(now())

  projects       ProjectMember[]
  tasks          Task[]
  evaluations    Evaluation[]
  actions        Action[]
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  startDate   DateTime
  endDate     DateTime
  status      String   @default("planning")
  createdAt   DateTime @default(now())

  members     ProjectMember[]
  tasks       Task[]
  evaluations Evaluation[]
}

model ProjectMember {
  id        String   @id @default(cuid())
  userId    String
  projectId String
  role      String   @default("member")
  joinedAt  DateTime @default(now())

  user    User    @relation(fields: [userId], references: [id])
  project Project @relation(fields: [projectId], references: [id])

  @@unique([userId, projectId])
}

model Task {
  id            String    @id @default(cuid())
  projectId     String
  title         String
  description   String?
  assigneeId    String
  priority      String    @default("medium")
  status        String    @default("todo")
  estimatedHours Int?
  actualHours   Int?
  dueDate       DateTime
  createdAt     DateTime  @default(now())
  completedAt   DateTime?

  project   Project    @relation(fields: [projectId], references: [id])
  assignee  User       @relation(fields: [assigneeId], references: [id])
  evaluation Evaluation?
}

model Evaluation {
  id          String   @id @default(cuid())
  userId      String
  taskId      String?  @unique
  projectId   String?
  targetType  String
  selfScore   Int
  autoScore   Int?
  comments    String?
  improvements String?
  learnings   String?
  evaluatedAt DateTime @default(now())

  user    User     @relation(fields: [userId], references: [id])
  task    Task?    @relation(fields: [taskId], references: [id])
  project Project? @relation(fields: [projectId], references: [id])
  actions Action[]
}

model Action {
  id           String    @id @default(cuid())
  title        String
  description  String?
  assigneeId   String
  evaluationId String
  status       String    @default("planned")
  priority     String    @default("medium")
  dueDate      DateTime
  createdAt    DateTime  @default(now())
  completedAt  DateTime?

  assignee   User       @relation(fields: [assigneeId], references: [id])
  evaluation Evaluation @relation(fields: [evaluationId], references: [id])
}
```

## 12. 実装ガイドライン

### 12.1 TypeScript設定とコーディング規約

#### 12.1.1 tsconfig.json 設定

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### 12.1.2 厳格な型定義

**推奨パターン:**
```typescript
// ❌ 避けるべき
const data: any = await fetchData();
function process(input: object) { ... }

// ✅ 推奨
interface User {
  id: string;
  name: string;
  email: string;
}
const data: User = await fetchData();

function process(input: { id: string; name: string }) { ... }
```

**Null/Undefined の明示的な扱い**
```typescript
// ✅ Optional Chaining と Nullish Coalescing
const userName = user?.name ?? 'Anonymous';

// ✅ 型ガード
function isValidProject(project: Project | null): project is Project {
  return project !== null && project.status !== 'deleted';
}
```

### 12.2 コンポーネント設計原則

#### 12.2.1 Single Responsibility Principle（単一責任原則）

各コンポーネントは1つの責任のみを持つ。

```typescript
// ❌ 避けるべき: 複数の責任を持つコンポーネント
export function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/projects').then(/*...*/);
  }, []);

  return (
    <div>
      <header>...</header>
      <aside>...</aside>
      {loading ? <Spinner /> : (
        <ul>
          {projects.map(p => (
            <li key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <button onClick={/*...*/}>Edit</button>
              <button onClick={/*...*/}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ✅ 推奨: 責任を分離
export function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();

  return (
    <DashboardLayout>
      <PageHeader title="Projects" />
      {isLoading ? <LoadingState /> : <ProjectList projects={projects} />}
    </DashboardLayout>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {projects.map(p => <ProjectCard key={p.id} project={p} />)}
    </ul>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>{project.name}</CardHeader>
      <CardBody>{project.description}</CardBody>
      <CardFooter>
        <EditButton projectId={project.id} />
        <DeleteButton projectId={project.id} />
      </CardFooter>
    </Card>
  );
}
```

#### 12.2.2 Props インターフェース定義

```typescript
// ✅ 明示的な Props 型定義
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn('btn', `btn-${variant}`, `btn-${size}`)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

#### 12.2.3 カスタムフック活用

ロジックを分離して再利用性を高める。

```typescript
// lib/hooks/use-project.ts
export function useProject(projectId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
  });

  const updateMutation = useMutation({
    mutationFn: (data: ProjectUpdate) => updateProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('プロジェクトを更新しました');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('プロジェクトを削除しました');
    },
  });

  return {
    project: query.data,
    isLoading: query.isLoading,
    error: query.error,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

// 使用例
function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { project, isLoading, update, delete: deleteProject } = useProject(params.id);

  if (isLoading) return <Skeleton />;
  return <ProjectDetail project={project} onUpdate={update} onDelete={deleteProject} />;
}
```

### 12.3 ファイル命名規則

#### 12.3.1 命名パターン

```
✅ 推奨:
- ケバブケース: button.tsx, project-list.tsx
- 小文字のみ: api/projects/route.ts

❌ 避けるべき:
- パスカルケース（ファイル名）: Button.tsx, ProjectList.tsx
- キャメルケース: projectList.tsx
```

#### 12.3.2 ファイル種別ごとの接尾辞

```
- コンポーネント: project-card.tsx
- フック: use-projects.ts
- 型定義: types.ts または models.ts
- ユーティリティ: utils.ts, helpers.ts
- 定数: constants.ts, config.ts
- テスト: *.test.ts, *.spec.ts
- Storybook: *.stories.tsx
```

### 12.4 Import ルール

#### 12.4.1 Import 順序

```typescript
// 1. React / Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. サードパーティライブラリ
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 3. 内部モジュール（@/ alias）
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/auth-context';
import { cn } from '@/lib/utils';

// 4. 型定義
import type { Project } from '@/types/models';
```

#### 12.4.2 バレルインポート禁止

```typescript
// ❌ 避けるべき: バレルインポート
import { Button, Card, Input } from '@/components/ui';

// ✅ 推奨: 個別インポート
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

**理由:**
- ビルドサイズの肥大化を防ぐ
- Tree Shakingの最適化
- インポート元の明確化

### 12.5 コメント・ドキュメント規約

#### 12.5.1 JSDoc コメント

```typescript
/**
 * プロジェクトを作成する
 *
 * @param data - プロジェクト作成データ
 * @returns 作成されたプロジェクト
 * @throws {ValidationError} バリデーションエラーの場合
 * @throws {DatabaseError} データベースエラーの場合
 */
export async function createProject(data: ProjectInput): Promise<Project> {
  // 実装...
}
```

#### 12.5.2 インラインコメント（日本語推奨）

```typescript
export function ProjectCard({ project }: ProjectCardProps) {
  // プロジェクトが完了している場合はアーカイブ表示
  if (project.status === 'completed') {
    return <ArchivedProjectCard project={project} />;
  }

  // 進捗率を計算（完了タスク数 / 全タスク数）
  const progress = project.completedTasks / project.totalTasks;

  return (
    <Card>
      <CardHeader>{project.name}</CardHeader>
      <ProgressBar value={progress} />
    </Card>
  );
}
```

#### 12.5.3 コメント不要のケース

```typescript
// ❌ 不要なコメント
// ユーザー名を取得
const userName = user.name;

// ✅ 自己説明的なコード（コメント不要）
const userName = user.name;

// ✅ 複雑なロジックにはコメント必要
// KPI計算: (完了タスク数 × 品質スコア) / 予定工数
const kpi = (completedTasks * qualityScore) / estimatedHours;
```

### 12.6 エラーハンドリング

#### 12.6.1 API エラーハンドリング

```typescript
// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // バリデーション
    const validatedData = projectSchema.parse(body);

    // ビジネスロジック
    const project = await createProject(validatedData);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    // Zodバリデーションエラー
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    // その他のエラー
    console.error('Project creation failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### 12.6.2 クライアントサイド エラーハンドリング

```typescript
'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function ProjectForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      toast.success('プロジェクトを作成しました');
      router.push(`/projects/${data.id}`);
    },
    onError: (error) => {
      if (error instanceof ValidationError) {
        toast.error('入力内容を確認してください');
      } else {
        toast.error('プロジェクトの作成に失敗しました');
      }
    },
  });

  return <form onSubmit={/*...*/}>...</form>;
}
```

### 12.7 パフォーマンス最適化

#### 12.7.1 画像最適化

```typescript
import Image from 'next/image';

// ✅ Next.js Image コンポーネント使用
export function UserAvatar({ user }: { user: User }) {
  return (
    <Image
      src={user.avatar || '/default-avatar.png'}
      alt={user.name}
      width={40}
      height={40}
      className="rounded-full"
      priority={false} // above-the-fold の場合は true
    />
  );
}
```

#### 12.7.2 動的インポート

```typescript
import dynamic from 'next/dynamic';

// 重いコンポーネントは動的インポート
const HeavyChart = dynamic(() => import('@/components/features/reports/chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // クライアントサイドのみ
});

export function ReportPage() {
  return (
    <div>
      <h1>Report</h1>
      <HeavyChart data={data} />
    </div>
  );
}
```

#### 12.7.3 Suspense 境界

```typescript
import { Suspense } from 'react';

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <ProjectHeader projectId={params.id} />

      <Suspense fallback={<TaskListSkeleton />}>
        <TaskList projectId={params.id} />
      </Suspense>

      <Suspense fallback={<ActivityFeedSkeleton />}>
        <ActivityFeed projectId={params.id} />
      </Suspense>
    </div>
  );
}
```

---

**ドキュメント作成日**: 2024年12月6日
**作成者**: Claude Code
**バージョン**: 1.1
**更新履歴**:
- 初回作成（v1.0）
- 技術アーキテクチャ詳細と実装ガイドラインを追加（v1.1）