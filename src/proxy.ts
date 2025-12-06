import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

/**
 * 認証プロキシ (Next.js 16: middleware → proxy)
 * /dashboard 配下のルートは認証必須
 */
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  // ダッシュボードにアクセスしようとしているが未認証の場合
  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // ログイン済みでログインページにアクセスしようとしている場合
  if (req.nextUrl.pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
