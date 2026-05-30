import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://quill-backend-dd8q.onrender.com/api/posts', form, { withCredentials: true });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Write a new post</h2>
        <p style={styles.sub}>Share your thoughts with the world</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              style={styles.input}
              placeholder="Give your post a title..."
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Write your story..."
              rows={12}
              required
            />
          </div>
          <div style={styles.actions}>
            <button type="button" onClick={() => navigate('/')} style={styles.ghost}>Cancel</button>
            <button type="submit" style={styles.btn}>Publish Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '750px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  card: {
    backgroundColor: 'var(--bg2)',
    padding: '3rem',
    borderRadius: '8px',
    border: '1px solid var(--border)',
  },
  title: { fontSize: '1.8rem', color: 'var(--brand)', marginBottom: '0.3rem' },
  sub: { color: 'var(--muted)', marginBottom: '2rem' },
  error: { color: '#c0392b', marginBottom: '1rem', fontSize: '0.9rem' },
  field: { marginBottom: '1.5rem' },
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
  textarea: {
    width: '100%',
    padding: '0.7rem 1rem',
    borderRadius: '4px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg)',
    fontSize: '1rem',
    color: 'var(--text)',
    outline: 'none',
    resize: 'vertical',
    lineHeight: '1.7',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
  },
  btn: {
    padding: '0.8rem 2rem',
    backgroundColor: 'var(--brand)',
    color: 'var(--btnText)',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  ghost: {
    padding: '0.8rem 2rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--brand)',
    color: 'var(--brand)',
    borderRadius: '4px',
    fontSize: '1rem',
  },
};