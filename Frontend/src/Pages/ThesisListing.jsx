import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GroupedThesisListing from '../Components/GroupedThesisListing'

const ThesisListing = () => {
  const { type, id, deptId, year, category, supervisorId } = useParams()
  const [theses, setTheses] = useState([])
  const [filterInfo, setFilterInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [grouping, setGrouping] = useState('No Grouping')

  useEffect(() => {
    const fetchTheses = async () => {
      try {
        const thesisRes = await fetch('http://localhost:8081/api/thesis')
        const thesisData = await thesisRes.json()

        if (thesisRes.ok) {
          let filteredTheses = thesisData.required_thesis
          let filterTitle = 'All Theses'

          const currentPath = window.location.pathname
          let filterType = 'all'

          if (currentPath.includes('/view/year/')) {
            filterType = 'year'
          } else if (currentPath.includes('/view/author/')) {
            filterType = 'author'
          } else if (currentPath.includes('/view/supervisor/')) {
            filterType = 'supervisor'
          } else if (currentPath.includes('/view/thesis_type/')) {
            filterType = 'thesis_type'
          } else if (currentPath.includes('/view/dept/') && !currentPath.includes('/years')) {
            filterType = 'dept'
          }

          if (filterType === 'dept' && id) {
            filteredTheses = filteredTheses.filter(
              thesis => thesis.departmentId && thesis.departmentId._id === id
            )
            const dept = filteredTheses[0]?.departmentId
            filterTitle = dept
              ? `Items where Department is '${dept.name}'`
              : 'Department Theses'
          }

          else if (filterType === 'year' && year) {
            filteredTheses = filteredTheses.filter(
              thesis => thesis.year === parseInt(year)
            )
            filterTitle = `Items where Year is '${year}'`
          }

          else if (deptId && year) {
            filteredTheses = filteredTheses.filter(
              thesis =>
                thesis.departmentId &&
                thesis.departmentId._id === deptId &&
                thesis.year === parseInt(year)
            )
            const dept = filteredTheses[0]?.departmentId
            filterTitle = dept
              ? `Items where Department is '${dept.name}' and Year is '${year}'`
              : `Department Theses for ${year}`
          }

          else if (filterType === 'author' && id) {
            filteredTheses = filteredTheses.filter(
              thesis => thesis.author && thesis.author._id === id
            )
            const author = filteredTheses[0]?.author
            filterTitle = author
              ? `Items where Author is '${author.name}'`
              : 'Author Theses'
          }

          else if (filterType === 'supervisor' && (supervisorId || id)) {
            const supervisor = supervisorId || id

            if (year) {
              filteredTheses = filteredTheses.filter(
                thesis =>
                  thesis.supervisor &&
                  thesis.supervisor._id === supervisor &&
                  thesis.year === parseInt(year)
              )
              const sup = filteredTheses[0]?.supervisor
              filterTitle = sup
                ? `Items where Supervisor is '${sup.name}' and Year is '${year}'`
                : `Supervisor Theses for ${year}`
            } else {
              filteredTheses = filteredTheses.filter(
                thesis =>
                  thesis.supervisor &&
                  thesis.supervisor._id === supervisor
              )
              const sup = filteredTheses[0]?.supervisor
              filterTitle = sup
                ? `Items where Supervisor is '${sup.name}'`
                : 'Supervisor Theses'
            }
          }

          else if (filterType === 'thesis_type' && id) {
            filteredTheses = filteredTheses.filter(
              thesis => thesis.degreeType === id
            )
            id==='Btech'?filterTitle = `${id} Projects`:id==='PhD'?filterTitle = `${id} Theses`:filterTitle = `${id} Dissertations`
          }

          filteredTheses.sort((a, b) =>
            a.title.localeCompare(b.title)
          )

          setTheses(filteredTheses)
          setFilterInfo({
            title: filterTitle,
            count: filteredTheses.length
          })
        }
      } catch (err) {
        console.error('Error fetching theses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTheses()
  }, [type, id, deptId, year, category])

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-4xl max-w-4xl">
        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">
          {filterInfo.title}
        </h2>

        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 border border-gray-200 rounded">
          <button
            onClick={() => window.history.back()}
            className="text-indigo-700 underline text-sm hover:text-indigo-900 flex items-center gap-1"
          >
            <span className="text-xs">▲</span> Up a level
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Group by:</span>
            <div className="flex gap-1">
              {['Creators', 'Item Type', 'No Grouping'].map(option => (
                <button
                  key={option}
                  onClick={() => setGrouping(option)}
                  className={`px-2 py-1 text-xs rounded border ${
                    grouping === option
                      ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                      : 'bg-white text-indigo-700 border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm mb-4">
          Number of items: {filterInfo.count}.
        </p>

        <GroupedThesisListing
          theses={theses}
          grouping={grouping}
        />

        <div className="mt-6 text-sm text-gray-500 text-right">
          This list was generated on{' '}
          {new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
          })}.
        </div>
      </div>
    </div>
  )
}

export default ThesisListing