"use client";
import Link from "next/link";

import { getAllTasks } from "@/app/api/api";
import AddTask from "./components/add-task";
import TodoList from "./components/todo-list";
import { useEffect, useState } from "react";

export default function Page() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const tasks = await getAllTasks(`${localStorage.getItem("token")}`);
    setTasks(tasks as any);
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
    </section>
  );
}
