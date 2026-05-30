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
      <Link to="/" style={s.brand}>🪶 Quill</Link>
      <div style={s.links}>
        <button onClick={toggleTheme} style={s.themeBtn}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {user ? (
          <>
            <span style={s.welcome}>Hello, {user.name}</span>
            <Link to="/create" style={s.btn}>New Post</Link>
            <button onClick={handleLogout} style={s.ghost}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={s.ghost}>Login</Link>
            <Link to="/register" style={s.btn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = (theme) => ({
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.2rem 3rem',
    backgroundColor: 'var(--bg2)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    color: 'var(--brand)',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  welcome: {
    fontSize: '0.9rem',
    color: 'var(--muted)',
  },
  btn: {
    backgroundColor: 'var(--brand)',
    color: 'var(--btnText)',
    padding: '0.5rem 1.2rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  ghost: {
    backgroundColor: 'transparent',
    border: '1px solid var(--brand)',
    color: 'var(--brand)',
    padding: '0.5rem 1.2rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  themeBtn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '0.4rem 0.7rem',
    fontSize: '1rem',
  },
});