import express from 'express';
import protect from '../middleware/auth.js';
import {
  createPost,
  getPosts,
  getPostById,  
  updatePost,   
  deletePost
} from '../controllers/postController.js';

const router = express.Router();

router.route('/')
  .post(protect, createPost)
  .get(protect, getPosts);

router.route('/:id')
  .get(protect, getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;