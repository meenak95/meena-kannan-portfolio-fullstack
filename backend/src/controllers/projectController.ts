import { Request, Response } from 'express';
import Project, { IProject } from '../models/Project';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      featured, 
      category, 
      status, 
      technology 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const filter: any = {};

    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (category) {
      filter.category = category;
    }
    if (status) {
      filter.status = status;
    }
    if (technology) {
      filter.technologies = { $in: [technology] };
    }

    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Project.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      data: {
        projects,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / Number(limit)),
          total
        }
      }
    });
  } catch (error: any) {
    console.error('Get projects error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch projects'
    });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).select('-__v');

    if (!project) {
      res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: project
    });
  } catch (error: any) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch project'
    });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectData = req.body;
    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      data: project
    });
  } catch (error: any) {
    console.error('Create project error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to create project'
    });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!project) {
      res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Project updated successfully',
      data: project
    });
  } catch (error: any) {
    console.error('Update project error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to update project'
    });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete project error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete project'
    });
  }
};
