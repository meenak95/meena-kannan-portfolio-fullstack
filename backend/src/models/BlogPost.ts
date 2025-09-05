import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt?: Date;
  readTime: number; // in minutes
  views: number;
  likes: number;
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    default: 'Meena Kannan'
  },
  tags: [{
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  readTime: {
    type: Number,
    required: [true, 'Read time is required'],
    min: [1, 'Read time must be at least 1 minute']
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  featuredImage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ published: 1, publishedAt: -1 });
BlogPostSchema.index({ featured: 1, published: 1 });
BlogPostSchema.index({ tags: 1 });

// Pre-save middleware to set publishedAt when published is true
BlogPostSchema.pre('save', function(next) {
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
