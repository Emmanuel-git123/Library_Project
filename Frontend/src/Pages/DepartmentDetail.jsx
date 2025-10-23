import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const DepartmentDetail = () => {
  const { category } = useParams()
  const [departments, setDepartments] = useState([])
  const [thesisCounts, setThesisCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptRes = await fetch('http://localhost:8080/api/depts')
        const deptData = await deptRes.json()
        
        const thesisRes = await fetch('http://localhost:8080/api/thesis')
        const thesisData = await thesisRes.json()
        
        if (deptRes.ok && thesisRes.ok) {
          const depts = deptData.departments
          const theses = thesisData.required_thesis
          
          const categoryDepts = depts.filter(dept => dept.category === category)
          setDepartments(categoryDepts)
          
          const counts = {}
          theses.forEach(thesis => {
            counts[thesis.departmentId] = (counts[thesis.departmentId] || 0) + 1
          })
          setThesisCounts(counts)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [category])

  const getDepartmentCount = (deptId) => {
    return thesisCounts[deptId] || 0
  }

  const getTotalCount = () => {
    return departments.reduce((sum, dept) => sum + getDepartmentCount(dept._id), 0)
  }

  const categoryNames = {
    'Engineering': 'Engineering and Technology',
    'Science': 'Sciences',
    'Humanities': 'Social Studies',
    'Management': 'Management'
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
          Browse by Division - {categoryNames[category] || category}
        </h2>
        <p className="text-sm font-[400] mb-2">Please select a department to browse from the list below.</p>

        <div className="flex flex-col ml-5">
          <ul className="space-y-1 text-left">
            <li className='text-indigo-700 underline text-sm list-disc list-inside'>
              <Link to={`/view/dept/${category}`}>
                All items in {categoryNames[category] || category} ({getTotalCount()})
              </Link>
            </li>
            
            {departments.map(dept => (
              <li key={dept._id} className="ml-6 list-disc list-inside text-sm">
                <Link 
                  to={`/view/dept/${dept._id}/years`} 
                  className="text-indigo-700 underline"
                >
                  Department of {dept.name} ({getDepartmentCount(dept._id)})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DepartmentDetail
