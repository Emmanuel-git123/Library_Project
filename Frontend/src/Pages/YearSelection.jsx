import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const YearSelection = () => {
  const { deptId } = useParams()
  const [years, setYears] = useState([])
  const [department, setDepartment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const thesisRes = await fetch('http://localhost:8080/api/thesis')
        const thesisData = await thesisRes.json()
        
        const deptRes = await fetch('http://localhost:8080/api/depts')
        const deptData = await deptRes.json()
        
        if (thesisRes.ok && deptRes.ok) {
          const theses = thesisData.required_thesis
          const departments = deptData.departments
          
          const dept = departments.find(d => d._id === deptId)
          setDepartment(dept)
          
          const deptTheses = theses.filter(thesis => thesis.departmentId === deptId)
          const yearCount = {}
          deptTheses.forEach(thesis => {
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
  }, [deptId])

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
          Browse by Year - {department?.name || 'Department'}
        </h2>
        <p className="text-sm font-[400] mb-2">Please select a year to browse theses from the list below.</p>

        <div className="flex flex-col ml-5">
          <ul className="space-y-1 text-left">
            {years.map(([year, count]) => (
              <li key={year}>
                <Link 
                  to={`/view/dept/${deptId}/year/${year}`} 
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

export default YearSelection
