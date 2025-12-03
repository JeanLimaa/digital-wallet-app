import Link from 'next/link';

type Props = {
  type: 'login' | 'register';
};

export function AuthSwitchLink({ type }: Props) {
  return (
    <p className="text-center text-sm text-gray-600 mt-4">
      {type === 'login' ? (
        <>
          Não tem uma conta?{' '}
          <Link href="/auth/register" className="text-indigo-600 hover:underline font-medium">
            Cadastre-se
          </Link>
        </>
      ) : (
        <>
          Já tem uma conta?{' '}
          <Link href="/auth/login" className="text-indigo-600 hover:underline font-medium">
            Entrar
          </Link>
        </>
      )}
    </p>
  );
}
