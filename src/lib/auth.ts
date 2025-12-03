"use server";
import { cookies } from 'next/headers';

export async function getTokenCookie() {
  const tokenCookie = cookies().get('token');
  return tokenCookie ? tokenCookie.value : null;
}

export async function setTokenCookie(token: string) {
  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearTokenCookie() {
  cookies().delete('token');
}