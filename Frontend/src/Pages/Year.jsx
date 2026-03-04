import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Year = () => {
    const [year, setYear] = useState([]);
    const [search,setSearch] = useState("");

    useEffect(() => {
        const fetchYear = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/thesis`);
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    const yearCount = {}; 
                    data.required_thesis.forEach(t => { yearCount[t.year] = (yearCount[t.year] || 0) + 1; });
                    const uniqueSortedYears = Object.entries(yearCount).sort((a, b) => b[0] - a[0]);
                    setYear(uniqueSortedYears);
                } else {
                    console.error('Thesis not found:', data.message);
                }
            } catch (error) {
                console.error('Error fetching years:', error);
            }
        };
        fetchYear();
    }, [])
    const filteredYears = year.filter(([y]) =>
        y.toString().includes(search)
    );

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}} className='relative flex justify-center px-4 pt-20 min-h-screen bg-linear-to-b bg-gray-100'>
            <div className='flex flex-col w-6xl'>
                <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className='mb-8 text-center'>
                    <h2 className="text-4xl font-bold text-gray-800">Browse by Year</h2>
                    <p className="text-sm text-gray-500 mt-1">Select a year to explore published theses</p>
                </motion.div>
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className='flex justify-center'>
                    <motion.input type='text' placeholder='Search year...' value={search} onChange={(e)=>setSearch(e.target.value)} className="w-1/2 border rounded-2xl px-4 py-2 text-sm shadow-md focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all mb-10"></motion.input>
                </motion.div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 gap-y-10'>
                    <AnimatePresence initial={false}>
                        {filteredYears.map(([y,count],index)=>(
                            <Link key={y} to={`/view/year/${y}`} className=''>
                                <motion.div layout initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.6 }} className=''>
                                    <motion.div className='border p-6 rounded-xl hover:rounded-3xl hover:rotate-3 hover:scale-105 shadow-lg hover:shadow-2xl duration-200 hover:-translate-y-3 bg-white border-gray-200 hover:bg-amber-50 transition-all w-full'>
                                        <div className='mb-2 pl-1'>
                                                {count === 0 ? (
                                                    <span className="text-gray-400 cursor-not-allowed">{y}</span>
                                                ) : (
                                                    <div className='font-semibold text-gray-800 text-2xl w-full '>{y}</div>
                                                )}
                                        </div>
                                        <div className='border-gray-200 w-max px-3 py-1 rounded-2xl font-normal bg-green-200'>{count} theses</div>
                                        <motion.div initial={{width:0}} animate={{width:"100%"}} transition={{duration:0.6}} className='border mt-2.5 w-full border-blue-200'></motion.div>
                                    </motion.div>
                                </motion.div>
                            </Link>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

export default Year
