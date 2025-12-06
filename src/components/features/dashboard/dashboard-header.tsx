'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

/**
 * ダッシュボードヘッダーコンポーネント
 * ユーザー情報とログアウトボタンを表示
 */
export function DashboardHeader({ user }: DashboardHeaderProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PDCA App
              </h1>
              <span className="text-sm text-gray-500">for POSSE</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                ダッシュボード
              </Link>
              <Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                プロジェクト
              </Link>
              <Link href="/tasks" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                タスク
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.name || user.email}</p>
                {user.name && user.email && (
                  <p className="text-xs text-gray-500">{user.email}</p>
                )}
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              ログアウト
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
