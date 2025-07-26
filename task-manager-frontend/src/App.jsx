import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const { token } = useAppContext();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
  <Toaster position="top-center" reverseOrder={false} />
    <Router>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AppProvider>
    </Router>
    </>
  );
};

export default App;
