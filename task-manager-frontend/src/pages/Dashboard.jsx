import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { axios } = useAppContext();

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({ title: '', description: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editInput, setEditInput] = useState({ title: '', description: '' });

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setTaskInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/tasks', taskInput);
      toast.success('Task added');
      setTaskInput({ title: '', description: '' });
      setTasks(prev => [res.data, ...prev]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add task');
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditInput({ title: task.title, description: task.description });
  };

  const handleEditChange = (e) => {
    setEditInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveEdit = async () => {
    try {
      const res = await axios.put(`/api/tasks/${editingTaskId}`, editInput);
      setTasks(prev =>
        prev.map(task => task._id === editingTaskId ? res.data : task)
      );
      setEditingTaskId(null);
      toast.success('Task updated');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const markCompleted = async (taskId) => {
    try {
      const res = await axios.put(`/api/tasks/${taskId}`, { status: 'completed' });
      setTasks(prev =>
        prev.map(task => task._id === taskId ? res.data : task)
      );
      toast.success('Marked as completed');
    } catch (error) {
      toast.error('Failed to mark completed');
    }
  };

  const filteredTasks = tasks
    .filter(task => {
      if (statusFilter === 'completed') return task.status === 'completed';
      if (statusFilter === 'pending') return task.status !== 'completed';
      return true;
    })
    .filter(task => {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      return sortOrder === 'latest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="p-2 border rounded flex-1"
        />

        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={taskInput.title}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={taskInput.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      {/* Show Tasks */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded shadow">
            {editingTaskId === task._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editInput.title}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  name="description"
                  value={editInput.description}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <button
                  onClick={saveEdit}
                  className="mr-2 text-sm bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTaskId(null)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <h2 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h2>
                  {task.status !== 'completed' && (
                    <button
                      onClick={() => markCompleted(task._id)}
                      className="text-xs bg-green-100 px-2 py-1 rounded text-green-800"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-700">{task.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(task.createdAt).toLocaleString()}
                </p>
                <div className="mt-2 flex gap-3 text-sm">
                  <button
                    onClick={() => startEditing(task)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
