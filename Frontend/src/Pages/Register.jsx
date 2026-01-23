import React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'


const Register = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate=useNavigate();

    const [searchParams] = useSearchParams()
    const inviteToken = searchParams.get("inviteToken")

    useEffect(() => {
        if (!inviteToken) {
            toast.error("Invalid or missing invite")
            navigate("/login")
        }
    }, [])


    const sendData=async(e)=>{
        e.preventDefault();
        try {
            const res=await fetch("http://localhost:8080/api/auth/register",{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username,email,password,inviteToken})
            });
            if(res.ok){
                toast.success("Account successfully created");
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } 
            else{
                toast.error("Error in creating account");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        
    }
    
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-gray-500 font-bold text-lg mb-2'>Create Account</div>
                <div className='flex justify-center items-end gap-3 mb-2'>
                    <div className='flex gap-1 '>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <label className='text-sm '>Username:</label>
                            <label className='text-sm '>Email:</label>
                            <label className='text-sm '>Password:</label>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-3'>
                            <input onChange={(e)=>setUsername(e.target.value)} type="text" className='px-1 border h-5 border-gray-300' />
                            <input onChange={(e)=>setEmail(e.target.value)} type="text" className='px-1 border h-5 border-gray-300' />
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" className='px-1 border h-5 border-gray-300' />
                        </div>
                    </div>
                </div>
                <button onClick={sendData} className='bg-blue-500 text-white w-l py-1  px-2 rounded-2xl hover:bg-blue-600'>Create Account</button>
            </div>
        </div>
    )
}

export default Register