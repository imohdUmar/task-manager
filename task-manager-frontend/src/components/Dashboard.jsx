import { useEffect, useState } from "react"
import axios from "axios"
import TaskCard from "../components/TaskCard"

const Dashboard = () => {
  const [tasks, setTasks] = useState([])

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks")
      setTasks(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`)
      fetchTasks()
    } catch (err) {
      console.error(err)
    }
  }

  // Edit task (redirect to edit page)
  const editTask = (task) => {
    // We'll build this later
    console.log("Edit Task:", task)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        tasks.map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
            onDelete={deleteTask} 
            onEdit={editTask} 
          />
        ))
      )}
    </div>
  )
}

export default Dashboard
