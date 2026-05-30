import EditPost from './pages/EditPost';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/create" element={
            <ProtectedRoute><CreatePost /></ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
  <ProtectedRoute><EditPost /></ProtectedRoute>
} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;