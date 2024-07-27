import React from "react";

import { ITask } from "../types/tasks";
import Task from "./task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tasks)
            ? tasks.map((task) => <Task key={task._id} task={task} />)
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
