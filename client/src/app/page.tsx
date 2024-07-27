import { getAllTasks } from "@/api";
import AddTask from "./components/add-task";
import TodoList from "./components/todo-list";

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        // await signIn("github");
      }}
    >
      <p>You are not logged in</p>
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
}

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        // await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}

export default async function Page() {
  const tasks = await getAllTasks();

  return (
    <section>
      {/* <h1>Home</h1> */}
      {/* <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div> */}
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Task Management App</h1>
          <AddTask />
        </div>
        <TodoList tasks={tasks} />
      </main>
    </section>
  );
}
