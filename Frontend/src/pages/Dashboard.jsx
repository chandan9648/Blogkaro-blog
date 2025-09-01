import React, { useCallback, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import BlogTableItem from '../components/user/BlogTableItem'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })
  const [loading, setLoading] = useState(true)

  const { axios } = useAppContext();

  const fetchDashboard = useCallback(async ()=>{
    try {
      setLoading(true)
      const { data } = await axios.get('/api/user/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false)
    }
  }, [axios])

  useEffect(()=>{
    fetchDashboard()
  },[fetchDashboard])

  return (
    <div className='flex-1 p-4 md:p-10 bg-gradient-to-b from-blue-50/60 to-indigo-50/30'>
      {/* Stat cards grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[0,1,2].map((i) => (
          <div key={`skeleton-${i}`} className={`${loading ? 'flex' : 'hidden'} items-center gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4 min-w-[14.5rem] shadow-sm backdrop-blur animate-pulse`}>
            <div className='h-12 w-12 rounded-full bg-gray-200' />
            <div className='flex-1'>
              <div className='h-5 w-20 bg-gray-200 rounded mb-2' />
              <div className='h-3 w-24 bg-gray-100 rounded' />
            </div>
          </div>
        ))}

        {!loading && (
          <>
            <div className='group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4 min-w-[14.5rem] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'>
              <div className='grid h-12 w-12 place-content-center rounded-full bg-blue-50 ring-1 ring-blue-100'>
                <img src={assets.dashboard_icon_1} alt='Blogs icon' className='h-6 w-6' />
              </div>
              <div>
                <p className='text-2xl font-semibold text-gray-700'>{dashboardData.blogs}</p>
                <p className='text-gray-400'>Blogs</p>
              </div>
            </div>

            <div className='group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4 min-w-[14.5rem] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'>
              <div className='grid h-12 w-12 place-content-center rounded-full bg-emerald-50 ring-1 ring-emerald-100'>
                <img src={assets.dashboard_icon_2} alt='Comments icon' className='h-6 w-6' />
              </div>
              <div>
                <p className='text-2xl font-semibold text-gray-700'>{dashboardData.comments}</p>
                <p className='text-gray-400'>Comments</p>
              </div>
            </div>

            <div className='group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4 min-w-[14.5rem] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'>
              <div className='grid h-12 w-12 place-content-center rounded-full bg-amber-50 ring-1 ring-amber-100'>
                <img src={assets.dashboard_icon_3} alt='Drafts icon' className='h-6 w-6' />
              </div>
              <div>
                <p className='text-2xl font-semibold text-gray-700'>{dashboardData.drafts}</p>
                <p className='text-gray-400'>Drafts</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Latest blogs table */}
      <div className='mx-auto mt-8'>
        <div className='mx-1 flex items-center gap-3 text-gray-700'>
           <img src={assets.dashboard_icon_4} alt='Latest blogs' className='h-5 w-5' />
           <p className='text-base font-medium'>Latest Blogs</p>
        </div>

        <div className='relative mx-1 mt-3 w-full max-w-5xl overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm'>
          <table className='w-full text-sm text-gray-600'>
            <thead className='sticky top-0 z-[1] bg-white/80 backdrop-blur text-xs uppercase'>
              <tr className='text-left'>
                <th scope='col' className='px-3 py-4 xl:px-6'>#</th>
                <th scope='col' className='px-3 py-4'>Blog Title</th>
                <th scope='col' className='px-3 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-3 py-4 max-sm:hidden'>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                [...Array(5)].map((_, i) => (
                  <tr key={`row-skel-${i}`} className='animate-pulse'>
                    <td className='px-3 py-4'><div className='h-4 w-6 bg-gray-100 rounded' /></td>
                    <td className='px-3 py-4'><div className='h-4 w-48 bg-gray-100 rounded' /></td>
                    <td className='px-3 py-4 max-sm:hidden'><div className='h-4 w-28 bg-gray-100 rounded' /></td>
                    <td className='px-3 py-4 max-sm:hidden'><div className='h-8 w-20 bg-gray-100 rounded-full' /></td>
                  </tr>
                ))
              )}
              {!loading && dashboardData.recentBlogs.length > 0 && (
                dashboardData.recentBlogs.map((blog, index)=>{
                  return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index +1}/>
                })
              )}
              {!loading && dashboardData.recentBlogs.length === 0 && (
                <tr>
                  <td colSpan={4} className='px-3 py-10 text-center text-gray-400'>
                    No recent blogs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
