import { AuthSwitchLink } from '../components/AuthSwitchLink';
import { ClientAuthForm } from '../components/ClientAuthForm';

type Props = {
  type: 'login' | 'register';
};

export function AuthForm({ type }: Props) {
  const formConfig = {
    login: {
      title: 'Entrar',
      showNameInput: false,
      buttonLabel: 'Entrar',
    },
    register: {
      title: 'Criar conta',
      showNameInput: true,
      buttonLabel: 'Cadastrar',
    },
  };

  const config = formConfig[type];

  return (
    <>
      <ClientAuthForm
        type={type}
        title={config.title}
        showNameInput={config.showNameInput}
        buttonLabel={config.buttonLabel}
      />
    
      <AuthSwitchLink type={type} />
    </>
  );
}