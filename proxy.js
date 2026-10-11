import { NextResponse } from 'next/server';
import { COOKIE, sessionToken, safeEqual } from './lib/session';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname === '/login' || pathname === '/api/login') return NextResponse.next();

  const configured = process.env.AUDIT_PASSWORD && process.env.SESSION_SECRET;
  const cookie = req.cookies.get(COOKIE)?.value || '';
  if (configured && safeEqual(cookie, await sessionToken())) return NextResponse.next();

  if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
