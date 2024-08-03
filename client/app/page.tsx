"use client";
import Link from "next/link";

import { getAllTasks } from "@/app/api/api";
import AddTask from "./components/add-task";
import TodoList from "./components/todo-list";
import { useState } from "react";

export default function Page() {
  const [tasks, setTasks] = useState([]);

  /**
   * Asynchronously loads all tasks from the server using the user's token
   * stored in localStorage, and sets the state of the component to the tasks.
   *
   * @return {Promise<void>} A Promise that resolves when the tasks have been loaded.
   */
  const loadTasks = async (): Promise<void> => {
    const token: string = localStorage.getItem("token") || "";

    const tasks: any = await getAllTasks(`${token}`);

    setTasks(tasks);
  };

  return (
    <section className="max-w-4xl mx-auto mt-4">
      <div className="navbar bg-base-100 w-full flex justify-center space-x-10">
        <Link href="/signin" legacyBehavior>
          <a>Sign In</a>
        </Link>
        <Link href="/signup" legacyBehavior>
          <a>Sign Up</a>
        </Link>
      </div>

      {localStorage.getItem("token") !== null ? (
        <div>
          <button className="btn btn-primary" onClick={loadTasks}>
            Load Tasks
          </button>

          {tasks ? (
            <main className="max-w-4xl mx-auto mt-4">
              <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Task Management App</h1>
                <AddTask />
              </div>
              <TodoList tasks={tasks} />
            </main>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
