import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { LocalStorageValueType, Task, TaskStore } from './types';

/*******************
 *  Tomato's Task  *
 *******************/

export const useTaskStore = create<TaskStore>((set) => ({
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
type Plan = {
  plan: number;
  change: (plan: number) => void;
};
export const useSelectPlan = create<Plan>((set) => ({
  plan: 301,
  change: (plan: number) => set(() => ({ plan })),
}));

/**********************************
 *  SelectStock's Tracking Table  *
 **********************************/
const localStorageKey = 'nextdashboard.selectstock.tracking';
type Tracking = {
  list: Map<string, LocalStorageValueType>;
  init: () => void;
  add: ({ id, plan, listed, date, name, c }: LocalStorageValueType) => void;
  remove: (id: string) => void;
};
export type TrackingJsonType = [string, LocalStorageValueType];
export const useTrackingList = create<Tracking>((set) => ({
  list: new Map(),
  init: () =>
    set(() => {
      const str = window.localStorage.getItem(localStorageKey);
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
      window.localStorage.setItem(localStorageKey, JSON.stringify(mapArray));
      return { list: state.list };
    });
  },
  remove: (id: string) =>
    set((state) => {
      state.list.delete(id);
      const mapArray = Array.from(state.list.entries());
      window.localStorage.setItem(localStorageKey, JSON.stringify(mapArray));
      return { list: state.list };
    }),
}));
