import React from 'react'

const About_Us = () => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-2xl '>
                <div className='font-semibold text-lg text-gray-600 mb-2 text-center'>About the Repository</div>
                <div className='text-xs font-[500] mb-10'>"ethesis@nitr" is the official repository for electronic theses submitted to National Insititute of Technology Rourkela. This repository is an attempt to make all locally produced theses more visible to global users. It is mandatory for students of all courses (BTech, MTech, MTech by Research, MSc and PhD) and from all diciplines to upload the final version of the theses submitted as partial fulfillment of degree. This repository is an Open Access repository and all uploaded theses can be downloaded by any intereted user in order to use and and build upon.</div>
                <div className='text-xs font-[500] mb-10'>It is an institutionally defined repository, so "Create Login" facility is restricted to campus intranet users only. Only NIT Rourkela students can upload their theses. This repository is powered by "eprints"</div>
                <div className='text-xs font-[500] mb-2'>For repository policies (upload, use): visit <a href="/" className='text-indigo-700 underline'>here</a></div>
                <div className='font-semibold text-sm text-gray-600 mb-2 '>Contact Information</div>
                <div className='text-xs font-[500] mb-4'>Any correspondence concerning this specific repository should be sent to <a href="/" className='text-indigo-700 underline'>bpcl-dig@nitrkl.ac.in</a></div>
            </div>
        </div>
    )
}

export default About_Us