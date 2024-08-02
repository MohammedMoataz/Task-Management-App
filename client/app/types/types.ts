export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  linkedin_url: string;
  picture: string;
  title: string;
  address: string;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  category: 'Work' | 'Personal' | 'Shopping' | string;
  completed: boolean;
  due_date: Date | string;
  owner: string;
}
