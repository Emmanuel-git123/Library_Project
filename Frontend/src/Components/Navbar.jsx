import React from 'react'
import banner from '../assets/nitt.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Search, X, Camera, Mic } from "lucide-react";
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Button, Stack, Text } from "@chakra-ui/react"
import CommandPalette from "../Components/CommandPalette";

const Navbar = () => {
    const [token,setToken] = useState(false);
    const [role,setRole] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const check=localStorage.getItem("token");
        if(check){
            setToken(true);
            const decoded = jwtDecode(check);
            setRole(decoded.role);
        }
    }, [])

    const handleLogOut=()=>{
        localStorage.removeItem("token");
        setToken(false);
        window.location.reload();
    }
    return (
        <div>
            <div className='flex items-center justify-center py-3 bg-blue-950'>
                <img src={banner} alt="banner.jpeg" className='bg-blue-950'/>
            </div>
            <div className="flex items-center gap-4">
                <CommandPalette/>
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
                    {token&&<Link to='/view/upload' className='px-3 py-3 transition-all duration-300 transform hover:scale-150 font-bold text-white text-xs hover:text-orange-400 hover:cursor-pointer flex items-center justify-center'>Upload Thesis</Link>}                </div>
                <div className='border border-white px-3 flex justify-between bg-gray-300 py-0.5'>
                    <div className='flex gap-1 items-center'>
                        {token?
                        <Link to="/" onClick={handleLogOut} className='underline text-indigo-700 text-sm hover:text-red-500'>Log out</Link>
                        // :<Link to="/login" className='underline text-indigo-700 text-sm hover:text-red-500'>Login</Link>}\
                        :<Link to="/login" className='group relative overflow-hidden animate-pulse text-sm w-36 bg-gray-800 h-6 text-center border-0 rounded-2xl text-white opacity-500 hover:bg-gray-900 focus:outline-4 focus-outline-offset-2 focus:outline-black'>
                            <span className='absolute inset-0 bg-white opacity-30 scale-0 group-hover:scale-200 transition-transform duration-1000 rounded-2xl w-36'></span>
                            <span className='relative z-10'>Login</span>
                        </Link>}
                        {token&&role=='HEAD_ADMIN'&&(
                            // <button onClick={()=>navigate('/admin/invite')} className='px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs'>Add Admin</button>
                            <Stack direction="row" align="center" gap="3">
                                {/* <Text fontSize="sm">Admin</Text> */}
                                <Button size="xs" colorPalette="pink" className='shadow-xs hover:shadow-lg'>Add Admin</Button>
                            </Stack>
                        )}
                        {/* <Link to='/admin/invite' className='mx-2 underline text-indigo-700 text-sm hover:text-red-500'>Add Admin</Link> */}
                    </div>
                    <div className="w-full max-w-xl px-4 mt-3">
                        <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 gap-3 hover:outline-none focus:outline-none border hover:border-2">
                            <Search className="text-blue-950" size={22} />
                            <input type="text" placeholder="Search..." className="flex-1 hover:outline-none focus:outline-none text-gray-700 placeholder-gray-400" />
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