import React from 'react';
import { toast } from 'react-hot-toast';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, _id } = blog;
  const formattedDate = new Date(createdAt).toDateString();

  const { axios } = useAppContext();

 const deleteBlog = async () => {
  if (!window.confirm('Are you sure you want to delete this blog?')) return;

  try {
    const { data } = await axios.delete(`/api/blog/delete/${_id}`);
    data.success ? toast.success(data.message) : toast.error(data.message);
    if (data.success) await fetchBlogs();
  } catch (error) {
    toast.error(error.message || 'Error deleting blog');
  }
};


  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{formattedDate}</td>
      <td className="px-2 py-4 flex text-xs gap-3 items-center">
        <img
          src={assets.cross_icon}
          className="w-5 h-5 hover:scale-110 transition-all cursor-pointer"
          alt="Delete"
          onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
