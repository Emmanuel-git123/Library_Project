import React from 'react'

const Login = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-gray-500 font-bold text-lg mb-2'>Login</div>
                <div className='text-sm mb-3'>Please enter your username and password. If you have forgotten your password, you may <a href="/" className='text-indigo-700 underline'>reset</a> it.</div>
                <div className='flex justify-center items-end gap-3 mb-2'>
                    <div className='flex gap-1 '>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <label className='text-sm '>Username:</label>
                            <label className='text-sm '>Password:</label>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-3'>
                            <input type="text" className='px-1 border h-5 border-gray-300' />
                            <input type="password" className='px-1 border h-5 border-gray-300' />
                        </div>
                    </div>
                    <button className='bg-blue-500 text-white w-fit px-2 rounded hover:bg-blue-600'>Login</button>
                </div>
                <div className='text-sm mb-3'>Note: you must have cookies enabled.</div>
            </div>
        </div>
    )
}

export default Login