import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/features/dashboard/dashboard-header';

/**
 * ダッシュボードレイアウト
 * 認証済みユーザーのみアクセス可能
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // 未認証の場合はログインページへリダイレクト（ミドルウェアでも保護されているが念のため）
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={session.user} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
