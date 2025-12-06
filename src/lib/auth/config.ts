import { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';

/**
 * NextAuth.js v5 設定
 */
export const authConfig: NextAuthConfig = {
  providers: [
    // GitHub OAuth
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // Google OAuth
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // 開発用Credentials認証（本番では無効化推奨）
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        // 開発環境でのテスト用認証
        // 本番環境では適切なパスワードハッシュ検証を実装
        if (process.env.NODE_ENV === 'development') {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.avatar,
            };
          }
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      // ユーザーがDBに存在しない場合は作成
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || 'Anonymous',
            avatar: user.image,
            role: 'member',
          },
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        // セッションにユーザーIDを追加
        session.user.id = token.sub;

        // DBからユーザー情報を取得して追加
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });

        if (dbUser) {
          session.user.role = dbUser.role;
        }
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  debug: process.env.NODE_ENV === 'development',
};
