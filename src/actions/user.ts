"use server";

import api, { apiSafeCall } from '@/lib/api';
import { BalanceResponse, UserProfile } from '@/types/user.types';

export async function getBalance() {
    return await apiSafeCall<BalanceResponse>(
        api.get<BalanceResponse>('/user/balance')
    );
}

export async function getUserByEmail(email: string) {
    return await apiSafeCall<UserProfile>(
        api.get<UserProfile>(`/user/profile/${email}`)
    );
}