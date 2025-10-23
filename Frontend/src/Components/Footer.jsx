import React from 'react'
import logo from '../assets/nitrlogo.gif'
import eprints_logo from '../assets/eprintslogo.gif'

const Footer = () => {
  return (
    <div>
        <div className='border border-gray-300 w-full mb-2'></div>
        <div className='border w-full mb-1'></div>
        <div className='flex justify-between items-start px-2'>
            <div className='flex items-end'>
                <img src={logo} alt="nitr_logo.jpg" className='size-10' />
                <a href="https://www.nitrkl.ac.in/" className='text-indigo-700 underline text-sm'>NIT Rourkela</a>
            </div>
            <div>
                <p className='text-sm'>Powered by</p>
                <a href="https://www.eprints.org/the-eprints-platform/"><img src={eprints_logo} alt="eprints_logo.jpg" /></a>
            </div>
        </div>
    </div>
  )
}

export default Footer