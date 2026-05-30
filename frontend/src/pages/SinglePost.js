import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://quill-backend-dd8q.onrender.com/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`https://quill-backend-dd8q.onrender.com/api/posts/${id}`, { withCredentials: true });
      navigate('/');
    } catch (err) {
      alert('Could not delete post');
    }
  };

  if (loading) return <div style={styles.center}>Loading...</div>;
  if (!post) return null;

  const isAuthor = user && user.name === post.author.name;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.back}>← Back to all posts</Link>
      <article style={styles.article}>
        <p style={styles.author}>{post.author.name}</p>
        <h1 style={styles.title}>{post.title}</h1>
        <p style={styles.date}>
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>
        <div style={styles.divider} />
        <p style={styles.content}>{post.content}</p>
        {isAuthor && (
          <div style={styles.authorActions}>
            <button onClick={() => navigate(`/edit/${post.id}`)} style={styles.editBtn}>Edit Post</button>
            <button onClick={handleDelete} style={styles.deleteBtn}>Delete Post</button>
          </div>
        )}
      </article>
    </div>
  );
}

const styles = {
  container: { maxWidth: '750px', margin: '0 auto', padding: '3rem 2rem' },
  back: { color: 'var(--muted)', fontSize: '0.9rem', display: 'inline-block', marginBottom: '2rem' },
  article: {
    backgroundColor: 'var(--bg2)',
    padding: '3rem',
    borderRadius: '8px',
    border: '1px solid var(--border)',
  },
  author: {
    fontSize: '0.8rem',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.8rem',
  },
  title: { fontSize: '2rem', color: 'var(--brand)', marginBottom: '0.5rem', lineHeight: '1.3' },
  date: { fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem' },
  divider: { borderTop: '1px solid var(--border)', marginBottom: '1.5rem' },
  content: { fontSize: '1.05rem', color: 'var(--text)', lineHeight: '1.9', whiteSpace: 'pre-wrap' },
  authorActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  editBtn: {
    padding: '0.6rem 1.5rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--brand)',
    color: 'var(--brand)',
    borderRadius: '4px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '0.6rem 1.5rem',
    backgroundColor: 'transparent',
    border: '1px solid #c0392b',
    color: '#c0392b',
    borderRadius: '4px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  center: { textAlign: 'center', padding: '4rem', color: 'var(--muted)' },
};