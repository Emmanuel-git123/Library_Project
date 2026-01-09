import React from 'react'
import banner from '../assets/nitt.png'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Search, X, Camera, Mic } from "lucide-react";

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
                    <div className='flex justify-center gap-3 mt-0'>
                        <Link to="/login" className='underline text-indigo-700 text-xm hover:text-red-500'>Login</Link>
                        <div className='mt-1 text-xs text-gray-900'>|</div>
                        <Link to="/register" className='underline text-indigo-700 text-xm hover:text-red-500'>Create Account</Link>
                    </div>
                    <div className="w-full max-w-xl px-4 mt-3">
                        <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 gap-3 border hover:border-2">
                            <Search className="text-blue-950" size={22} />
                            <input type="text" placeholder="Search..." className="flex-1 outline-none text-gray-700 placeholder-gray-400" />
                            <button className="text-gray-400 hover:text-gray-600">
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar