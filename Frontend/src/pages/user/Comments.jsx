import React, { useEffect, useState } from 'react';
import CommentTableItem from '../../components/user/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/comment/my-comments');
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex-1 bg-gradient-to-b from-blue-50/60 to-indigo-50/30 pt-5 sm:pt-10'>
      <div className='mx-4 sm:mx-8 lg:mx-16'>
        <div className='flex items-center justify-between'>
          <h1 className='text-lg sm:text-xl font-semibold text-gray-800'>My Comments</h1>
        </div>

        <div className='relative mt-4 w-full max-w-4xl overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm'>
          <table className='w-full text-sm text-gray-600'>
            <thead className='sticky top-0 z-[1] bg-white/80 backdrop-blur text-xs uppercase'>
              <tr className='text-left'>
                <th scope='col' className='px-4 sm:px-6 py-3'>Blog Title & Comment</th>
                <th scope='col' className='px-4 sm:px-6 py-3 max-sm:hidden'>Date</th>
                <th scope='col' className='px-4 sm:px-6 py-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComments}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-400">No comments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comments;
