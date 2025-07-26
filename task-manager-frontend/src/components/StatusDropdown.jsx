import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const StatusDropdown = ({ filter, setFilter }) => {
  const [open, setOpen] = useState(false)

  const options = [
    { label: "All Tasks", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" }
  ]

  const handleSelect = (value) => {
    setFilter(value)
    setOpen(false)
  }

  return (
    <div className="relative w-52">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full h-10 bg-white border border-gray-300 rounded-lg px-4 shadow-sm text-gray-700 hover:border-gray-400 transition"
      >
        <span>{options.find(opt => opt.value === filter).label}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                  filter === opt.value ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StatusDropdown
