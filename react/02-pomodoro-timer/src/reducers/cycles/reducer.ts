import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  activeCycleId: string | null;
  cycles: Cycle[];
}

export function cyclesReducer(state: CyclesState, action: any): CyclesState {
  if (action.type === ActionTypes.ADD_NEW_CYCLE) {
    return {
      ...state,
      activeCycleId: action.payload.data.id,
      cycles: [...state.cycles, action.payload.data]
    };
  } else if (action.type === ActionTypes.INTERRUPTED_CURRENT_CYCLE) {
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
  } else if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
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
}
