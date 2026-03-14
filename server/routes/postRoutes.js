import express from 'express';
import protect from '../middleware/auth.js';
import {
  createPost,
  getPosts,
  getPostById,  
  updatePost,   
  deletePost
} from '../controllers/postController.js';

const postRoutes = (io) => {
  const router = express.Router();

  router.route('/')
    .post(protect, createPost(io))
    .get(protect, getPosts);

  router.route('/:id')
    .get(protect, getPostById)
    .put(protect, updatePost)
    .delete(protect, deletePost);

  return router;
};

export default postRoutes;