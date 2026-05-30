import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://quill-backend-dd8q.onrender.com/api/posts/${id}`)
      .then(res => setForm({ title: res.data.title, content: res.data.content }))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://quill-backend-dd8q.onrender.com/api/posts/${id}`, form, { withCredentials: true });
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  if (loading) return <div style={styles.center}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Edit your post</h2>
        <p style={styles.sub}>Make your changes below</p>
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
              rows={12}
              required
            />
          </div>
          <div style={styles.actions}>
            <button type="button" onClick={() => navigate(`/post/${id}`)} style={styles.ghost}>Cancel</button>
            <button type="submit" style={styles.btn}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '750px', margin: '0 auto', padding: '3rem 2rem' },
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
    flexDirection: 'column',
    gap: '0.8rem',
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
  center: { textAlign: 'center', padding: '4rem', color: 'var(--muted)' },
};