'use client';

import { Button } from "@/components/ui/button";

export default function Error({ error }: { error: Error; }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-12">
      <h2 className="text-2xl font-bold mb-4">Algo deu errado</h2>
      <p className="mb-6 text-gray-600">{error.message || 'Erro desconhecido.'}</p>
      <Button variant="destructive" onClick={() => window.location.reload()}>
        Tentar novamente
      </Button>
    </div>
  );
}