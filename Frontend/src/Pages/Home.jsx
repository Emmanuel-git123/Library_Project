import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../assets/icon.png'
import image from '../assets/lib-july15.jpg'

const Home = () => {
  return (
    <div>
      <div>
        <div className="px-10 py-0.5 flex justify-center">
            <img src={image} alt="library-picture" className="w-5xl object-cover"></img>
        </div>
        <div className='flex justify-center items-center font-bold text-gray-600 text-lg mb-2'>Welcome to ethesis</div>
        {/* <div className=' flex justify-center items-center gap-2'>
          <div className='flex items-center'><img src={icon} alt="icon.png" className='size-4 mx-0.5' /><p className='text-s text-gray-500'>Atom</p></div>
          <div className='flex items-center'><img src={icon} alt="icon.png" className='size-4 mx-0.5' /><p className='text-s text-gray-500'>RSS 1.0</p></div>
          <div className='flex items-center'><img src={icon} alt="icon.png" className='size-4 mx-0.5' /><p className='text-s text-gray-500'>RSS 2.0</p></div>
        </div> */}
        <div className='flex items-center justify-center mb-2'>
          <div className='grid grid-cols-3 w-fit bg-gray-300'>
            <div className='flex flex-col border w-3xs p-1 text-sm'>
              <div className='bg-indigo-100  p-2 mb-3'>
                <div className='mb-4'>Upload your thesis</div>
                <div>Instructions_ to_ upload thesis are here. Please read before uploading yours</div>
              </div>
              <div className='bg-indigo-100  p-2 mb-3'>
                <div>ethesis@nitt is indexed by:</div>
                <div className='flex flex-col'>
                  <a href="/" className='text-indigo-700 underline py-1'>Google</a>
                  <a href="/" className='text-indigo-700 underline py-1'>OAIster</a>
                  <a href="/" className='text-indigo-700 underline py-1'>Scientific Commons</a>
                  <a href="/" className='text-indigo-700 underline pt-1 pb-2'>BASE</a>
                  <p>and many other service providers..</p>
                </div>
              </div>
              <div className='bg-indigo-100  p-2 mb-2'>
                <a href="/" className='text-indigo-700 underline py-1'>Policies</a>
                <p className='mt-2'>Submitters, users and preservations policies are here</p>
              </div>
            </div>
            <div className='flex flex-col w-3xs p-1 text-xs border-y'>
              <div className='pt-6'>
                <div className='bg-indigo-100 px-2 pt-4'><b>ethesis@nitt</b> is the official institutional Open Access theses repository of <a href="/" className='text-indigo-700 underline'>National Institute of Technology Tiruchirappalli</a>. Here all theses produced by students as a partial fulfillment of degree are uploaded. For more details: <a href="/" className='text-indigo-700 underline'>more</a></div>
                <div className='bg-indigo-100 px-2 pb-4 pt-3 mb-3'>For other institutional Open Access scientific outputs (Journal Papers, Conference Papers etc.) of NITT visit <a href="/" className='text-indigo-700 underline'>dspace@nitt</a></div>
              </div>
              <div className='bg-indigo-100 px-2 py-2 pb-5'>
                <div className='mb-2'>For queries:</div>
                <div>Mrs. P. Mishra</div>
                <div className='mb-2'>Biju Patnaik Central Library, NITT</div>
                <div>Email:<a href='/' className='text-indigo-700 underline'>bpcl-dig@nitt.ac.in</a></div>
              </div>
            </div>
            <div className='flex flex-col border w-3xs p-1'>
              <div className='bg-indigo-100 px-3 py-2 text-sm mb-3'>
                <a href="/" className='text-indigo-700 underline'>Search Repository</a>
                <div className='mt-5'>Search the repository using a full range of fields. It is advanced search.</div>
              </div>
              <div className='flex flex-col bg-indigo-100 px-3 py-2 text-sm gap-2 mb-3'>
                <p>Browse Repository</p>
                <Link to="/view/year" className='text-indigo-700 underline'>Year</Link>
                <Link to="/view/author" className='text-indigo-700 underline'>Creators</Link>
                <Link to="/view/supervisor" className='text-indigo-700 underline'>Supervisors</Link>
                <Link to="/view/dept" className='text-indigo-700 underline'>Departments</Link>
                <Link to="/view/subject" className='text-indigo-700 underline'>Subjects</Link>
              </div>
              <div className='bg-indigo-100 px-3 py-2 text-sm mb-2'>
                <a href="/" className='text-indigo-700 underline'>Latest Additions</a>
                <div className='mt-2'>View recent items added to the repository</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center font-bold mb-2 mt-5">Recent Research Publications</div>
        <div className="flex justify-center">
          <div className="h-170 w-300 border flex flex-col justify-evenly items-center">
            <div className="h-30 w-290 border flex">
              <div className="h-26 w-26 border mt-2 ml-2">Photo</div>
              <div className="h-26 w-200 border mt-2 ml-2">
                <div>Thesis Name</div>
                <div>Author Name</div>
                <div>Department</div>
              </div>
              <div className="ml-35">share button</div>
            </div>
            <div className="h-30 w-290 border flex">
              <div className="h-26 w-26 border mt-2 ml-2">Photo</div>
              <div className="h-26 w-200 border mt-2 ml-2">
                <div>Thesis Name</div>
                <div>Author Name</div>
                <div>Department</div>
              </div>
              <div className="ml-35">share button</div>
            </div>
            <div className="h-30 w-290 border flex">
              <div className="h-26 w-26 border mt-2 ml-2">Photo</div>
              <div className="h-26 w-200 border mt-2 ml-2">
                <div>Thesis Name</div>
                <div>Author Name</div>
                <div>Department</div>
              </div>
              <div className="ml-35">share button</div>
            </div>
            <div className="h-30 w-290 border flex">
              <div className="h-26 w-26 border mt-2 ml-2">Photo</div>
              <div className="h-26 w-200 border mt-2 ml-2">
                <div>Thesis Name</div>
                <div>Author Name</div>
                <div>Department</div>
              </div>
              <div className="ml-35">share button</div>
            </div>
            <div className="h-30 w-290 border flex">
              <div className="h-26 w-26 border mt-2 ml-2">Photo</div>
              <div className="h-26 w-200 border mt-2 ml-2">
                <div>Thesis Name</div>
                <div>Author Name</div>
                <div>Department</div>
              </div>
              <div className="ml-35">share button</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home