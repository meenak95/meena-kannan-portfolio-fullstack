import express from 'express';
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController';

const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', getProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', getProjectById);

// POST /api/projects - Create new project (admin only)
router.post('/', createProject);

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', deleteProject);

export default router;
