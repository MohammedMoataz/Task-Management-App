import { ILogin, ITask, IUser } from "../types/types.js";

const baseUrl = 'http://localhost:4000';

export const signUp = async (user: IUser): Promise<any> => {
  console.log(user)
  return await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .catch(console.error);
}

export const signin = async (login: ILogin): Promise<any> => {
  console.log(login);
  return await fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  })
    .then(res => res.json())
    .catch(console.error);
}

export const getAllTasks = async (token: string): Promise<ITask[]> => {
  return await fetch(`${baseUrl}/task/all`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
    .then(res => res.json())
    .catch(console.error);
}

export const addTask = async (task: ITask, token: string): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })
  const newTask = await res.json();
  return newTask;
}

export const editTask = async (task: ITask, token: string): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/task?id=${task._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })

  return await res.json();;
}

export const deleteTask = async (id: string, token: string): Promise<any> => {
  const res = await fetch(`${baseUrl}/task?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  })

  return await res.json();
}
