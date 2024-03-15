import { ReactNode, createContext, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycleId: string | null;
  activeCycle: Cycle | undefined;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesState {
  activeCycleId: string | null;
  cycles: Cycle[];
}

export const CyclesContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({ children } : CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {

    if (action.type === 'ADD_NEW_CYCLE') {
      return {
        ...state,
        activeCycleId: action.payload.data.id,
        cycles: [...state.cycles, action.payload.data]
      };
    } else if (action.type === 'INTERRUPTED_CURRENT_CYCLE') {
      return {
        ...state,
        activeCycleId: null,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {...cycle, interruptedDate: new Date()};
          } else {
            return cycle;
          }
        })
      };
    } else if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {...cycle, finishedDate: new Date()};
          } else {
            return cycle;
          }
        }),
      };
    }

    return state;
  },
  {
    activeCycleId: null,
    cycles: [],
  });

  const { cycles, activeCycleId } = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        data: newCycle,
      }
    });

    setSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPTED_CURRENT_CYCLE',
      payload: {
        data: activeCycleId,
      }
    });
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        data: activeCycleId,
      }
    });
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }
  
  return (
    <CyclesContext.Provider value={{
      cycles,
      activeCycleId,
      activeCycle,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
      setSecondsPassed,
      createNewCycle,
      interruptCurrentCycle
    }}>
      {children}
     </CyclesContext.Provider>
  );
}
