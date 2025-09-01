import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

export const getAdminDashboardData = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const comments = await Comment.find();
    const drafts = blogs.filter((blog) => blog.status === 'draft').length;

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboardData: {
        blogs: blogs.length,
        comments: comments.length,
        drafts,
        recentBlogs,
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: err.message,
    });
  }
};

// Toggle publish/unpublish
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

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed', error: err.message });
  }
};

// ✅ Get all non-admin users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // remove { role: 'user' }
    res.json({ success: true, users });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};



// ✅ Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role === 'admin') {
      return res.status(404).json({ success: false, message: 'User not found or not deletable' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete user', error });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email') // Optional: show author info
      .sort({ createdAt: -1 });         // Most recent first

    res.json({ success: true, blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('blog', 'title')
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).json({ success: false, message: 'Missing comment ID' });

    await Comment.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Delete Comment Error:', err);
    res.status(500).json({ success: false, message: 'Server error while deleting comment' });
  }
};