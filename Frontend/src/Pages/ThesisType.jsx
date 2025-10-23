import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ThesisType = () => {
  const [thesisTypes, setThesisTypes] = useState([])
  const [thesisCounts, setThesisCounts] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const thesisRes = await fetch('http://localhost:8080/api/thesis')
        const thesisData = await thesisRes.json()
        
        if (thesisRes.ok) {
          const theses = thesisData.required_thesis
          
          const counts = {}
          theses.forEach(thesis => {
            counts[thesis.degreeType] = (counts[thesis.degreeType] || 0) + 1
          })
          setThesisCounts(counts)
          
          const uniqueTypes = [...new Set(theses.map(thesis => thesis.degreeType))]
            .sort((a, b) => a.localeCompare(b))
          
          setThesisTypes(uniqueTypes)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  const getThesisTypeCount = (type) => {
    return thesisCounts[type] || 0
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
        
        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">Browse by Thesis Type</h2>
        <p className="text-sm font-[400] mb-2">Please select a value to browse from the list below.</p>

        <div className="flex flex-col ml-5">
          <ul className="space-y-1 text-left">
            {thesisTypes.map(type => (
              <li key={type} className="list-disc list-inside text-sm">
                <Link 
                  to={`/view/thesis_type/${type}`} 
                  className="text-indigo-700 underline"
                >
                  {type} ({getThesisTypeCount(type)})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ThesisType
