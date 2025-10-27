import React from 'react'
import logo from '../assets/NIT_Trichy_logo.jpg'

const Footer = () => {
  return (
    <div>
        <div className='border border-gray-300 w-full mb-2'></div>
        <div className='border w-full mb-1'></div>
        <div className='flex justify-between items-start px-2'>
            <div className='flex items-end'>
                <img src={logo} alt="NIT_Trichy_logo.jpg" className='size-10' title='NIT Tiruchirappalli'/>
                <a href="https://www.nitt.edu/" className='text-indigo-700 underline text-sm hover:text-red-500'>NIT Tiruchirappalli</a>
            </div>
        </div>
    </div>
  )
}

export default Footer