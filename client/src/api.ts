import { ITask } from "../types/tasks.js";

const baseUrl = 'http://localhost:4000';

export const getAllTasks = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/task/all`, { cache: 'no-store' });
  const tasks = await res.json();
  return tasks;
}

export const addTask = async (task: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const newTask = await res.json();
  return newTask;
}

export const editTask = async (task: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/task?id=${task._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  return await res.json();;
}

export const deleteTask = async (id: string): Promise<any> => {
  const res = await fetch(`${baseUrl}/task?id=${id}`, {
    method: 'DELETE',
  })

  return await res.json();
}