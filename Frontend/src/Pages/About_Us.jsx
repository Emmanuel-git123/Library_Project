import React from 'react'
import Librarypic from '../assets/library.jpg'
import { animate } from 'animejs';


const About_Us = () => {
    animate('.square', { x: '10rem' });
    animate('#css-selector-id', { rotate: '1turn' });
    animate('.row:nth-child(3) .square', { scale: [1, .5, 1] });
    return (
        <>
            <div className='square w-3xl h-2xs absolute bg-amber-200 z-100'></div>
        <div className='relative flex flex-col justify-center items-center min-h-screen'>
            <div className='flex flex-col text-center absolute justify-center items-center w-[80vw] max-h-[60vh] px-10 z-10 bg-blue-50'>
                <div className='font-semibold text-lg text-gray-600 mb-2 text-center'>About the Repository</div>
                <div className='text-xs font-500 mb-10'>"ethesis@nitt" is the official repository for electronic theses submitted to National Insititute of Technology Tiruchirappalli. This repository is an attempt to make all locally produced theses more visible to global users. It is mandatory for students of all courses (BTech, MTech, MTech by Research, MSc and PhD) and from all diciplines to upload the final version of the theses submitted as partial fulfillment of degree. This repository is an Open Access repository and all uploaded theses can be downloaded by any intereted user in order to use and and build upon.</div>
                <div className='text-xs font-500 mb-10'>It is an institutionally defined repository, so "Create Login" facility is restricted to campus intranet users only. Only NIT Tiruchirappalli students can upload their theses.</div>
                <div className='text-xs font-500 mb-2'>For repository policies (upload, use): visit <a href="/" className='text-indigo-700 underline'>here</a></div>
                <div className='font-semibold text-sm text-gray-600 mb-2 '>Contact Information</div>
                <div className='text-xs font-500 mb-4'>Any correspondence concerning this specific repository should be sent to <a href="/" className='text-indigo-700 underline'>bpcl-dig@nitt.ac.in</a></div>
            </div>
        </div>
        </>
    )
}

export default About_Us