import { Request, Response } from 'express';
import BlogPost, { IBlogPost } from '../models/BlogPost';

export const getBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      featured, 
      tag, 
      published = 'true' 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const filter: any = {};

    if (published === 'true') {
      filter.published = true;
    }
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (tag) {
      filter.tags = { $in: [tag] };
    }

    const posts = await BlogPost.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-content -__v');

    const total = await BlogPost.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      data: {
        posts,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / Number(limit)),
          total
        }
      }
    });
  } catch (error: any) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blog posts'
    });
  }
};

export const getBlogPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const post = await BlogPost.findOne({ slug, published: true }).select('-__v');

    if (!post) {
      res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
      return;
    }

    // Increment view count
    await BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

    res.status(200).json({
      status: 'success',
      data: post
    });
  } catch (error: any) {
    console.error('Get blog post by slug error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blog post'
    });
  }
};

export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postData = req.body;
    const post = new BlogPost(postData);
    await post.save();

    res.status(201).json({
      status: 'success',
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error: any) {
    console.error('Create blog post error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to create blog post'
    });
  }
};

export const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const post = await BlogPost.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!post) {
      res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error: any) {
    console.error('Update blog post error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to update blog post'
    });
  }
};

export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Blog post deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete blog post'
    });
  }
};

export const likeBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    ).select('likes');

    if (!post) {
      res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Post liked successfully',
      data: { likes: post.likes }
    });
  } catch (error: any) {
    console.error('Like blog post error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to like blog post'
    });
  }
};
