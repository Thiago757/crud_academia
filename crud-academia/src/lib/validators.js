import { z } from 'zod';

export const alunoSchema = z.object({
    nome: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
    dataNascimento: z.string().nonempty({ message: 'A data de nascimento é obrigatória.' }),
    plano: z.enum(['Mensal', 'Trimestral', 'Anual'], {
        errorMap: () => ({ message: 'Por favor, selecione um plano.' })
    }),
    cpf: z.string().optional(),
    cidade: z.string().optional(),
    bairro: z.string().optional(),
    endereco: z.string().optional(),
});