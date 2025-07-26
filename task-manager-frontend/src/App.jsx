import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import './App.css'
import EditTask from "./pages/EditTask"
import AddTask from "./pages/AddTask"
import Dashboard from "./pages/Dashboard"

function App() {
 return (
    <>
      <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <div className="p-4">
        <Routes>
          <Route path="/edit-task/:id" element={<EditTask/>}/>
          <Route path="/add-task" element={<AddTask/>}/>
          <Route path="/" element={<Dashboard/>} />
          <Route path="*" element={<h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </div>

    </>
  )
}

export default App
