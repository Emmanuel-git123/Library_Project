import React from 'react'
import banner from '../assets/nitt.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

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
                    <div className='flex gap-1 '>
                        {token?
                        <Link to="/" onClick={handleLogOut} className='underline text-indigo-700 text-sm hover:text-red-500'>Log out</Link>
                        :<Link to="/login" className='underline text-indigo-700 text-sm hover:text-red-500'>Login</Link>}
                        {token&&role=='HEAD_ADMIN'&&(
                            <button onClick={()=>navigate('/admin/invite')} className='px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs'>Add Admin</button>
                        )}
                        {/* <Link to='/admin/invite' className='mx-2 underline text-indigo-700 text-sm hover:text-red-500'>Add Admin</Link> */}
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