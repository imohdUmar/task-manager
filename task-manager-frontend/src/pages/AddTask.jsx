"use client";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
        dueDate,
        status,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto mt-20 bg-white rounded-3xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Add New Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-gray-700 font-medium mb-1 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            className="w-full rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium mb-1 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task details"
            required
            rows="3"
            className="w-full rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium mb-1 block">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium mb-1 block">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-2xl shadow-md hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>
    </motion.div>
  );
};

export default AddTask;
