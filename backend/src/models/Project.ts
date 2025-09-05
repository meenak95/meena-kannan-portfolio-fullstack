import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: [2000, 'Long description cannot exceed 2000 characters']
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  liveUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  githubUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'other'],
    default: 'web'
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
ProjectSchema.index({ featured: 1, status: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ technologies: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
