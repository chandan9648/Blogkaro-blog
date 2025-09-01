import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AdminComments = () => {

  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const {axios} = useAppContext();

  const fetchComments = async ()=>{
    try {
      const { data } = await axios.get('/api/comment/all')
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    console.log("Fetched Comments:", comments);
  fetchComments();
}, []);


  return (
    <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between iten-center max-w-3xl'>
        <h1>Comments</h1>
      </div>
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
              <th scope='col' className='px-6 py-3'> Blog Title & Comment </th>
              <th scope='col' className='px-6 py-3 ma-sm:hidden'> Date </th>
              <th scope='col' className='px-6 py-3'> Action </th>
            </tr>
          </thead>
         <tbody>
  {comments.map((comment, index) => (
    <CommentTableItem
      key={comment._id}
      comment={comment}
      index={index + 1}
      fetchComments={fetchComments}
    />
  ))}
</tbody>

        </table>
      </div>
    </div>
  )
}

export default AdminComments
