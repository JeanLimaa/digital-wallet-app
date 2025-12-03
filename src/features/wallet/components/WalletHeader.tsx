import { Button } from "@/components/ui/button";
import { clearTokenCookie } from "@/lib/auth";
import { formatToBrlCurrency } from "@/lib/currency";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function WalletHeader({ balance }: { balance: number }) {
    const router = useRouter();

    async function logout() {
        try {
            await clearTokenCookie();
            toast.success('Você saiu com sucesso!');
            router.refresh();
        } catch {
            toast.error('Erro ao sair');
        }
    }

    return (
        <header>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Minha Carteira Digital</h1>
                <Button variant="outline" onClick={logout}>Sair</Button>
            </div>

            <p className="mb-4 text-center text-lg font-semibold">Saldo atual: {formatToBrlCurrency(balance)}</p>
        </header>
    )
}