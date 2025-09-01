import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const { axios, token } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  const fetchBlogData = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios, id]);

  const fetchComments = useCallback(async () => {
    try {
      const { data } = await axios.post('/api/comment/comments', { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios, id]);

  const addComment = async (e) => {
    e.preventDefault();
      if (!token) {
    toast.error('Please login to comment');
    return;
  }
    try {
      const { data } = await axios.post('/api/comment/add-comment', {
        blog: id,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setContent('');
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [fetchBlogData, fetchComments]);

  return data ? (
    <div className='relative'>
      <img
        src={assets.gradientBackground}
        alt=''
        className='pointer-events-none absolute inset-x-0 -top-16 mx-auto w-[900px] max-w-[92%] -z-10 opacity-50'
      />
      <Navbar />

      <div className='text-center mt-16 sm:mt-20 text-gray-600 px-4'>
        <p className='text-primary py-3 font-medium'>
          Published on {Moment(data.createdAt).format('MMMM D YYYY')}
        </p>
        <h1 className='text-3xl sm:text-5xl font-semibold max-w-3xl mx-auto text-gray-800'>
          {data.title}
        </h1>
        <h2 className='my-4 sm:my-5 max-w-2xl mx-auto text-gray-500'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-xs sm:text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          {data.author?.name || 'Unknown Author'}
        </p>
      </div>

  <div className='mx-4 md:mx-auto max-w-5xl xl:max-w-6xl my-10 mt-6 px-0 sm:px-4'>
        <img src={data.imageUrl} alt='' className='rounded-2xl md:rounded-3xl mb-5 w-full object-cover' />

        <div
          className='rich-text max-w-3xl mx-auto prose prose-gray'
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className='mt-14 mb-10 max-w-3xl mx-auto px-1'>
          <p className='font-semibold mb-4'>Comments ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div
                key={item._id || index}
                className='relative bg-white border border-gray-100 p-4 rounded-xl text-gray-700 shadow-sm'
              >
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt='' className='w-6 h-6' />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-400'>
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='max-w-3xl mx-auto px-1'>
          <p className='font-semibold mb-3'>Add your comment</p>
          <form onSubmit={addComment} className='flex flex-col items-start gap-3 max-w-lg'>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder='Comment'
              className='w-full p-3 border border-gray-300 rounded-md outline-none min-h-40'
              required
            ></textarea>
            <button
              type='submit'
              className='inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-white shadow-sm transition hover:brightness-110 active:scale-95'
            >
              Submit
            </button>
          </form>
        </div>

        <div className='my-16 sm:my-20 max-w-3xl mx-auto px-1'>
          <p className='font-semibold my-4'>Share this article on social media</p>
          <div className='flex gap-4 cursor-pointer'>
            <img src={assets.facebook_icon} width={40} alt='Facebook' />
            <img src={assets.twitter_icon} width={40} alt='Twitter' />
            <img src={assets.googleplus_icon} width={40} alt='Google Plus' />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
