import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SUPERVISORS_PER_PAGE = 2;

const Supervisors = () => {
  const [supervisors, setSupervisors] = useState([])
  const [thesisCounts, setThesisCounts] = useState({})
  const [search,setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch('http://localhost:8081/api/users')
        const usersData = await usersRes.json()
        
        const thesisRes = await fetch('http://localhost:8081/api/thesis')
        const thesisData = await thesisRes.json()
        
        if (usersRes.ok && thesisRes.ok) {
          const users = usersData.users
          const theses = thesisData.required_thesis
          
          const counts = {}
          theses.forEach(thesis => {
            counts[thesis.supervisor._id] = (counts[thesis.supervisor._id] || 0) + 1
          })
          setThesisCounts(counts)
          
          const supervisorsWithTheses = users
            .filter(user => counts[user._id] > 0)
            .sort((a, b) => a.name.localeCompare(b.name))
          
          setSupervisors(supervisorsWithTheses)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  const getSupervisorCount = (supervisorId) => {
    return thesisCounts[supervisorId] || 0
  }

  const indexOfLast = currentPage * SUPERVISORS_PER_PAGE;
  const indexOfFirst = indexOfLast - SUPERVISORS_PER_PAGE;
  const currentSupervisors = supervisors.slice(
    indexOfFirst,
    indexOfLast
  );
  
  const totalPages = Math.ceil(
    supervisors.length / SUPERVISORS_PER_PAGE
  );
  
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="flex flex-col w-2xl">
        <h2 className="font-bold text-3xl text-gray-700 mt-4 mb-1 text-center">Browse by Supervisors</h2>
        <p className="text-xs mb-3 text-center">Please select a value to browse from the list below.</p>

        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className='flex justify-center'>
          <motion.input type='text' placeholder='Search Supervisors...' value={search} onChange={(e)=>setSearch(e.target.value)} className="w-100 border rounded-2xl px-4 py-2 text-sm shadow-md focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all mb-10 hover:scale-105">
          </motion.input>
        </motion.div>

        <div className="grid grid-cols-4 gap-4 text-sm text-center font-bold leading-6">
          {currentSupervisors.map((supervisor) => (
              <div key={supervisor._id} className="p-4 rounded-3xl shadow-lg bg-white border border-gray-200 text-gray-800 hover:bg-blue-50">
                  <Link to={`/view/supervisor/${supervisor._id}/years`} className="no-underline">
                  {supervisor.name} ({getSupervisorCount(supervisor._id)})
                  </Link>
              </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition mb-5
                  ${
                    currentPage === page
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-black hover:bg-gray-400"
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Supervisors