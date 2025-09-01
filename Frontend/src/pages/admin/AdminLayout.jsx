import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

    const {axios, setToken, navigate} = useAppContext()

    const logout =()=>{
        localStorage.removeItem('token')
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null)
        navigate('/')
    }

  return (
    <>
        <div className='flex item-center justify-between py-2-h-[70px] px-4 sm:px-12 border-b border-gray-200'>
            <img src={assets.blogkaro} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={()=> navigate('/')}/>
            <button onClick={logout} className='inline-flex items-center gap-2 cursor-pointer rounded-full bg-red-600 px-8 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 active:scale-95'>Logout</button>
        </div>
        <div className='flex h -[calc(100vh-70px)]'>
            <Sidebar/>
            <Outlet/>
        </div>
      
    </>
  )
}

export default Layout;
