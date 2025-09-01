import React from 'react';
import { assets, footer_data } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-[#f9f9fd] text-[#4b5563] px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col md:flex-row justify-between items-start py-12 gap-10 border-b border-gray-300'>
        
        {/* Left logo and text */}
        <div className='max-w-md'>
          <img src={assets.blogkaro} alt="logo" className='w-36 sm:w-45' />
          <p className='mt-6 leading-relaxed text-[15px]'>
           Blogkaro is a blogging platform where you can post your<br />
           blogs and customized your blog and get auto generated<br />
           caption. Here you can enjoy your blogs else..
          </p>
        </div>

        {/* Footer links */}
        <div className='flex flex-wrap justify-between w-full md:w-[60%] gap-10'>
          {footer_data.map((section, index) => (
            <div key={index} className='min-w-[120px]'>
              <h3 className='text-black font-semibold mb-3'>{section.title}</h3>
              <ul className='space-y-2 text-sm'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.path ? (
                      <Link to={link.path} className='hover:underline transition'>
                        {link.name}
                      </Link>
                    ) : (
                      <a href="#" className='hover:underline transition'>
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer bottom */}
      <p className='text-center py-6 text-[14px] text-gray-500'>
        Copyright 2025 © <span className='text-black font-medium'>QuickBlog GreatStack</span> – All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
