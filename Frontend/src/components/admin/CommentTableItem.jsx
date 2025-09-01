import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments, index }) => {
  const { blog, createdAt, _id, name, content, user } = comment;
  const blogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteComment = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
      data.success ? toast.success(data.message) : toast.error(data.message);
      fetchComments();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Safe fallbacks
  const blogTitle = blog?.title || 'Deleted Blog';
  const commenterName = name || user?.name || 'Unknown';

  return (
    <tr className='border-y border-gray-300 text-sm'>
      <td className='px-2 py-4 xl:px-6'>{index}</td>

      <td className='px-6 py-4'>
        <p><b className='text-gray-600'>Blog:</b> {blogTitle}</p>
        <p><b className='text-gray-600'>Name:</b> {commenterName}</p>
        <p><b className='text-gray-600'>Comment:</b> {content}</p>
      </td>

      <td className='px-6 py-4 max-sm:hidden'>
        {blogDate.toLocaleDateString()}
      </td>

      <td className='px-6 py-4'>
        <div className='flex items-center gap-2'>
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
