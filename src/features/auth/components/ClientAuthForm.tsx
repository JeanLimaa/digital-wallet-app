'use client';

import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { loginAction, registerAction } from '@/actions/auth';
import { DEFAULT_AUTHENTICATED_REDIRECT, DEFAULT_UNAUTHENTICATED_REDIRECT } from '@/constants/routes';
import { InputForm } from '../components/InputForm';
import { SubmitButton } from './SubmitButton';
import { toast } from 'sonner';

type Props = {
  type: 'login' | 'register';
  title: string;
  showNameInput: boolean;
  buttonLabel: string;
};

export function ClientAuthForm({ type, title, showNameInput, buttonLabel }: Props) {
  const router = useRouter();
  const isLogin = type === 'login';
  const action = isLogin ? loginAction : registerAction;

  const [state, formAction] = useFormState(action, { error: '', success: false });

  if (state.success) {
    toast.success(
      isLogin ? 'Login realizado com sucesso!' : 'Cadastro realizado com sucesso!'
    );
    router.push(isLogin ? DEFAULT_AUTHENTICATED_REDIRECT : DEFAULT_UNAUTHENTICATED_REDIRECT);
  }

  return (
      <form action={formAction} className="bg-white p-8 shadow-xl rounded-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

        {showNameInput && (
          <InputForm label="Nome" type="text" name="name" placeholder="Digite seu nome completo" />
        )}

        <InputForm label="E-mail" type="email" name="email" placeholder="Digite seu e-mail" />
        <InputForm label="Senha" type="password" name="password" placeholder="Digite sua senha" />

        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

        <SubmitButton>
            {buttonLabel}
        </SubmitButton>
      </form>
  );
}