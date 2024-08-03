import { ILogin, ITask, IUser } from "../types/types.js";

const baseUrl = 'http://localhost:4000';

/**
 * This function sends a POST request to the server to sign up a new user.
 * 
 * @param {IUser} user - The user object containing the user's information.
 * @return {Promise<any>} - A promise that resolves to the response from the server.
 */
export const signUp = async (user: IUser): Promise<any> => {
  console.log(user);

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
    .catch(err => []);
}

/**
 * Sends a POST request to the server to add a new task with the provided task object and JWT token.
 *
 * @param {ITask} task - The task object containing the details of the new task.
 * @param {string} token - The JWT token for authentication.
 * @return {Promise<ITask>} - A promise that resolves to the newly created task object from the server.
 */
export const addTask = async (task: ITask, token: string): Promise<void> => {
  const url = `${baseUrl}/task`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task) // Convert the task object to JSON and include it in the request body
  }

  const res = await fetch(url, requestOptions);
  const newTask = await res.json();

  return newTask;
}

/**
 * Sends a PUT request to the server to update a task with the provided task object and JWT token.
 *
 * @param {ITask} task - The task object containing the updated task details.
 * @param {string} token - The JWT token for authentication.
 * @return {Promise<ITask>} A promise that resolves with the updated task object from the server.
 */
export const editTask = async (task: ITask, token: string): Promise<ITask> => {
  const url = `${baseUrl}/task?id=${task._id}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })

  // Parse the response from the server and return it
  return await res.json();
}

/**
 * Deletes a task from the server using the provided task ID and JWT token.
 *
 * @param {string} id - The ID of the task to be deleted.
 * @param {string} token - The JWT token for authentication.
 * @return {Promise<any>} A promise that resolves with the JSON response from the server.
 */
export const deleteTask = async (id: string, token: string): Promise<any> => {
  const url = `${baseUrl}/task?id=${id}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Attach the JWT token to the request headers
    },
  });

  // Parse the response from the server and return it
  return await res.json();
}