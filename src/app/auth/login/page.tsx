import {AuthForm} from '@/features/auth/screens/AuthForm';
import {AuthLayout} from '@/features/auth/components/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="login" />
    </AuthLayout>
  );
}