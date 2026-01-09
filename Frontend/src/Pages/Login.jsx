import React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const navigate=useNavigate();

    const sendData=async(e)=>{
        e.preventDefault();
        setLoading(true);

        try {
            const res=await fetch("http://localhost:8080/api/auth/login",{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,password})
            })
            const data=await res.json();
            if(res.ok){
                localStorage.setItem("token", data.token);
                toast.success("Login successful");
                navigate("/");
                window.location.reload();
            }
            else{
                toast.error("Invalid Credentials");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            setLoading(false);
        }
        
    }
    
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-gray-500 font-bold text-lg mb-2'>Login</div>
                <div className='text-sm mb-3'>Please enter your username and password. If you have forgotten your password, you may <a href="/" className='text-indigo-700 underline'>reset</a> it.</div>
                <div className='flex justify-center items-end gap-3 mb-2'>
                    <div className='flex gap-1 '>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <label className='text-sm '>Email:</label>
                            <label className='text-sm '>Password:</label>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-3'>
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" className='px-1 border h-5 border-gray-300' />
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" className='px-1 border h-5 border-gray-300' />
                        </div>
                    </div>
                    <button disabled={loading} onClick={sendData} className='bg-blue-500 text-white w-fit px-2 rounded hover:bg-blue-600'>{loading?"Logging in...":"Login"}</button>
                </div>
            </div>
        </div>
    )
}

export default Login