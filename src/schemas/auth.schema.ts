import z from "zod";

export const loginSchema = z.object({
  email: z.string({message: 'E-mail é obrigatorio'}).email({ message: 'E-mail inválido' }),
  password: z.string({message: 'Senha é obrigatorio'}).min(6, { message: 'Senha deve ter ao menos 6 caracteres' }),
});

export const registerSchema = loginSchema.extend({
  name: z.string({message: 'Senha é obrigatorio'}).min(2, { message: 'Nome é obrigatório' }),
});