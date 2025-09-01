import React from 'react';
import { toast } from 'react-hot-toast';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, _id } = blog;
  const { axios } = useAppContext();

  const formattedDate = new Date(createdAt).toDateString();

  const deleteBlog = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm) return;
    try {
      const { data } = await axios.delete(`/api/admin/blogs/${_id}`);
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Delete failed: ' + error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{formattedDate}</td>
      <td className="px-2 py-4 flex items-center">
        <img
          src={assets.cross_icon}
          className="w-5 cursor-pointer hover:scale-110 transition"
          alt="delete"
          onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
