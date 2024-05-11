import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { CurrentTask, Task } from './types';

/***********
 *  Stock  *
 ***********/
type StockStore = {
  retrospect: string;
  change: (day: string) => void;
};

export const useStockStore = create<StockStore>((set) => ({
  retrospect: '0',
  change: (day: string) => set(() => ({ retrospect: day })),
}));

/*******************
 *  Tomato's Task  *
 *******************/

type TaskStore = {
  loop: number;
  tasks: Task[];
  currentTask: CurrentTask;
  setCurrentTask: (task: Task) => void;
  clearCurrentTask: () => void;
  increment: (task: Omit<Task, 'id'>) => void;
  decrement: (id: string) => void;
};

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
  plan: 0,
  change: (plan: number) => set(() => ({ plan })),
}));
