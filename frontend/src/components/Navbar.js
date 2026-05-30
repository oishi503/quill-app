import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const s = styles(theme);

  return (
  <nav style={s.nav}>
    <Link to="/" style={s.brand}>🪶</Link>
    <div style={s.links}>
      {user ? (
        <>
          <Link to="/create" style={s.btn}>New Post</Link>
          <button onClick={handleLogout} style={s.ghost}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={s.ghost}>Login</Link>
          <Link to="/register" style={s.btn}>Register</Link>
        </>
      )}
      <button onClick={toggleTheme} style={s.themeBtn}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  </nav>
);
}

const styles = (theme) => ({
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    backgroundColor: 'var(--bg2)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  brand: {
    fontSize: '1.5rem',
  },
  themeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '0',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  btn: {
    backgroundColor: 'var(--brand)',
    color: 'var(--btnText)',
    padding: '0.4rem 0.9rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
  },
  ghost: {
    backgroundColor: 'transparent',
    border: '1px solid var(--brand)',
    color: 'var(--brand)',
    padding: '0.4rem 0.9rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
  },
});