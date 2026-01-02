import React from 'react'
import banner from '../assets/nitt.png'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const Navbar = () => {
    const [admin,setAdmin] = useState(true);
    return (
        <div>
            <div className='flex items-center justify-center py-3 bg-blue-950'>
                <img src={banner} alt="banner.jpeg" className='bg-blue-950'/>
            </div>
            <div>
                <div className="flex items-center justify-evenly bg-blue-950 mb-1">
                    <Link to="/" className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center '>Home</Link>
                    <Link to="/info" className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center '>About</Link>
                    <Link to="/view/year" className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center '>Year</Link>
                    <Link to="/view/subject" className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center '>Subject</Link>
                    <Link to="/view/dept" className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center '>Departments</Link>
                    <Link to="/view/author" className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center '>Authors</Link>
                    <Link to="/view/supervisor" className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center '>Supervisors</Link>
                    <Link to="/view/thesis_type" className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center '>Thesis Type</Link>
                    {admin&&<Link to='/view/upload' className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center'>Upload Thesis</Link>}                </div>
                <div className='border border-white px-3 flex justify-between gap-50 py-0.5'>
                    <div className='flex gap-3'>
                        <Link to="/login" className='underline text-indigo-700 text-xm hover:text-red-500'>Login</Link>
                        <div className='flex items-center text-xs text-gray-600'>|</div>
                        <Link to="/register" className='underline text-indigo-700 text-xm hover:text-red-500'>Create Account</Link>
                    </div>
                    <div className='flex justify-center items-center gap-1'>
                        <input type="text" className='search-bar bg-white text-xm border border-black-700 hover:border-2 h-7 w-70 rounded-md px-1' />
                        <div className='bg-[#204f76]  text-white text-xm border-2 border-gray-800 w-20 flex justify-center hover:cursor-pointer'>Search</div>
                    </div>
                </div>
                <hr className='h-2'></hr>
            </div>
        </div>
    )
}

export default Navbar