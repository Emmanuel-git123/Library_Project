import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Department = () => {
  const [departments, setDepartments] = useState([])
  const [thesisCounts, setThesisCounts] = useState({})

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
          
          const counts = {}
          theses.forEach(thesis => {
            counts[thesis.departmentId] = (counts[thesis.departmentId] || 0) + 1
          })
          setThesisCounts(counts)
          
          const groupedDepts = {}
          depts.forEach(dept => {
            if (!groupedDepts[dept.category]) {
              groupedDepts[dept.category] = []
            }
            groupedDepts[dept.category].push(dept)
          })
          
          setDepartments(groupedDepts)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  const getTotalCount = () => {
    return Object.values(thesisCounts).reduce((sum, count) => sum + count, 0)
  }

  const getDepartmentCount = (deptId) => {
    return thesisCounts[deptId] || 0
  }

  const getCategoryCount = (category) => {
    const categoryDepts = departments[category] || []
    return categoryDepts.reduce((sum, dept) => {
      return sum + getDepartmentCount(dept._id)
    }, 0)
  }

  const categoryNames = {
    'Engineering': 'Engineering and Technology',
    'Science': 'Sciences',
    'Humanities': 'Social Studies',
    'Management': 'Management',
    'Computer Science Engineering':'CSE',
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-2xl">
        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">Browse by Division and Year</h2>
        <p className="text-sm font-[400] mb-2">Please select a value to browse from the list below.</p>

        <div className="flex flex-col ml-5">
          <ul className="space-y-1 text-left">
            <li className='text-indigo-700 underline text-sm list-disc list-inside'>
              <Link to="/view/dept/all">Departments ({getTotalCount()})</Link>
            </li>
            
            {Object.entries(departments).map(([category, depts]) => (
              <li key={category} className="ml-6 list-disc list-inside text-sm">
                <Link 
                  to={`/view/dept/${category}`} 
                  className="text-indigo-700 underline text-sm"
                >
                  {categoryNames[category] || category} ({getCategoryCount(category)})
                </Link>
                <ul className="ml-6 space-y-1">
                  {depts.map(dept => (
                    <li key={dept._id} className="list-disc list-inside text-sm">
                      <Link 
                        to={`/view/dept/${dept._id}/years`} 
                        className="text-indigo-700 underline text-sm"
                      >
                        Department of {dept.name} ({getDepartmentCount(dept._id)})
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Department
