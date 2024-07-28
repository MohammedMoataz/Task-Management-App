export interface ITask {
  _id: string;
  title: string;
  description: string;
  category: 'Work' | 'Personal' | 'Shopping' | string;
  completed: boolean;
  due_date: Date | string;
  owner: string;
}
