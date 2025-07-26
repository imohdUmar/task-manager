const Task = require('../models/Task')

// @desc    Create new task
// @route   POST /api/tasks/
// @access  Public
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body

    const newTask = await Task.create({
      title,
      description,
      dueDate
    })

    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// @desc    Get all tasks
// @route   GET /api/tasks/
// @access  Public

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })  // latest task first
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Public

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update task by ID
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // update fields
    task.title = req.body.title || task.title
    task.description = req.body.description || task.description
    task.status = req.body.status || task.status
    task.dueDate = req.body.dueDate || task.dueDate

    const updatedTask = await task.save()

    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete task by ID
// @route   DELETE /api/tasks/:id
// @access  Public

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    await task.deleteOne()

    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
}
