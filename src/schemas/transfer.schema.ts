import { z } from 'zod';

export const transferSchema = z.object({
  amount: z.number({message: 'Valor é obrigatório'})
    .min(0.01, { message: 'Valor mínimo de depósito é R$ 0,01' }),
    email: z.string({message: 'Email é obrigatório'})
    .email({ message: 'Email inválido' })
});