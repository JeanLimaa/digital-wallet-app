import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
  DEFAULT_AUTHENTICATED_REDIRECT,
  DEFAULT_UNAUTHENTICATED_REDIRECT
} from './constants/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isPublic = PUBLIC_ROUTES.some(route => pathname.includes(route));
  const isProtected = PROTECTED_ROUTES.some(route => pathname.includes(route));

  const token = request.cookies.get('token')?.value || null;
  
  const isAuthenticated = !!token;

  if (isProtected && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = DEFAULT_UNAUTHENTICATED_REDIRECT;
    return NextResponse.redirect(url);
  }
  
  if (isPublic && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = DEFAULT_AUTHENTICATED_REDIRECT;
    return NextResponse.redirect(url);
  }
  
  if(pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = isAuthenticated ? DEFAULT_AUTHENTICATED_REDIRECT : DEFAULT_AUTHENTICATED_REDIRECT;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};