import { motion } from "framer-motion"
import { Pencil, Trash } from "lucide-react"

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-md p-5 border border-gray-200 flex flex-col justify-between hover:scale-[1.01] transition-all duration-200"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>

      <div className="flex justify-between items-center text-sm mb-2">
        <span className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        <span
          className={`px-2 py-1 rounded text-xs font-bold ${
            task.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
        >
          <Pencil size={14} className="mr-1" /> Edit
        </button>
        <button
          onClick={() => onDelete(task)}
          className="flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
        >
          <Trash size={14} className="mr-1" /> Delete
        </button>
      </div>
    </motion.div>
  )
}

export default TaskCard
