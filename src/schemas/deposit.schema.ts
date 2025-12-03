import { z } from 'zod';

export const depositSchema = z.object({
  amount: z.number({message: 'Valor é obrigatório'})
    .min(0.01, { message: 'Valor mínimo de depósito é R$ 0,01' })
});