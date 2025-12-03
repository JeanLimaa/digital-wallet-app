import { getTransactions } from "@/actions/transactions";
import { getBalance } from "@/actions/user";
import { WalletForm } from "@/features/wallet/screens/WalletForm";

// Force dynamic rendering to avoid pre-rendered, because this page needs auth
export const dynamic = 'force-dynamic';

export default async function WalletPage() {
  const [balance, transanctions] = await Promise.all([
    getBalance(),
    getTransactions()
  ]);

  if (!balance?.success || !transanctions?.success) {
    throw new Error('Erro ao carregar dados da carteira.');
  }

  return (
    <WalletForm
      balance={balance.success.balance}
      transactions={transanctions.success}
    />
  )
}