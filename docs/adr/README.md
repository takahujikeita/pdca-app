# Architecture Decision Records (ADRs)

このディレクトリには、PDCA App for POSSEプロジェクトのアーキテクチャ決定記録（ADR）が保存されています。

## ADRとは

ADR（Architecture Decision Record）は、プロジェクトで行われた重要なアーキテクチャ決定を記録したドキュメントです。決定の背景、選択肢、根拠、結果を明確に記録することで、以下のメリットがあります：

- 将来の開発者が過去の決定の理由を理解できる
- 同じ議論を繰り返さずに済む
- プロジェクトの進化を追跡できる
- チーム全体で知識を共有できる

## このプロジェクトのADR

このプロジェクトでは、AI（Claude Code）が機械可読なJSON形式でADRを管理しています。人間が読みやすいMarkdown形式ではなく、JSON形式を採用することで、AIがADRを自動的に検索・参照・更新できます。

### 記録されているADR

1. **[ADR-0001: Project Structure and Naming Conventions](decisions/0001-project-structure.json)**
   - Next.js App Routerを活用したディレクトリ構造
   - ケバブケースファイル名
   - @/aliasによる個別インポート

2. **[ADR-0002: Technology Stack and Dependencies](decisions/0002-technology-stack.json)**
   - Next.js 16 + TypeScript + TailwindCSS
   - Prisma + SQLite
   - NextAuth.js + TanStack Query + Zod

3. **[ADR-0003: Architecture Patterns and Code Organization](decisions/0003-architecture-patterns.json)**
   - Server Components優先戦略
   - 単一責任原則とコンポーネント設計
   - 状態管理階層（URL State > Server State > Local State > Global State）
   - カスタムフック活用

4. **[ADR-0004: Domain Knowledge and Business Logic](decisions/0004-domain-knowledge.json)**
   - ドメインエンティティ（User, Project, Task, Evaluation, Action）
   - 3つのPDCA粒度（プロジェクト、タスク、日常）
   - ビジネスルールとユーザーフロー

## ADRの構造

各ADRファイルは以下の構造を持っています：

```json
{
  "id": "ADR-XXXX",
  "timestamp": "ISO 8601形式の日時",
  "title": "決定のタイトル",
  "status": "proposed | accepted | deprecated | superseded",
  "context": {
    "problem": "解決すべき問題",
    "constraints": ["制約条件"],
    "requirements": ["要件"]
  },
  "decision": {
    "summary": "決定の要約",
    "details": "詳細説明",
    "rationale": "決定の根拠",
    "alternatives": [
      {
        "option": "代替案",
        "rejected": true,
        "reason": "却下理由"
      }
    ],
    "consequences": ["結果・影響"]
  },
  "implementation": {
    "affected_files": ["影響を受けるファイル"],
    "affected_components": ["影響を受けるコンポーネント"],
    "code_patterns": ["コードパターン"],
    "examples": [
      {
        "file": "ファイルパス",
        "description": "説明",
        "code": "コード例（任意）"
      }
    ]
  },
  "metadata": {
    "tags": ["タグ"],
    "related_adrs": ["関連するADR ID"],
    "search_keywords": ["検索キーワード"]
  }
}
```

## ADRの使い方

### 実装前の確認

新機能を実装する前に、必ず関連するADRを確認してください：

1. **[index.json](index.json)** を開いて関連するADRを特定
2. 該当するADRファイルを読み込む
3. 特に以下を確認：
   - `decision.summary`: 決定の概要
   - `decision.rationale`: 決定の根拠
   - `implementation.code_patterns`: 使用すべきコードパターン
   - `implementation.examples`: 実装例

### 特に重要な確認項目

#### プロジェクト構造（ADR-0001）
- ディレクトリ構造とファイル配置
- 命名規則（ケバブケース）
- インポートルール（@/alias、バレルインポート禁止）

#### 技術スタック（ADR-0002）
- 使用すべきライブラリとバージョン
- 依存関係の管理方針
- 設定ファイルの構造

#### アーキテクチャパターン（ADR-0003）
- Server Components vs Client Componentsの使い分け
- 状態管理の階層と優先順位
- データフェッチング戦略
- カスタムフックの活用方法

#### ドメイン知識（ADR-0004）
- ドメインエンティティの定義
- ビジネスルールの理解
- ユーザーフローの把握
- 評価指標の計算方法

### 新しいADRの作成

新しい重要な決定を行った場合は、`adr-memory-manager`エージェントを使用してADRを作成してください：

```bash
# Claude Codeでadr-memory-managerコマンドを実行
```

## ADRの検索

ADRは以下の方法で検索できます：

1. **タグで検索**: [index.json](index.json)の`tags_index`を参照
2. **ステータスで検索**: [index.json](index.json)の`status_index`を参照
3. **キーワードで検索**: 各ADRの`metadata.search_keywords`を参照
4. **AIエージェント**: `adr-memory-manager`エージェントのクエリ機能を使用

## プロジェクトオンボーディング

このADRシリーズは、`project-onboarding`エージェントによって生成されました。新規開発者がプロジェクトに参加する際は、以下の順序でADRを読むことを推奨します：

1. **ADR-0001**: プロジェクト構造を理解する
2. **ADR-0002**: 使用技術を把握する
3. **ADR-0003**: アーキテクチャパターンを学ぶ
4. **ADR-0004**: ドメイン知識を習得する

## 関連ドキュメント

- [機能仕様書](../specs/feature-spec.md): プロジェクトの詳細な機能要件
- [開発ワークフロー](../../CLAUDE.md): 開発の標準手順
- [MCPリファレンス](../../MCP_REFERENCE.md): 開発ツールの使用方法

## 更新履歴

- **2025-12-06**: 初回オンボーディング実施、ADR-0001〜0004作成
