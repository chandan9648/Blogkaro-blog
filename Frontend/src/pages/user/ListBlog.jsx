import React, { useCallback, useState, useEffect } from 'react';
import BlogTableItem from '../../components/user/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = useCallback(async () => {
    try {
          const { data } = await axios.get('/api/blog/blogs', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className='flex-1 bg-gradient-to-b from-blue-50/60 to-indigo-50/30 pt-5 sm:pt-10'>
      <div className='mx-4 sm:mx-8 lg:mx-16'>
        <h1 className='text-lg sm:text-xl font-semibold text-gray-800'>My Blogs</h1>
        <div className='relative mt-3 w-full max-w-5xl overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm'>
          <table className='w-full text-sm text-gray-600'>
            <thead className='sticky top-0 z-[1] bg-white/80 backdrop-blur text-xs uppercase'>
              <tr className='text-left'>
                <th className='px-3 py-4 xl:px-6'>#</th>
                <th className='px-3 py-4'>Blog Title</th>
                <th className='px-3 py-4 max-sm:hidden'>Date</th>
                <th className='px-3 py-4 max-sm:hidden'>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className='px-4 py-10 text-center text-gray-400'>No blogs yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
