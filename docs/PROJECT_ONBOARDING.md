# PDCA App for POSSE - Project Onboarding

このドキュメントは、PDCA App for POSSEプロジェクトの新規開発者向けオンボーディングガイドです。

## プロジェクト概要

**プロジェクト名**: PDCA App for POSSE
**目的**: POSSEコミュニティの大学生開発者向けPDCAサイクル支援システム
**開発期間**: 10時間（冬ハッカソン）
**対象ユーザー**: 大学生プログラミングコミュニティPOSSEのチーム開発メンバー

## クイックスタート

### 1. ドキュメントを読む（推奨順序）

1. **[機能仕様書](specs/feature-spec.md)** - プロジェクトの全体像を把握
2. **[ADR-0001: Project Structure](adr/decisions/0001-project-structure.json)** - ディレクトリ構造と命名規則
3. **[ADR-0002: Technology Stack](adr/decisions/0002-technology-stack.json)** - 使用技術とライブラリ
4. **[ADR-0003: Architecture Patterns](adr/decisions/0003-architecture-patterns.json)** - アーキテクチャパターンと設計方針
5. **[ADR-0004: Domain Knowledge](adr/decisions/0004-domain-knowledge.json)** - ドメインエンティティとビジネスロジック

### 2. 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone <repository-url>
cd pdca-app

# 依存関係のインストール（package.json作成後）
npm install

# データベースのセットアップ（Prismaスキーマ作成後）
npx prisma generate
npx prisma migrate dev

# 開発サーバーの起動
npm run dev
```

### 3. 開発ワークフローの確認

- **[CLAUDE.md](../CLAUDE.md)** - 開発の標準手順（Phase 1〜11）
- **[MCP_REFERENCE.md](../MCP_REFERENCE.md)** - 開発ツールの使用方法

## プロジェクトの主要な特徴

### 技術スタック

- **フレームワーク**: Next.js 16 (App Router) + React 19
- **言語**: TypeScript (strict mode)
- **スタイリング**: TailwindCSS
- **データベース**: Prisma + SQLite
- **認証**: NextAuth.js (GitHub OAuth / Google OAuth)
- **状態管理**: TanStack Query + React Context
- **バリデーション**: Zod
- **デプロイ**: Vercel

### アーキテクチャの特徴

- **Server Components優先**: パフォーマンス最適化
- **単一責任原則**: コンポーネントは1つの責任のみ
- **カスタムフック活用**: ロジックの再利用性向上
- **状態管理階層**: URL State > Server State > Local State > Global State
- **ケバブケース命名**: ファイル名はすべてケバブケース
- **@/alias**: 個別インポート（バレルインポート禁止）

### ドメインの特徴

- **3つのPDCA粒度**: プロジェクトレベル、タスクレベル、日常レベル
- **主要エンティティ**: User、Project、Task、Evaluation、Action
- **評価駆動の改善**: Evaluation → Action → Task のフロー
- **定量的評価**: 技術成長度、実行力、学習効率、貢献度

## ディレクトリ構造

```
pdca-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # ルートレイアウト
│   │   ├── page.tsx              # ダッシュボード
│   │   ├── (auth)/               # 認証グループ
│   │   ├── (dashboard)/          # ダッシュボードグループ
│   │   └── api/                  # API Routes
│   ├── components/               # Reactコンポーネント
│   │   ├── ui/                   # 再利用可能なUIコンポーネント
│   │   ├── features/             # 機能別コンポーネント
│   │   └── layouts/              # レイアウトコンポーネント
│   ├── lib/                      # ユーティリティとビジネスロジック
│   │   ├── db/                   # データベース関連
│   │   ├── api/                  # APIクライアント
│   │   ├── auth/                 # 認証関連
│   │   ├── hooks/                # カスタムフック
│   │   ├── utils/                # 汎用ユーティリティ
│   │   └── constants/            # 定数定義
│   ├── types/                    # TypeScript型定義
│   └── styles/                   # グローバルスタイル
├── prisma/                       # Prismaスキーマとマイグレーション
├── docs/                         # ドキュメント
│   ├── specs/                    # 仕様書
│   └── adr/                      # Architecture Decision Records
├── .claude/                      # Claudeエージェント設定
└── .cursor/                      # Cursor設定
```

## コーディング規約

### ファイル命名

- **コンポーネント**: `project-card.tsx` (ケバブケース)
- **フック**: `use-projects.ts`
- **型定義**: `types.ts`, `models.ts`
- **ユーティリティ**: `utils.ts`, `helpers.ts`
- **テスト**: `*.test.ts`, `*.spec.ts`

### インポートルール

```typescript
// ❌ 避けるべき: バレルインポート
import { Button, Card, Input } from '@/components/ui';

// ✅ 推奨: 個別インポート
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

### コンポーネント設計

```typescript
// Server Component（デフォルト）
export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}

// Client Component（"use client"指定）
'use client';

export function ProjectForm() {
  const [name, setName] = useState('');
  // ...
}
```

## 実装時の注意事項

### 必ず確認すること

1. **ADRの確認**: 実装前に関連するADRを必ず確認
2. **命名規則**: ケバブケースファイル名、@/aliasインポート
3. **Server Components優先**: 必要な場合のみClient Components
4. **型安全性**: TypeScript strict mode、any禁止
5. **単一責任原則**: 1コンポーネント1責任

### 開発ワークフロー（Phase 1-11）

1. **Phase 1: Investigation** - ADR確認、既存コード調査
2. **Phase 2: Architecture Design** - コンポーネント設計、ADR記録
3. **Phase 3: UI/UX Design** - デザインレビュー（UI変更時）
4. **Phase 4: Planning** - TodoWriteで計画立案
5. **Phase 5: Implementation** - Serena MCPで実装
6. **Phase 6: Testing & Stories** - テスト、Storybook作成
7. **Phase 7: Code Review** - リファクタリング
8. **Phase 8: Quality Checks** - 型チェック、Lint、テスト
9. **Phase 9A: Runtime Verification** - Next.js MCPで動作確認（必須）
10. **Phase 9B: Browser Verification** - Chrome DevToolsで詳細確認（任意）
11. **Phase 10: Git Commit** - コミット作成
12. **Phase 11: Push** - リモートへプッシュ

## よくある質問

### Q: Server ComponentsとClient Componentsの使い分けは？

**A**: デフォルトはServer Components。インタラクティブな要素（フォーム、ボタン、状態管理）のみClient Components。詳細は[ADR-0003](adr/decisions/0003-architecture-patterns.json)を参照。

### Q: 状態管理はどうすればいい？

**A**: 優先順位は URL State > Server State (TanStack Query) > Local State (useState) > Global State (Context)。詳細は[ADR-0003](adr/decisions/0003-architecture-patterns.json)を参照。

### Q: バレルインポートは使える？

**A**: 使えません。@/aliasで個別インポートしてください。理由は[ADR-0001](adr/decisions/0001-project-structure.json)を参照。

### Q: ファイル名はPascalCase？

**A**: いいえ、ケバブケースです（例: `project-card.tsx`）。詳細は[ADR-0001](adr/decisions/0001-project-structure.json)を参照。

### Q: どのライブラリを使えばいい？

**A**: [ADR-0002](adr/decisions/0002-technology-stack.json)に記載されているライブラリを使用してください。追加が必要な場合は相談してください。

### Q: ドメインエンティティの定義は？

**A**: User、Project、Task、Evaluation、Actionが主要エンティティです。詳細は[ADR-0004](adr/decisions/0004-domain-knowledge.json)を参照。

## トラブルシューティング

### ビルドエラーが発生する

1. `npm run type-check`で型エラーを確認
2. `npm run lint`でLintエラーを確認
3. ADRの実装例と比較

### ADRが見つからない

1. [docs/adr/index.json](adr/index.json)でタグ検索
2. [docs/adr/README.md](adr/README.md)で概要確認
3. `adr-memory-manager`コマンドで検索

### 開発ワークフローがわからない

1. [CLAUDE.md](../CLAUDE.md)の該当フェーズを確認
2. [MCP_REFERENCE.md](../MCP_REFERENCE.md)でツール使用方法を確認

## 参考リンク

- **[機能仕様書](specs/feature-spec.md)**: 詳細な機能要件
- **[ADR一覧](adr/README.md)**: アーキテクチャ決定記録
- **[開発ワークフロー](../CLAUDE.md)**: 開発の標準手順
- **[MCPリファレンス](../MCP_REFERENCE.md)**: 開発ツールの使用方法

## 次のステップ

1. 機能仕様書とADRをすべて読む
2. 開発環境をセットアップする
3. 簡単なコンポーネントから実装を開始する
4. Phase 1-11のワークフローに従って開発を進める

---

**オンボーディング実施日**: 2025年12月6日
**作成者**: Claude Code (project-onboarding agent)
**バージョン**: 1.0
