import express from 'express';
import multer from 'multer';
import path from 'path';
import { addBlog, generateContent, getUserBlogs, getAllBlogs, getBlogById, deleteBlog } from '../controllers/blogController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


router.post('/add', authMiddleware, upload.single('image'), addBlog);
router.post('/generate', authMiddleware, generateContent);
router.get('/blogs' , authMiddleware, getUserBlogs);
router.get('/all' , getAllBlogs );
router.get('/:id' ,  getBlogById);
router.delete('/delete/:id', authMiddleware, deleteBlog);

export default router;
