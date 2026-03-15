import express from 'express';
import {
  registerUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.get('/me', protect, getCurrentUser);
router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;