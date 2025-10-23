import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const SupervisorYearSelection = () => {
  const { supervisorId } = useParams()
  const [years, setYears] = useState([])
  const [supervisor, setSupervisor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const thesisRes = await fetch('http://localhost:8080/api/thesis')
        const thesisData = await thesisRes.json()
        
        const usersRes = await fetch('http://localhost:8080/api/users')
        const usersData = await usersRes.json()
        
        if (thesisRes.ok && usersRes.ok) {
          const theses = thesisData.required_thesis
          const users = usersData.users
          
          const sup = users.find(u => u._id === supervisorId)
          setSupervisor(sup)
          
          const supervisorTheses = theses.filter(thesis => thesis.supervisor === supervisorId)
          const yearCount = {}
          supervisorTheses.forEach(thesis => {
            yearCount[thesis.year] = (yearCount[thesis.year] || 0) + 1
          })
          
          const sortedYears = Object.entries(yearCount).sort((a, b) => b[0] - a[0])
          setYears(sortedYears)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [supervisorId])

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-2xl">
        <div className="mb-4">
          <button 
            onClick={() => window.history.back()} 
            className="text-indigo-700 underline text-sm hover:text-indigo-900 flex items-center gap-1"
          >
            <span className="text-xs">▲</span> Up a level
          </button>
        </div>
        
        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">
          Browse by Year - {supervisor?.name || 'Supervisor'}
        </h2>
        <p className="text-sm font-[400] mb-2">Please select a year to browse theses from the list below.</p>

        <div className="flex flex-col ml-5">
          <ul className="space-y-1 text-left">
            {years.map(([year, count]) => (
              <li key={year} className="list-disc list-inside text-sm">
                <Link 
                  to={`/view/supervisor/${supervisorId}/year/${year}`} 
                  className="text-indigo-700 underline"
                >
                  {year} ({count})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SupervisorYearSelection
