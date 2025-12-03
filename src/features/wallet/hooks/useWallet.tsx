import { useState } from 'react';
import { toast } from 'sonner';
import {
     deposit, transfer, reverseTransaction
} from '@/actions/transactions';
import {
    getUserByEmail
} from '@/actions/user';
import { depositSchema } from '@/schemas/deposit.schema';
import { transferSchema } from '@/schemas/transfer.schema';

export function useWallet() {
    const [depositValue, setDepositValue] = useState('');
    const [transferValue, setTransferValue] = useState('');
    const [transferEmail, setTransferEmail] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);

    async function handleDeposit() {
        const parsed = parseFloat(depositValue.replace(',', '.'));

        const result = depositSchema.safeParse({ amount: parsed });

        if (!result.success) {
            const errorMessage = result.error.issues[0]?.message || 'Valor inválido';
            toast.error(errorMessage);
            return;
        }

        toast.loading('Processando depósito...', { id: 'loading' });
        const response = await deposit(parseFloat(depositValue));
        toast.dismiss('loading');

        if (!response.success) return toast.error(response?.error || 'Erro ao depositar');

        toast.success('Depósito realizado com sucesso!');
        setDepositValue('');
    }

    async function handleTransfer(balance: number) {
        const result = transferSchema.safeParse({ amount: parseFloat(transferValue), email: transferEmail });
        
        if (!result.success) {
            const errorMessage = result.error.issues[0]?.message || 'Valor inválido';
            toast.error(errorMessage);
            return;
        }

        if (!transferValue || !transferEmail) return toast.error('Preencha todos os campos');
        if (parseFloat(transferValue) > balance) return toast.error('Saldo insuficiente');

        const user = await getUserByEmail(transferEmail);
        if (user.error) return toast.error(user.error || 'Usuário não encontrado');

        setConfirmOpen(true);
    }

    async function handleTransferConfirmed() {
        setConfirmOpen(false);
        toast.loading('Processando transferência...', { id: 'loading' });

        const res = await transfer(parseFloat(transferValue), transferEmail);
        toast.dismiss('loading');

        if (!res.success) return toast.error(res?.error || 'Erro ao transferir');

        toast.success('Transferência realizada!');
        setTransferEmail('');
        setTransferValue('');
    }

    async function handleReverseTransaction(id: string) {
        const result = await reverseTransaction(id);
        if (!result.success) return toast.error(result.error || 'Erro ao reverter');
        toast.success('Transação revertida');
    }

    return {
        depositValue, setDepositValue,
        transferValue, setTransferValue,
        transferEmail, setTransferEmail,
        confirmOpen, setConfirmOpen,
        handleDeposit, handleTransfer, handleTransferConfirmed,
        handleReverseTransaction,
        confirmationDialogProps: {
            open: confirmOpen,
            onCancel: () => setConfirmOpen(false),
            onConfirm: handleTransferConfirmed,
            value: transferValue,
            email: transferEmail
        }
    };
}