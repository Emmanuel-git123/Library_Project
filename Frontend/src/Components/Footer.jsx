import React from 'react'
import logo from '../assets/NIT_Trichy_logo.jpg'
import insta from '../assets/insta.jpg'
import linkedin from '../assets/linkedin.jpg'
import youtube from '../assets/youtube.png'
import twitter from '../assets/x.png'

const Footer = () => {
  return (
    <div>
        <div className='border border-gray-300 w-full mb-2'></div>
        <div className='border w-full mb-1'></div>
        <div className='flex justify-between items-start px-2'>
            <div className='flex items-center justify-between w-full px-4'>
                <div className='flex items-center gap-2'>
                  <img src={logo} alt="NIT_Trichy_logo.jpg" className='size-10' title='NIT Tiruchirappalli'/>
                  <a href="https://www.nitt.edu/" className='text-indigo-700 underline text-sm hover:text-red-500'>NIT Tiruchirappalli</a>
                </div>
                <div className="flex items-center gap-2">
                  <a href="https://www.instagram.com/nit_tiruchirappalli/" target="_blank" rel="noopener noreferer"><img src={insta} alt="instagram handle.jpg" className='size-8' title='Insta handdle' /></a>
                  <a href="https://in.linkedin.com/school/nittrichy/" target="_blank" rel="noopener noreferer"><img src={linkedin} alt="linkedin Handle.jpg" className='size-8' title="Linkedin Handle"/></a>
                  <a href="https://www.youtube.com/channel/UCEPOEe5azp3FbUjvMwttPqw" target="_blank" rel="noopener noreferer"><img src={youtube} alt="youtube.jpg" className="size-8" title="youtube channel"/></a>
                  <a href="https://x.com/ReachNITT" target="_blank" rel="noopener noreferer"><img src={twitter} alt="Twiiter.png" className='size-8'title="x handle" ></img></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer