/**
 * アプリケーション設定
 */
export const APP_CONFIG = {
  APP_NAME: 'PDCA App for POSSE',
  APP_DESCRIPTION:
    'プロジェクト、タスク、日常の振り返りを通じた継続的改善と成長を実現するPDCAサイクル支援システム',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const;

/**
 * ページネーション設定
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * キャッシュ設定（秒）
 */
export const CACHE_TIME = {
  SHORT: 60, // 1分
  MEDIUM: 300, // 5分
  LONG: 3600, // 1時間
} as const;
