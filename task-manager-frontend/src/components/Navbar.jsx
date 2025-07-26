import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/add-task" className="hover:text-gray-300">Add Task</Link>
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Links */}
      {open && (
        <div className="md:hidden flex flex-col mt-3 space-y-3 px-2 pb-3">
          <Link onClick={() => setOpen(false)} to="/" className="hover:text-gray-300">Dashboard</Link>
          <Link onClick={() => setOpen(false)} to="/add-task" className="hover:text-gray-300">Add Task</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
