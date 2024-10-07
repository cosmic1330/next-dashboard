import { Context } from '@ch20026103/backtest';
import { ConditionKey, ConditionValue, CurrentTask, Task } from './zustand';

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
  lowStockPrice: undefined | number;
  hightStockPrice: undefined | number;
  capital: undefined | number;
  buyPrice: undefined | string;
  sellPrice: undefined | string;
  context: undefined | Context;
  dataStatus: boolean;
  startDate: number;
  endDate: number;
  setOptions: (key: string, value: any) => void;
  setContext: (context: Context) => void;
  setDataStatus: (status: boolean) => void;
  setStartDate: (date: number) => void;
  setEndDate: (date: number) => void;
};

export type ConditionType = {
  dialogStatus: boolean;
  marketSentiment: undefined | ConditionValue[];
  reviewPurchaseList: undefined | ConditionValue[];
  reviewSellList: undefined | ConditionValue[];
  sell: undefined | ConditionValue[];
  buy: undefined | ConditionValue[];
  setDialogStatus: (status: boolean) => void;
  setConditionKeyValue: (value: ConditionValue, key: ConditionKey) => void;
  removeConditionKeyValue: (index: number, key: ConditionKey) => void;
};
