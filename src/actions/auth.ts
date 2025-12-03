'use server';

import { loginSchema, registerSchema } from '@/schemas/auth.schema';
import { setTokenCookie } from '@/lib/auth';

type AuthFormState = {
  error?: string;
  success: boolean;
};

async function validateForm<T>(schema: any, formData: FormData): Promise<{ data?: T; error?: string }> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const message = parsed.error.errors?.[0]?.message || 'Dados inválidos.';
    return { error: message };
  }

  return { data: parsed.data };
}

async function postToAPI<T>(url: string, body: T) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Erro ao processar a requisição.');
  }

  return res.json();
}

export async function loginAction(_: any, formData: FormData): Promise<AuthFormState> {
  const { data, error } = await validateForm<{ email: string; password: string }>(loginSchema, formData);
  if (error) return { error, success: false };

  try {
    const response = await postToAPI('/auth/login', data);
    setTokenCookie(response.access_token);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Erro inesperado ao fazer login.', success: false };
  }
}

export async function registerAction(_: any, formData: FormData): Promise<AuthFormState> {
  const { data, error } = await validateForm<{ name: string; email: string; password: string }>(registerSchema, formData);
  if (error) return { error, success: false };

  try {
    await postToAPI('/auth/register', data);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Erro inesperado ao registrar.', success: false};
  }
}