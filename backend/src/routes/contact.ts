import express from 'express';
import { createContact, getContacts, updateContactStatus } from '../controllers/contactController';

const router = express.Router();

// POST /api/contact - Create new contact message
router.post('/', createContact);

// GET /api/contact - Get all contacts (admin only)
router.get('/', getContacts);

// PATCH /api/contact/:id/status - Update contact status (admin only)
router.patch('/:id/status', updateContactStatus);

export default router;
