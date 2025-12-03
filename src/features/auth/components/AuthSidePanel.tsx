import { Wallet } from 'lucide-react';

export function AuthSidePanel() {
  return (
    <div className="hidden md:flex bg-gradient-to-br from-indigo-600 to-blue-500 items-center justify-center text-white">
      <div className="text-center px-10">
        <div className='flex items-center justify-evenly'>
            <Wallet size={64} />
            <h1 className="text-4xl font-bold">Carteira Digital</h1>
        </div>
        <p className="mt-4 text-lg">Gerencie suas finanças de forma simples e segura.</p>
      </div>
    </div>
  );
}
