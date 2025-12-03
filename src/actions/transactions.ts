'use server';

import api, { apiSafeCall } from '@/lib/api';
import { Transaction } from '@/types/transaction.types';

export async function getTransactions() {
    return await apiSafeCall<Transaction[]>(
        api.get<Transaction[]>('/transactions/history')
    );
}

export async function deposit(amount: number) {
    const deposit = await apiSafeCall(
        api.post('/transactions/deposit', { amount })
    );
    return deposit;
}

export async function transfer(amount: number, toUserEmail: string) {
    const transfer = await apiSafeCall(api.post('/transactions/transfer', { amount, toUserEmail }));
    return transfer; 
}

export async function reverseTransaction(transactionId: string) {
    const reverse = await apiSafeCall(
        api.post(`/transactions/reverse/${transactionId}`)
    );
    return reverse;
}