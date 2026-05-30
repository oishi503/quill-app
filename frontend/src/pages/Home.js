import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    axios.get('https://quill-backend-dd8q.onrender.com/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={styles.center}>Loading...</div>;

  return (
    <div>
      <div style={styles.hero}>
        <p style={styles.eyebrow}>✦ Write. Share. Remember.</p>
        <h1 style={styles.heroTitle}>🪶 Quill</h1>
        <p style={styles.heroSub}>
          A quiet corner of the internet where people share stories,<br />
          reflections, and little moments worth remembering.
        </p>
        {user ? (
          <div style={styles.heroActions}>
            <p style={styles.heroWelcome}>Welcome back, {user.name} — what's on your mind today?</p>
            <Link to="/create" style={styles.heroBtn}>Write something →</Link>
          </div>
        ) : (
          <div style={styles.heroActions}>
            <p style={styles.heroWelcome}>Everyone has a story worth telling. What's yours?</p>
            <Link to="/register" style={styles.heroBtn}>Start writing →</Link>
          </div>
        )}
      </div>

      <div style={styles.container}>
        {posts.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyTitle}>The pages are empty... for now.</p>
            <p style={styles.emptyText}>Be the first to leave a mark. Write something honest, something small, something yours.</p>
            <Link to={user ? "/create" : "/register"} style={styles.emptyLink}>
              {user ? "Write the first post →" : "Join and write →"}
            </Link>
          </div>
        ) : (
          <>
            <p style={styles.sectionLabel}>Recent stories</p>
            <div style={styles.grid}>
              {posts.map(post => (
                <Link
                  to={`/post/${post.id}`}
                  key={post.id}
                  style={{
                    ...styles.card,
                   transform: hoveredId === post.id
  ? 'translateY(-8px)'
  : 'translateY(0)',
                    boxShadow: hoveredId === post.id
                      ? '8px 16px 40px rgba(0,0,0,0.18)'
                      : '2px 4px 12px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={() => setHoveredId(post.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div style={styles.cardInner}>
                    <p style={styles.author}>{post.author.name}</p>
                    <h2 style={styles.title}>{post.title}</h2>
                    <p style={styles.excerpt}>
                      {post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content}
                    </p>
                    <p style={styles.date}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <footer style={styles.footer}>
        <p>Made with warmth · 🪶 Quill · A place for everyone's story</p>
      </footer>
    </div>
  );
}

const styles = {
  hero: {
    textAlign: 'center',
    padding: '5rem 2rem 4rem',
    backgroundColor: 'var(--bg2)',
    borderBottom: '1px solid var(--border)',
  },
  eyebrow: {
    fontSize: '0.85rem',
    letterSpacing: '0.12em',
    color: 'var(--muted)',
    marginBottom: '1rem',
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: '3.5rem',
    color: 'var(--brand)',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },
  heroSub: {
    color: 'var(--text2)',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: '2rem',
  },
  heroActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  heroWelcome: {
    color: 'var(--muted)',
    fontSize: '0.95rem',
    fontStyle: 'italic',
  },
  heroBtn: {
    display: 'inline-block',
    backgroundColor: 'var(--brand)',
    color: 'var(--btnText)',
    padding: '0.7rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  sectionLabel: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--muted)',
    marginBottom: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: 'var(--bg2)',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid var(--border)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    textDecoration: 'none',
  },
  cardInner: { padding: '1.8rem' },
  author: {
    fontSize: '0.8rem',
    color: 'var(--muted)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  title: { fontSize: '1.3rem', color: 'var(--text)', marginBottom: '0.8rem', lineHeight: '1.4' },
  excerpt: { fontSize: '0.95rem', color: 'var(--text2)', marginBottom: '1.2rem' },
  date: { fontSize: '0.8rem', color: 'var(--muted)' },
  center: { textAlign: 'center', padding: '4rem', color: 'var(--muted)' },
  empty: {
    textAlign: 'center',
    padding: '5rem 2rem',
    color: 'var(--muted)',
  },
  emptyTitle: {
    fontSize: '1.3rem',
    color: 'var(--text)',
    marginBottom: '0.8rem',
    fontStyle: 'italic',
  },
  emptyText: {
    fontSize: '0.95rem',
    color: 'var(--text2)',
    marginBottom: '1.5rem',
    lineHeight: '1.8',
  },
  emptyLink: {
    display: 'inline-block',
    color: 'var(--brand)',
    borderBottom: '1px solid var(--brand)',
    fontSize: '0.95rem',
  },
  footer: {
    textAlign: 'center',
    padding: '2rem',
    borderTop: '1px solid var(--border)',
    color: 'var(--muted)',
    fontSize: '0.85rem',
  },
};