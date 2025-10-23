import React from 'react'

const Register = () => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-2xl'>
                <div className='font-bold text-lg text-gray-600 mb-2 text-center'>Create Account Restrictions</div>
                <div>ethesis@nitr is an institutionally defined repository. Only NITR students can upload theses in the repository. "Create account" facility is available only to NITR campus intranet users</div>
                <div className='font-semibold text-sm text-gray-600 mb-2 '>Contact Information</div>
                <div className='text-xs font-[500] mb-4'>Any correspondence concerning this specific repository should be sent to <a href="/" className='text-indigo-700 underline'>bpcl-dig@nitrkl.ac.in</a></div> 
            </div>
        </div>
    )
}

export default Register