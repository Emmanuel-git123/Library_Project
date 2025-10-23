import React from 'react'
import banner from '../assets/banner.jpg'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div className='flex items-center justify-center py-3'>
                <img src={banner} alt="banner.jpeg" />
            </div>
            <div>
                <div className="flex items-center justify-start bg-gradient-to-b from-[#0b66b6ba] from-10% to-[#204f76] mb-1">
                    <Link to="/" className='px-3 border-x border-x-white font-bold text-white text-xs hover:bg-blue-400 hover:cursor-pointer flex items-center justify-center '>Home</Link>
                    <Link to="/info" className='px-3 border-x border-x-white font-bold text-white text-xs hover:bg-blue-400 hover:cursor-pointer flex items-center justify-center '>About</Link>
                    <Link to="/view/year" className='px-3 border-x border-x-white font-bold text-white text-xs hover:bg-blue-400 hover:cursor-pointer flex items-center justify-center '>Year</Link>
                    <Link to="/view/subject" className='px-3 border-x border-x-white font-bold text-white text-xs hover:bg-blue-400 hover:cursor-pointer flex items-center justify-center '>Subject</Link>
                    <Link to="/view/dept" className='px-3 border-x border-x-white font-bold text-white text-xs hover:bg-blue-400 hover:cursor-pointer flex items-center justify-center '>Departments</Link>
                    <Link to="/view/author" className='px-3 border-x border-x-white font-bold text-white text-xs hover:bg-blue-400 hover:cursor-pointer flex items-center justify-center '>Authors</Link>
                    <Link to="/view/supervisor" className='px-3 border-x border-x-white font-bold text-white text-xs hover:bg-blue-400 hover:cursor-pointer flex items-center justify-center '>Supervisors</Link>
                    <Link to="/view/thesis_type" className='px-3 border-x border-x-white font-bold text-white text-xs hover:bg-blue-400 hover:cursor-pointer flex items-center justify-center '>Thesis Type</Link>
                </div>
                <div className='border border-white px-3 flex justify-between bg-gray-300 py-0.5'>
                    <div className='flex gap-1 '>
                        <Link to="/login" className='underline text-indigo-700 text-sm'>Login</Link>
                        <div className='flex items-center text-xs text-gray-600'>|</div>
                        <Link to="/register" className='underline text-indigo-700 text-sm'>Create Account</Link>
                    </div>
                    <div className='flex justify-center items-center gap-1'>
                        <input type="text" className='bg-white text-xs border border-gray-500 px-0.5' />
                        <div className='bg-[#204f76]  text-white text-xs border-2 border-gray-800 '>Search</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar