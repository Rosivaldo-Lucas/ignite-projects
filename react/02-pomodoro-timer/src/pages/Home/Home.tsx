import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from "phosphor-react";

import { CyclesContext } from "../../contexts/CyclesContext";

import { NewCyleForm } from './components/NewCycleForm/NewCycleForm';
import { Countdown } from './components/Countdown/Countdown';

import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, formState, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);

    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <FormProvider { ...newCycleForm }>
          <NewCyleForm />
        </FormProvider>
        
        <Countdown />

        {activeCycle ?
          (
            <StopCountdownButton
              type='button'
              onClick={interruptCurrentCycle}
            >
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) :
          (
            <StartCountdownButton type='submit' disabled={isSubmitDisabled}>
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )

        }
      </form>
    </HomeContainer>
  );

}
