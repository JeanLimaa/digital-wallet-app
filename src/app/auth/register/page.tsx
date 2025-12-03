import {AuthForm} from '@/features/auth/screens/AuthForm';
import {AuthLayout} from '@/features/auth/components/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthForm type="register" />
    </AuthLayout>
  );
}
