import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"

const SearchBar = ({ query, setQuery }) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative w-full max-w-xs">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:border-gray-400 transition">
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search tasks..."
          className="w-full outline-none text-sm text-gray-700"
        />
        {query && (
          <button onClick={() => setQuery("")}>
            <X size={16} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1 text-xs text-gray-500"
          >
            Type to search by title
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar
