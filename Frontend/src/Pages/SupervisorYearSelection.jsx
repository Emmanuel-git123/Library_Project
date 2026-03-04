import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const SupervisorYearSelection = () => {
  const { supervisorId } = useParams()
  const [years, setYears] = useState([])
  const [supervisorName, setSupervisorName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [thesisRes, usersRes] = await Promise.all([
          fetch('http://localhost:8081/api/thesis'),
          fetch('http://localhost:8081/api/users')
        ])

        const thesisData = await thesisRes.json()
        const usersData = await usersRes.json()

        if (thesisRes.ok && usersRes.ok) {
          const theses = thesisData.required_thesis
          const users = usersData.users

          const sup = users.find(u => u._id === supervisorId)
          if (sup) setSupervisorName(sup.name)

          const yearCount = {}

          theses.forEach(thesis => {
            if (thesis.supervisor._id === supervisorId) {
              yearCount[thesis.year] = (yearCount[thesis.year] || 0) + 1
            }
          })

          const sortedYears = Object.entries(yearCount)
            .sort((a, b) => b[0] - a[0])

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
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="w-2xl">
        <button
          onClick={() => window.history.back()}
          className="text-indigo-700 underline text-sm hover:text-indigo-900 mb-4"
        >
          ▲ Up a level
        </button>

        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">
          Browse by Year - {supervisorName || "Supervisor"}
        </h2>

        <p className="text-sm mb-3">
          Please select a year to browse theses from the list below.
        </p>

        <ul className="space-y-1 ml-5 text-sm">
          {years.map(([year, count]) => (
            <li key={year} className="list-disc list-inside">
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
  )
}

export default SupervisorYearSelection