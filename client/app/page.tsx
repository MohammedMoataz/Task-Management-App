"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllTasks } from "@/app/api/api";
import AddTask from "./components/add-task";
import TodoList from "./components/todo-list";
import { decodeToken } from "./utils/decodetoken";
import { setUser } from "@/store";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({ id: "", name: "" });

  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = decodeToken(`${token}`);
    setUser(userInfo);
  }, []);

  // if (!user) return <div>Loading...</div>;

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

      <div>
        <button className="btn btn-primary" onClick={loadTasks}>
          Load Tasks
        </button>

        <main className="max-w-4xl mx-auto mt-4">
          <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">
              Task Management App, Welcome {user.name}
            </h1>
            <AddTask id={user.id} />
          </div>
          <TodoList tasks={tasks} />
        </main>
      </div>
    </section>
  );
}
