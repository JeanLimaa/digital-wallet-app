'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700
        text-white font-semibold py-1.5 rounded-md transition disabled:opacity-60 
        disabled:cursor-not-allowed
      `}
    >
      {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
    </button>
  );
}
