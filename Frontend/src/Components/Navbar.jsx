import React from 'react'
import banner from '../assets/nitt.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
                </div>
                <div className='border border-white px-3 flex justify-between bg-gray-300 py-0.5'>
                    <div className='flex gap-1 '>
                        <Link to="/login" className='underline text-indigo-700 text-sm hover:text-red-500'>Login</Link>
                        <div className='flex items-center text-xs text-gray-600'>|</div>
                        <Link to="/register" className='underline text-indigo-700 text-sm hover:text-red-500'>Create Account</Link>
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