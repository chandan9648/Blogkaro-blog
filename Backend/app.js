import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['https://blogkarozilla.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


// Routes
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/admin', adminRoutes);

export default app;
