import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, content } = comment;
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext();

const deleteComment = async () => {
  try {
    const confirm = window.confirm('Are you sure you want to delete this comment?');
    if (!confirm) return;

    const token = localStorage.getItem("token"); // 🔐 adjust if you're storing it elsewhere

    const { data } = await axios.delete(`/api/comment/delete/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    });

    if (data.success) {
      toast.success(data.message);
      fetchComments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete");
    console.error("Delete comment error:", error);
  }
};



  return (
    <tr className='border-y border-gray-300'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog</b>: {blog?.title || 'Deleted Blog'}
        <br /><br />
        <b className='font-medium text-gray-600'>Comment</b>: {content}
      </td>

      <td className='px-6 py-4 max-sm:hidden'>
        {blogDate.toLocaleDateString()}
      </td>

      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className='w-5 hover:scale-110 transition-all cursor-pointer'
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
