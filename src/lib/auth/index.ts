import NextAuth from 'next-auth';
import { authConfig } from './config';

/**
 * NextAuth.js インスタンス
 */
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
