import { getAllTasks } from "@/app/api/api";
import AddTask from "./components/add-task";
import TodoList from "./components/todo-list";
import Link from "next/link";

export default async function Page() {
  const tasks = await getAllTasks();

  return (
    <section className="max-w-4xl mx-auto mt-4">
      <div>
        <Link href="/signin" legacyBehavior>
          <a>Sign In</a>
        </Link>
        <Link href="/signup" legacyBehavior>
          <a>Sign Up</a>
        </Link>
      </div>

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
