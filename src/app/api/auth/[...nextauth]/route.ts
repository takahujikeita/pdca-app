import { handlers } from '@/lib/auth';

/**
 * NextAuth.js API Route Handler
 * GET /api/auth/* - 認証関連のGETリクエスト
 * POST /api/auth/* - 認証関連のPOSTリクエスト
 */
export const { GET, POST } = handlers;
