import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
  DEFAULT_AUTHENTICATED_REDIRECT,
  DEFAULT_UNAUTHENTICATED_REDIRECT
} from './constants/routes';
import { AxiosError } from 'axios';

async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch(error: AxiosError | unknown) {
    if((error as AxiosError)?.response?.status === 401) {
      return false;
    }
    
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isPublic = PUBLIC_ROUTES.some(route => pathname.includes(route));
  const isProtected = PROTECTED_ROUTES.some(route => pathname.includes(route));

  const token = request.cookies.get('token')?.value || null;
  
  const isAuthenticated = !!token;

  // If there's a token, validate it
  if (token && isProtected) {
    const isValidToken = await validateToken(token);
    if (!isValidToken) {
      // Invalid/expired token - remove cookie and redirect to login
      const url = request.nextUrl.clone();
      url.pathname = DEFAULT_UNAUTHENTICATED_REDIRECT;
      const response = NextResponse.redirect(url);
      response.cookies.delete('token');
      return response;
    }
  }

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