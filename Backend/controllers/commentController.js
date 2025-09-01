// controllers/commentController.js
import Comment from '../models/Comment.js';
import Blog from '../models/Blog.js';
import mongoose from 'mongoose';

export const addComment = async (req, res) => {
  try {
    const { blog, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(blog)) {
      return res.status(400).json({ success: false, message: 'Invalid blog ID' });
    }

    if (!content) {
      return res.status(400).json({ success: false, message: 'Comment content is required' });
    }

    const blogExists = await Blog.findById(blog);
    if (!blogExists) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const newComment = new Comment({
      blog,
      content,
      user: req.user._id,
      name: req.user.name, // Optional, but good for fallback display
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment,
    });

  } catch (err) {
    console.error('Error adding comment:', err.message);
    res.status(500).json({ success: false, message: 'Server error while adding comment' });
  }
};

export const getCommentsForBlog = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: 'Invalid blog ID' });
    }

const comments = await Comment.find({ blog: blogId })
// ✅ filter by approval
  .sort({ createdAt: -1 })
  .populate('user', 'name');
// Populate user name if available

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    console.error('Error fetching comments:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching comments' });
  }
};

export const getUserComments = async (req, res) => {
  try {
    const userId = req.user._id;

    const comments = await Comment.find({ user: userId })
      .populate('blog', 'title')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching user comments:", error);
    res.status(500).json({ success: false, message: "Failed to fetch comments" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ success: false, message: 'Invalid comment ID' });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // ✅ FIX: convert both ObjectIds to strings before comparing
    if (!comment.user || (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err.message);
    res.status(500).json({ success: false, message: 'Server error while deleting comment' });
  }
};


// controllers/commentController.js
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'name')
      .populate('blog', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (err) {
    console.error('Error fetching all comments:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching comments' });
  }
};



