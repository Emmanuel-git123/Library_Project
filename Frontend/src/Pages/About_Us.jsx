import React, { useEffect,useState } from 'react'
import Librarypic from '../assets/library.jpg'
import { animate } from 'animejs'
import Lib1 from '../assets/one.jpg'
import StackedAreaChart from '@/Components/StackedAreaChart'

const About_Us = () => {
    // animate('.square', { x: '10rem' });
    // animate('#css-selector-id', { rotate: '1turn' });
    // animate('.row:nth-child(3) .square', { scale: [1, .5, 1] });
    const [theses,setTheses] = useState([]);
    useEffect(()=>{
        const fetchTheses=async()=>{
            try {
                const res=await fetch('http://localhost:8081/api/thesis');
                const data=await res.json();
                
                if(res.ok){
                    setTheses(data.required_thesis);
                }
            }
            catch (error) {
                console.error("Error fetching theses:", error);   
            }
        }
        fetchTheses();
    },[]);
    return (
        <>
            <div className='flex flex-col px-6 bg-blue-50'>
                <div className='text-6xl font-bold text-center my-6'>About Us</div>
                    <div className='grid grid-cols-2 border-t-4 gap-6 p-6'>
                        <div className='border-0 flex flex-col items-start justify-center'>
                            <div className='text-4xl font-semibold w-sm font-Bebas my-6 '>A repository of theses and dissertations from NITT.</div>
                            <div className='text-lg leading-relaxed'>The eThesis platform of the National Institute of Technology Tiruchirappalli (NITT) Library is a digital repository designed to collect, preserve, and provide access to the scholarly research produced by students of the institute. It serves as a centralized platform where theses and dissertations submitted by undergraduate, postgraduate, and doctoral students are securely archived and made accessible for academic reference.</div>
                        </div>
                    <div className='flex flex-col justify-center'>
                        <div className='flex border-2 self-center  transition-all mb-4 shadow-lg justify-evenly gap-10 px-4  bg-gray-400 rounded-2xl py-3 max-w-lg'>
                            <div className='flex flex-col'>
                                <div className='text-4xl'>999</div>
                                <div>NO OF PROJECTS</div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='text-4xl'>{theses.length}</div>
                                <div>NO OF THESES</div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='text-4xl'>999</div>
                                <div>NO OF DISSERTATIONS</div>
                            </div>
                        </div>
                        <div>
                            <StackedAreaChart></StackedAreaChart>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col px-72 mt-3'>
                    <div className='text-3xl text-center p-3 font-Archivo mt-5 '>Purpose of the eThesis Repository</div>
                    <hr className='border border-amber-500 ' />
                </div>
                <div className='grid grid-cols-2 py-10 px-50 gap-20'>
                    <div className='w-full min-h-lh p-5 grid-rows-2 grid gap-10'>
                        <div className='border bg-amber-400 hover:-translate-y-2 hover:shadow-amber-300 py-5 px-8 rounded-2xl border-gray-300 hover:border-gray-400 hover:shadow-lg transition-all'>
                            <div className='text-3xl font-semibold font-serif'>
                                Digital Preservation                        
                            </div>
                            <div>
                                Theses and dissertations are securely stored in a digital repository, ensuring the institute’s academic work is preserved and accessible over time.                        
                            </div>
                        </div>
                        <div className='border py-5 bg-red-400 hover:-translate-y-2 hover:shadow-red-300 px-8 rounded-2xl border-gray-300 hover:border-gray-400 hover:shadow-lg transition-all'>
                            <div className='text-3xl font-semibold font-serif'>
                                 Research Visibility
                            </div>
                            <div>
                                The platform increases the reach of student research by making it accessible to scholars and institutions beyond the campus.                      
                            </div>
                        </div>  
                    </div>
                    <div className='w-full min-h-lh p-5 grid-rows-2 grid gap-10'>
                        <div className='border py-5 bg-blue-400 hover:-translate-y-2 hover:shadow-blue-300 px-8 rounded-2xl border-gray-300 hover:border-gray-400 hover:shadow-lg transition-all'>
                            <div className='text-3xl font-semibold font-serif '>
                                Organized Access
                            </div>
                            <div>
                                Research is arranged in a structured and searchable system, making it easy for users to browse and find relevant theses.      
                            </div>
                        </div>
                        <div className='border py-5 px-8 bg-green-400 hover:-translate-y-2 hover:shadow-green-300 rounded-2xl border-gray-300 hover:border-gray-400  hover:shadow-lg transition-all'>
                            <div className='text-3xl font-semibold font-serif'>
                                Support for Researchers
                            </div>
                            <div>
                                Previous theses serve as valuable references, helping students explore ideas, methods, and insights for future research.
                            </div>
                    </div>
                        
                </div>
            </div>
        </div>
        </>
    )
}

export default About_Us