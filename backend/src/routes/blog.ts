import express from 'express';
import { 
  getBlogPosts, 
  getBlogPostBySlug, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  likeBlogPost 
} from '../controllers/blogController';

const router = express.Router();

// GET /api/blog - Get all blog posts
router.get('/', getBlogPosts);

// GET /api/blog/:slug - Get blog post by slug
router.get('/:slug', getBlogPostBySlug);

// POST /api/blog - Create new blog post (admin only)
router.post('/', createBlogPost);

// PUT /api/blog/:id - Update blog post (admin only)
router.put('/:id', updateBlogPost);

// DELETE /api/blog/:id - Delete blog post (admin only)
router.delete('/:id', deleteBlogPost);

// POST /api/blog/:id/like - Like a blog post
router.post('/:id/like', likeBlogPost);

export default router;
