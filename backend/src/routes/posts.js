const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const authMiddleware = require('../middleware/auth');

// GET ALL POSTS (public)
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET SINGLE POST (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { author: { select: { name: true } } }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// CREATE POST (protected)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, authorId: req.user.userId }
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// DELETE POST (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.authorId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// UPDATE POST (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.authorId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const updated = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: { title, content }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;