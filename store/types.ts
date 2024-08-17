export type Task = {
  name: String;
  description: String;
  finish: Boolean;
  workTime: number;
  relaxTime: number;
  id: String;
};
export type CurrentTask = Task | undefined;

export type TaskStore = {
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
