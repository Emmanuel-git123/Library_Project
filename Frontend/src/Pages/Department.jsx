import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Department = () => {
  const [departments, setDepartments] = useState([])
  const [thesisCounts, setThesisCounts] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptRes = await fetch('http://localhost:8081/api/depts')
        const deptData = await deptRes.json()
        
        const thesisRes = await fetch('http://localhost:8081/api/thesis')
        const thesisData = await thesisRes.json()
        
        if (deptRes.ok && thesisRes.ok) {
          // const depts = deptData.departments.name
          const theses = thesisData.required_thesis
          
          const counts = {}
          theses.forEach(thesis => {
            if (!thesis.departmentId) return
            const deptId = typeof thesis.departmentId === "object" ? thesis.departmentId._id: thesis.departmentId
            counts[deptId] = (counts[deptId] || 0) + 1
          })
          setThesisCounts(counts)
          setDepartments(deptData.departments)
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

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">Browse by Division and Year</h2>
        <p className="text-sm mb-2">Please select a value to browse from the list below.</p>

        <div className="flex flex-col">
          <div className="space-y-1 text-left">
            <div className='text-md hover:text-blue-600 '>
              <Link to="/view/dept/all">Departments({getTotalCount()}) :</Link>
            </div>
            <div className='grid grid-cols-2 gap-5'>
            {departments.map(dept=> (
              <div key={dept._id} className="w-full text-sm border-4 rounded-2xl bg-gray-100 text-center px-2.5 py-5 flex justify-center items-center">
                <div>
                    <div key={dept._id} className="list-disc list-inside text-sm">
                      <Link 
                        to={`/view/dept/${dept._id}/years`} 
                        className="text-indigo-700 underline text-sm hover:text-red-500"
                      >
                        Department of {dept.name} ({getDepartmentCount(dept._id)})
                      </Link>
                    </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Department
