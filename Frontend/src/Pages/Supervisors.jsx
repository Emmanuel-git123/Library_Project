import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Supervisors = () => {
  const [supervisors, setSupervisors] = useState([])
  const [thesisCounts, setThesisCounts] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch('http://localhost:8080/api/users')
        const usersData = await usersRes.json()
        
        const thesisRes = await fetch('http://localhost:8080/api/thesis')
        const thesisData = await thesisRes.json()
        
        if (usersRes.ok && thesisRes.ok) {
          const users = usersData.users
          const theses = thesisData.required_thesis
          
          const counts = {}
          theses.forEach(thesis => {
            counts[thesis.supervisor] = (counts[thesis.supervisor] || 0) + 1
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

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-2xl">
        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">Browse by Supervisors</h2>
        <p className="text-sm font-[400] mb-2">Please select a value to browse from the list below.</p>

        <div className="flex flex-col ml-5">
          <ul className="space-y-1 text-left">
            {supervisors.map(supervisor => (
              <li key={supervisor._id} className="list-disc list-inside text-sm">
                <Link 
                  to={`/view/supervisor/${supervisor._id}/years`} 
                  className="text-indigo-700 underline"
                >
                  {supervisor.name} ({getSupervisorCount(supervisor._id)})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Supervisors
