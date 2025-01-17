"use client";

import { FormEvent, FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./modal";
import { useRouter } from "next/navigation";

import { deleteTask, editTask } from "@/app/api/api";
import { ITask } from "../types/types";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [titleToEdit, setTitleToEdit] = useState<string>(task.title);
  const [descriptionToEdit, setDescriptionToEdit] = useState<string>(
    task.description
  );
  const [categoryToEdit, setCategoryToEdit] = useState<string>(task.category);
  const [completedToEdit, setCompletedToEdit] = useState<boolean>(
    task.completed
  );
  const [due_dateToEdit, setDueDateToEdit] = useState<Date | string>(
    task.due_date
  );

  /**
   * Handles the form submission event for editing a task.
   *
   * @param {FormEvent} e - The form submission event.
   * @return {Promise<void>} A promise that resolves when the task is edited
   * and the page is refreshed.
   */
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent
  ): Promise<void> => {
    e.preventDefault();

    // Create a new task object with the edited values
    const editedTask: ITask = {
      _id: task._id,
      title: titleToEdit,
      description: descriptionToEdit,
      category: categoryToEdit,
      completed: completedToEdit,
      due_date: due_dateToEdit,
      owner: task.owner,
    };

    // Call the editTask API function with the edited task object and the user's token
    e.preventDefault();
    await editTask(editedTask, `${localStorage.getItem("token")}`);

    // Close the edit modal
    setOpenModalEdit(false);

    // Refresh the page to see the updated task
    router.refresh();
  };

  /**
   * Handles the deletion of a task.
   *
   * @param {string} id - The ID of the task to be deleted.
   * @return {Promise<void>} A promise that resolves when the task is deleted
   * and the page is refreshed.
   */
  const handleDeleteTask = async (id: string): Promise<void> => {
    // Call the deleteTask API function with the task ID and the user's token.
    await deleteTask(id, `${localStorage.getItem("token")}`);

    // Close the delete modal.
    setOpenModalDeleted(false);

    // Refresh the page to see the updated list of tasks.
    router.refresh();
  };

  return (
    <tr key={task._id}>
      <td className="w-full">{task.title}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="text-center my-5 flex flex-col gap-4">
              <input
                value={titleToEdit}
                onChange={(e) => setTitleToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <input
                value={descriptionToEdit}
                onChange={(e) => setDescriptionToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <input
                value={categoryToEdit}
                onChange={(e) => setCategoryToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <input
                value={`${due_dateToEdit}`}
                onChange={(e) => setDueDateToEdit(e.target.value)}
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <p>{task.title}</p>
          <p>{task.category}</p>
          <p>{task.completed}</p>
          <p>{task.description}</p>
          <p>{task.due_date.toString()}</p>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task._id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
