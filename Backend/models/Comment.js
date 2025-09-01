import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blog',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  },
  name: String,
  content: String,
}, { timestamps: true });

const Comment = mongoose.model('comment', commentSchema);
export default Comment;
