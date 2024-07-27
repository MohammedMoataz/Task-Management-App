"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./modal";
import { FormEventHandler, useState } from "react";
import { addTask } from "@/api";
import { useRouter } from "next/navigation";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [due_date, setDueDate] = useState<Date | string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTask({
      _id: "",
      title,
      description,
      category,
      completed: false,
      due_date,
      owner: "66a2d7730f3068f99be8937d",
    });
    setTitle("");
    setDescription("");
    setCategory("");
    setDueDate("");
    setModalOpen(false);
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
          <div className="modal-action">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Type here"
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
