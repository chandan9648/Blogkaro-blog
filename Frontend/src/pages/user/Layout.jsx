import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/user/Sidebar'
import { useAppContext } from '../../context/AppContext'

const AdminLayout = () => {

    const {axios, setToken, navigate} = useAppContext()

    const logout =()=>{
        localStorage.removeItem('token')
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null)
        navigate('/')
    }

  return (
    <>
                {/* Top bar */}
                <div className='sticky top-0 z-30 border-b border-gray-200/70 bg-white/70 backdrop-blur'>
                    <div className='mx-4 sm:mx-8 lg:mx-12'>
                        <div className='flex h-16 items-center justify-between'>
                            <img src={assets.blogkaro} alt='BlogKaro logo' className='h-8 sm:h-20 w-auto cursor-pointer' onClick={()=> navigate('/')}/>
                            <button aria-label='Logout' onClick={logout} className='inline-flex items-center gap-2 cursor-pointer rounded-full bg-red-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 active:scale-95'>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main area */}
                <div className='flex min-h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-50/60 to-indigo-50/30'>
                    <Sidebar/>
                    <div className='flex-1 overflow-y-auto'>
                        <Outlet/>
                    </div>
                </div>
      
    </>
  )
}

export default AdminLayout
