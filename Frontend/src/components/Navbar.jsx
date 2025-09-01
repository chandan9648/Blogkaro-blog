import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {


    const {navigate, token} = useAppContext()

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img onClick={()=>navigate('/')} src={assets.blogkaro} alt="logo" className="w-42 sm:w-45 cursor-pointer "/>
      <button onClick={()=>navigate('/user')} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-green-700 hover:bg-primary text-white px-10 py-2.5">
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
