import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion } from 'framer-motion'; // ✅ Fixed import
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === '') {
      return blogs;
    }
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  const displayedBlogs = filteredBlogs().filter((blog) =>
    menu === 'All' ? true : blog.category === menu
  );

  return (
    <div>
      {/* Category Filter Menu */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 font-medium px-4 py-1 rounded-full ${
                menu === item && 'text-white bg-primary'
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId='underline'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }} // ✅ Fixed typo: typr → type
                  className='absolute left-0 right-0 top-0 h-full -z-1 bg-primary rounded-full'
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 sm:mx-16 xl:mx-40'>
        {displayedBlogs.length > 0 ? (
          displayedBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
