import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

 useEffect(() => {
  const stored = localStorage.getItem('user');
  if (stored) {
    setUser(JSON.parse(stored));
  }
  setLoading(false);
}, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
  axios.post('https://quill-backend-dd8q.onrender.com/api/auth/logout', {}, { withCredentials: true });
  localStorage.removeItem('user');
  setUser(null);
};
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);