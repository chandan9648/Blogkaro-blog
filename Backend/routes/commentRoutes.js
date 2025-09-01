import express from 'express';
import { getCommentsForBlog, addComment, getUserComments, deleteComment,  getAllComments } from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-comment',authMiddleware, addComment);
router.get('/all', authMiddleware, getAllComments); 
router.post('/comments', getCommentsForBlog);
router.get('/my-comments', authMiddleware, getUserComments);
router.delete('/delete/:id', authMiddleware, deleteComment);


export default router;

