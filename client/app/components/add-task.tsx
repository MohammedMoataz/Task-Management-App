"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./modal";
import { FormEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { addTask } from "@/app/api/api";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [due_date, setDueDate] = useState<Date | string>("");

  /**
   * Submit new todo handler
   * @param {FormEvent<HTMLFormElement>} e - The form event
   * @return {Promise<void>} - A promise that resolves when the function is complete
   */
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Create a new task
    await addTask(
      {
        _id: "",
        title,
        description,
        category,
        completed: false,
        due_date,
        owner: "66abf260ab73f99a5c7232b4",
      },
      `${localStorage.getItem("token")}`
    );

    // Reset the form fields
    setTitle("");
    setDescription("");
    setCategory("");
    setDueDate("");

    // Close the modal
    setModalOpen(false);

    // Refresh the page
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action flex flex-col space-y-4 items-center">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              className="input input-bordered w-full"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="Work, Personal, or Shopping"
              className="input input-bordered w-full"
            />
            <input
              value={`${due_date}`}
              onChange={(e) => setDueDate(e.target.value)}
              type="date"
              placeholder="mm-dd-yyyy"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
