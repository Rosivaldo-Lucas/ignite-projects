import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';

const newTransactionSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionInputs = z.infer<typeof newTransactionSchema>;

export default function NewTransactionModal() {
  const { register, handleSubmit, control, formState: { isSubmitting } } = useForm<NewTransactionInputs>({
    resolver: zodResolver(newTransactionSchema),
  });

  function handleCreateewTransaction(data: NewTransactionInputs) {
    console.log(data);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateewTransaction)}>
          <input
            type='text'
            placeholder='Descrição'
            required
            {...register('description')}
          />
          
          <input
            type='text'
            placeholder='Preço'
            required
            {...register('price', { valueAsNumber: true })}
          />
          
          <input
            type='text'
            placeholder='Categoria'
            required
            {...register('category')}
          />

          <Controller
            name='type'
            control={control}
            render={({ field }) => {
              return (
                <TransactionType
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <TransactionTypeButton variant='income' value='income'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  
                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type='submit' disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
