import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EquipmentList from './pages/EquipmentList';
import EquipmentForm from './pages/EquipmentForm';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/equipment" element={
            <PrivateRoute>
              <EquipmentList />
            </PrivateRoute>
          } />
          <Route path="/equipment/new" element={
            <PrivateRoute>
              <EquipmentForm />
            </PrivateRoute>
          } />
          <Route path="/equipment/:id" element={
            <PrivateRoute>
              <EquipmentForm />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;