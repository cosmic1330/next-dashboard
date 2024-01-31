export type Task = {
  name: String;
  description: String;
  finish: Boolean;
  workTime: number;
  relaxTime: number;
  id: String;
};
export type CurrentTask = Task | undefined;
