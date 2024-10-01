import { Context } from '@ch20026103/backtest';
import { CurrentTask, Task } from './zustand';

export type TaskStoreType = {
  loop: number;
  tasks: Task[];
  currentTask: CurrentTask;
  setCurrentTask: (task: Task) => void;
  clearCurrentTask: () => void;
  increment: (task: Omit<Task, 'id'>) => void;
  decrement: (id: string) => void;
};

export type LocalStorageValueType = {
  id: string;
  date: number;
  listed: boolean;
  plan: string;
  name: string;
  c: number;
};

export type SelectPlanType = {
  plan: number;
  change: (plan: number) => void;
};

export type TrackingListType = {
  list: Map<string, LocalStorageValueType>;
  init: () => void;
  add: ({ id, plan, listed, date, name, c }: LocalStorageValueType) => void;
  remove: (id: string) => void;
};

export type BackTestType = {
  context: undefined | Context;
  dataStatus: boolean;
  startDate: number;
  endDate: number;
  setContext: (context: Context) => void;
  setDataStatus: (status: boolean) => void;
  setStartDate: (date: number) => void;
  setEndDate: (date: number) => void;
};
