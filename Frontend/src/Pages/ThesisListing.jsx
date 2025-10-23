import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import GroupedThesisListing from '../Components/GroupedThesisListing'
import icon from '../assets/icon.png'

const ThesisListing = () => {
  const { type, id, subjectId, deptId, year, category, supervisorId } = useParams()
  const [theses, setTheses] = useState([])
  const [filterInfo, setFilterInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [authors, setAuthors] = useState({})
  const [grouping, setGrouping] = useState('No Grouping')

  useEffect(() => {
    const fetchTheses = async () => {
      try {
        const [thesisRes, usersRes] = await Promise.all([
          fetch('http://localhost:8080/api/thesis'),
          fetch('http://localhost:8080/api/users')
        ])
        
        const [thesisData, usersData] = await Promise.all([
          thesisRes.json(),
          usersRes.json()
        ])
        
        if (thesisRes.ok && usersRes.ok) {
          const authorMap = {}
          usersData.users.forEach(user => {
            authorMap[user._id] = user.name
          })
          setAuthors(authorMap)
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
          } else if (currentPath.includes('/view/subject/') && currentPath.includes('/theses')) {
            filterType = 'subject'
          } else if (currentPath.includes('/view/dept/') && !currentPath.includes('/years')) {
            filterType = 'dept'
          }
          
          if (filterType === 'subject' && subjectId) {
            filteredTheses = thesisData.required_thesis.filter(thesis => thesis.subjectId === subjectId)
            const subjectRes = await fetch('http://localhost:8080/api/subjects')
            const subjectData = await subjectRes.json()
            if (subjectRes.ok) {
              const subject = subjectData.subjects.find(s => s._id === subjectId)
              filterTitle = subject ? `Items where Subject is '${subject.name}'` : 'Subject Theses'
            }
          } else if (filterType === 'dept' && id) {
            filteredTheses = thesisData.required_thesis.filter(thesis => thesis.departmentId === id)
            const deptRes = await fetch('http://localhost:8080/api/depts')
            const deptData = await deptRes.json()
            if (deptRes.ok) {
              const dept = deptData.departments.find(d => d._id === id)
              filterTitle = dept ? `Items where Department is '${dept.name}'` : 'Department Theses'
            }
          } else if (filterType === 'year' && year) {
            filteredTheses = thesisData.required_thesis.filter(thesis => thesis.year === parseInt(year))
            filterTitle = `Items where Year is '${year}'`
          } else if (deptId && year) {
            filteredTheses = thesisData.required_thesis.filter(thesis => 
              thesis.departmentId === deptId && thesis.year === parseInt(year)
            )
            const deptRes = await fetch('http://localhost:8080/api/depts')
            const deptData = await deptRes.json()
            if (deptRes.ok) {
              const dept = deptData.departments.find(d => d._id === deptId)
              filterTitle = dept ? `Items where Department is '${dept.name}' and Year is '${year}'` : `Department Theses for ${year}`
            }
          } else if (filterType === 'author' && id) {
            filteredTheses = thesisData.required_thesis.filter(thesis => thesis.author === id)
            const userRes = await fetch('http://localhost:8080/api/users')
            const userData = await userRes.json()
            if (userRes.ok) {
              const user = userData.users.find(u => u._id === id)
              filterTitle = user ? `Items where Author is '${user.name}'` : 'Author Theses'
            }
          } else if (filterType === 'supervisor' && (supervisorId || id)) {
            const supervisor = supervisorId || id
            if (year) {
              filteredTheses = thesisData.required_thesis.filter(thesis => 
                thesis.supervisor === supervisor && thesis.year === parseInt(year)
              )
              const userRes = await fetch('http://localhost:8080/api/users')
              const userData = await userRes.json()
              if (userRes.ok) {
                const user = userData.users.find(u => u._id === supervisor)
                filterTitle = user ? `Items where Supervisor is '${user.name}' and Year is '${year}'` : `Supervisor Theses for ${year}`
              }
            } else {
              filteredTheses = thesisData.required_thesis.filter(thesis => thesis.supervisor === supervisor)
              const userRes = await fetch('http://localhost:8080/api/users')
              const userData = await userRes.json()
              if (userRes.ok) {
                const user = userData.users.find(u => u._id === supervisor)
                filterTitle = user ? `Items where Supervisor is '${user.name}'` : 'Supervisor Theses'
              }
            }
          } else if (filterType === 'thesis_type' && id) {
            filteredTheses = thesisData.required_thesis.filter(thesis => thesis.degreeType === id)
            filterTitle = `Items where Thesis Type is '${id}'`
          }
          
          filteredTheses.sort((a, b) => a.title.localeCompare(b.title))
          
          setTheses(filteredTheses)
          setFilterInfo({ title: filterTitle, count: filteredTheses.length })
        }
      } catch (err) {
        console.error('Error fetching theses:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTheses()
  }, [type, id, subjectId, deptId, year, category])

  const getAuthorName = async (authorId) => {
    try {
      const res = await fetch('http://localhost:8080/api/users')
      const data = await res.json()
      if (res.ok) {
        const user = data.users.find(u => u._id === authorId)
        return user ? user.name : 'Unknown Author'
      }
    } catch (err) {
      console.error('Error fetching author:', err)
    }
    return 'Unknown Author'
  }

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
        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">{filterInfo.title}</h2>
        
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 border border-gray-200 rounded">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()} 
              className="text-indigo-700 underline text-sm hover:text-indigo-900 flex items-center gap-1"
            >
              <span className="text-xs">▲</span> Up a level
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Export as</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>ASCII Citation</option>
              </select>
              <button className="bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-700">
                Export
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className='flex items-center'><img src={icon} alt="icon.png" className='size-4 mx-0.5' /><p className='text-s text-gray-500'>RSS 2.0</p></div>
            <div className='flex items-center'><img src={icon} alt="icon.png" className='size-4 mx-0.5' /><p className='text-s text-gray-500'>RSS 1.0</p></div>
            <div className='flex items-center'><img src={icon} alt="icon.png" className='size-4 mx-0.5' /><p className='text-s text-gray-500'>Atom</p></div>
          </div>
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
          
          {grouping === 'Creators' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Jump to:</span>
              <div className="flex gap-1">
                {['B', 'D', 'G', 'K', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'Y'].map(letter => (
                  <button
                    key={letter}
                    className="text-indigo-700 underline text-sm hover:text-indigo-900"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <p className="text-sm font-[400] mb-4">Number of items: {filterInfo.count}.</p>

        <GroupedThesisListing 
          theses={theses}
          authors={authors}
          grouping={grouping}
        />

        <div className="mt-6 text-sm text-gray-500 text-right">
          This list was generated on {new Date().toLocaleString('en-IN', { 
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
