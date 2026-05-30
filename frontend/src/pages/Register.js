import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('https://quill-backend-dd8q.onrender.com/api/auth/register', form, { withCredentials: true });
    const res = await axios.post('https://quill-backend-dd8q.onrender.com/api/auth/login', {
      email: form.email,
      password: form.password
    }, { withCredentials: true });
    const userData = { name: res.data.name, userId: res.data.userId };
    localStorage.setItem('user', JSON.stringify(userData));
    login(userData);
    navigate('/');
  } catch (err) {
    setError(err.response?.data?.error || 'Something went wrong');
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an account</h2>
        <p style={styles.sub}>Join the journal community</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.btn}>Create Account</button>
        </form>
        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    backgroundColor: 'var(--bg2)',
    padding: '3rem',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid var(--border)',
  },
  title: { fontSize: '1.8rem', color: 'var(--brand)', marginBottom: '0.3rem' },
  sub: { color: 'var(--muted)', marginBottom: '2rem' },
  error: { color: '#c0392b', marginBottom: '1rem', fontSize: '0.9rem' },
  field: { marginBottom: '1.2rem' },
  label: { display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--text2)' },
  input: {
    width: '100%',
    padding: '0.7rem 1rem',
    borderRadius: '4px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg)',
    fontSize: '1rem',
    color: 'var(--text)',
    outline: 'none',
  },
  btn: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: 'var(--brand)',
    color: 'var(--btnText)',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    marginTop: '0.5rem',
  },
  footer: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--muted)' },
  link: { color: 'var(--brand)', borderBottom: '1px solid var(--brand)' },
};