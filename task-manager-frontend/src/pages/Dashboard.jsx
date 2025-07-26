import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import axios from "axios"
import TaskCard from "../components/TaskCard"
import { useNavigate } from "react-router-dom"
import StatusDropdown from "../components/StatusDropdown"
import SearchBar from "../components/SearchBar"
import SortDropdown from "../components/SortDropdown"

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [query, setQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("none")

  const navigate = useNavigate()

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks")
      setTasks(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTask = (task) => {
    setTaskToDelete(task)
    setIsDeleteOpen(true)
  }

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskToDelete._id}`)
      fetchTasks()
      setIsDeleteOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  const editTask = (task) => {
    navigate(`/edit-task/${task._id}`)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Search + Filter
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter === "all" ? true : task.status === filter
    const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase())
    return matchesStatus && matchesQuery
  })

  // Sort by Due Date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.dueDate) - new Date(b.dueDate)
    } else if (sortOrder === "desc") {
      return new Date(b.dueDate) - new Date(a.dueDate)
    } else {
      return 0
    }
  })

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>

        <div className="flex items-center gap-3">
          <SearchBar query={query} setQuery={setQuery} />

          {/* Sort Dropdown */}
           <div className="relative inline-block w-52">
                <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>

          {/* Status Filter Dropdown */}
          <div className="relative inline-block w-52">
            <StatusDropdown filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this task?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={confirmDeleteTask}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Dashboard
