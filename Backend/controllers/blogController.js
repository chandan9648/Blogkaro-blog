import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinary.js';
import Comment from '../models/Comment.js';
import mongoose from 'mongoose';
import main from '../config/gamini.js';


export const addBlog = async (req, res) => {
  try {
    const { blog } = req.body;
    const parsedBlog = JSON.parse(blog);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const uploadRes = await cloudinary.uploader.upload(req.file.path, {
      folder: 'blog_thumbnails',
    });

    const newBlog = new Blog({
      ...parsedBlog,
      imageUrl: uploadRes.secure_url,
      author: req.user._id  // ✅ Save user as author
    });

    await newBlog.save();

    res.json({ success: true, message: "Blog added successfully", blog: newBlog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const generateContent = async (req, res) =>{
  try {
    const { prompt } = req.body;
    const content = await main ( prompt + 'Generate a blog content for this topic in simple text format ') 
    res.json({success: true, content})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}
    

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email'); // Must match lowercase 'user'

    console.log(' Total blogs:', blogs.length);

    blogs.forEach(b => {
      console.log(` Blog: ${b.title} | Author: ${b.author?.name || ' Not Populated'}`);
    });

    res.json({ success: true, blogs });
  } catch (error) {
    console.error(' Error fetching blogs:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


//Get blogs created by the logged-in user
export const getUserBlogs = async (req, res) => {
  try {
    const userId = req.user._id; // or req.user.id (depending on authMiddleware)
    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      blogs
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user blogs'
    });
  }
};

// Get single blog
export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: 'Invalid blog ID' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const comments = await Comment.find({ blog: blogId }).populate('user', 'name'); // or 'author'

    res.json({ success: true, blog, comments });
  } catch (err) {
    console.error('Error fetching blog:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Optional: ensure only blog owner or admin can delete
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You can only delete your own blogs' });
    }

    await blog.deleteOne();

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.status = blog.status === 'published' ? 'draft' : 'published';
    await blog.save();

    res.json({ success: true, message: `Blog ${blog.status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Toggle failed', error: err.message });
  }
};
