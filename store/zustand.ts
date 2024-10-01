import { Context } from '@ch20026103/backtest';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { BackTestType, LocalStorageValueType, SelectPlanType, TaskStoreType, TrackingListType } from './types';

/*******************
 *  Tomato's Task  *
 *******************/
export type Task = {
  name: String;
  description: String;
  finish: Boolean;
  workTime: number;
  relaxTime: number;
  id: String;
};
export type CurrentTask = Task | undefined;
export const useTaskStore = create<TaskStoreType>((set) => ({
  loop: 0,
  tasks: [
    {
      name: '閱讀',
      description: 'book - 老人與海',
      finish: false,
      workTime: 25 * 60 * 1000,
      relaxTime: 5 * 60 * 1000,
      id: uuidv4(),
    },
    {
      name: '寫程式',
      description: 'GraphQL + React',
      finish: false,
      workTime: 25 * 60 * 1000,
      relaxTime: 5 * 60 * 1000,
      id: uuidv4(),
    },
  ],
  currentTask: undefined,
  setCurrentTask: (task: Task) => set(() => ({ currentTask: task })),
  clearCurrentTask: () => set(() => ({ currentTask: undefined })),

  increment: (task: Omit<Task, 'id'>) => {
    const data = { ...task, id: uuidv4() };
    set((state) => ({
      tasks: [...state.tasks, data],
    }));
  },
  decrement: (id: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      loop: state.loop + 1,
    }));
  },
}));

/************************
 *  SelectStock's Plan  *
 ************************/
export const useSelectPlan = create<SelectPlanType>((set) => ({
  plan: 301,
  change: (plan: number) => set(() => ({ plan })),
}));

/**********************************
 *  SelectStock's Tracking Table  *
 **********************************/
const trackingLocalStorageKey = 'nextdashboard.selectstock.tracking.v2';

type TrackingJsonType = [string, LocalStorageValueType];
export const useTrackingList = create<TrackingListType>((set) => ({
  list: new Map(),
  init: () =>
    set(() => {
      const str = window.localStorage.getItem(trackingLocalStorageKey);
      if (str !== null) {
        const arr: TrackingJsonType[] = JSON.parse(str);
        const dataMap = new Map();
        arr.forEach(([id, data]: TrackingJsonType) => {
          dataMap.set(id, data);
        });
        return { list: dataMap };
      }
      const dataMap = new Map();
      return { list: dataMap };
    }),
  add: (data: LocalStorageValueType) => {
    set((state) => {
      const { id } = data;
      state.list.set(id, data);
      const mapArray = Array.from(state.list.entries());
      window.localStorage.setItem(trackingLocalStorageKey, JSON.stringify(mapArray));
      return { list: state.list };
    });
  },
  remove: (id: string) =>
    set((state) => {
      state.list.delete(id);
      const mapArray = Array.from(state.list.entries());
      window.localStorage.setItem(trackingLocalStorageKey, JSON.stringify(mapArray));
      return { list: state.list };
    }),
}));


/************************
 *  Backtest's Plan  *
 ************************/
const backtestLocalStorageKey = 'nextdashboard.backtest.';
export const useBackTest = create<BackTestType>((set) => ({
  context: undefined,
  dataStatus: false,
  startDate: window.localStorage.getItem(backtestLocalStorageKey+'startDate') || '20231101',
  endDate: window.localStorage.getItem(backtestLocalStorageKey+'endDate') || '20240927',
  setContext: (context: Context) => set((state) => ({ ...state, context })),
  setDataStatus: (status: boolean) => set((state) => ({ ...state, dataStatus: status })),
  setStartDate: (startDate: string) => {
    window.localStorage.setItem(backtestLocalStorageKey+'startDate', startDate);
    set((state) => ({ ...state, startDate }));
  },
  setEndDate: (endDate: string) => {
    window.localStorage.setItem(backtestLocalStorageKey+'endDate', endDate);
    set((state) => ({ ...state, endDate }));
  },
}));
