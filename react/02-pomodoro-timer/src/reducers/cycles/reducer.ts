import { produce } from 'immer';

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

interface Action {
  type: ActionTypes;
  payload?: Cycle;
}

export function cyclesReducer(state: CyclesState, action: Action): CyclesState {
  if (action.type === ActionTypes.ADD_NEW_CYCLE) {
    return produce(state, (draft) => {
      if (action.payload) {
        draft.activeCycleId = action.payload.id;
        draft.cycles.push(action.payload);
      }
    });
    
    // return {
    //   ...state,
    //   activeCycleId: action.payload.data.id,
    //   cycles: [...state.cycles, action.payload.data]
    // };
  } else if (action.type === ActionTypes.INTERRUPTED_CURRENT_CYCLE) {
    const currentCycleIndex = state.cycles.findIndex((cycle) => {
      return cycle.id === state.activeCycleId;
    });

    if (currentCycleIndex < 0) {
      return state;
    }

    return produce(state, (draft) => {
      draft.activeCycleId = null;
      draft.cycles[currentCycleIndex].interruptedDate = new Date();
    });

    // return {
    //   ...state,
    //   activeCycleId: null,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === state.activeCycleId) {
    //       return {...cycle, interruptedDate: new Date()};
    //     } else {
    //       return cycle;
    //     }
    //   })
    // };
  } else if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
    const currentCycleIndex = state.cycles.findIndex((cycle) => {
      return cycle.id === state.activeCycleId;
    });

    if (currentCycleIndex < 0) {
      return state;
    }
    
    return produce(state, (draft) => {
      draft.cycles[currentCycleIndex].finishedDate = new Date();
    });
    
    // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === state.activeCycleId) {
    //       return {...cycle, finishedDate: new Date()};
    //     } else {
    //       return cycle;
    //     }
    //   }),
    // };
  }

  return state;
}
