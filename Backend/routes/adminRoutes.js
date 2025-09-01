// routes/adminRoutes.js
import express from 'express';
import { getAdminDashboardData,   deleteBlog,
  togglePublish, getAllUsers, deleteUser, getAllBlogs,  getAllComments, deleteComment } from '../controllers/adminController.js';

const router = express.Router();

router.get('/dashboard', getAdminDashboardData);
router.delete('/blogs/:id', deleteBlog);
router.patch('/blogs/:id/toggle-publish', togglePublish);
router.get('/users',  getAllUsers);
router.delete('/users/:id',  deleteUser);
router.get('/blogs', getAllBlogs); 
router.get('/comments',  getAllComments);
router.post('/delete-comment', deleteComment);



export default router;
