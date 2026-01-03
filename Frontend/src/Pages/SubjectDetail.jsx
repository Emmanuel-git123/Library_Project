import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const SubjectDetail = () => {
  const { subjectId } = useParams()
  const [subject, setSubject] = useState(null)
  const [subSubjects, setSubSubjects] = useState([])
  const [thesisCounts, setThesisCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsRes = await fetch('http://localhost:8080/api/subjects')
        const subjectsData = await subjectsRes.json()
        
        const thesisRes = await fetch('http://localhost:8080/api/thesis')
        const thesisData = await thesisRes.json()
        
        if (subjectsRes.ok && thesisRes.ok) {
          const subjects = subjectsData.subjects
          const theses = thesisData.required_thesis
          
          const mainSubject = subjects.find(s => s._id === subjectId)
          setSubject(mainSubject)
          
          const subSubjectsList = subjects.filter(s => s.parent === subjectId)
          setSubSubjects(subSubjectsList)
          
          const counts = {}
          theses.forEach(thesis => {
            counts[thesis.subjectId] = (counts[thesis.subjectId] || 0) + 1
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
  }, [subjectId])

  const getSubjectCount = (subjectId) => {
    return thesisCounts[subjectId] || 0
  }

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!subject) {
    return (
      <div className="flex justify-center">
        <div className="text-lg text-gray-600">Subject not found</div>
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
          Browse by Subject - {subject.name}
        </h2>
        <p className="text-sm mb-2">Please select a sub-subject to browse from the list below.</p>

        <div className="flex flex-col ml-5">
          <ul className="space-y-1 text-left">
            <li className='text-indigo-700 underline text-sm list-disc list-inside'>
              <Link to={`/view/subject/${subjectId}`}>
                All items in {subject.name} ({getSubjectCount(subjectId)})
              </Link>
            </li>
            
            {subSubjects.map(subSubject => (
              <li key={subSubject._id} className="ml-6 list-disc list-inside text-sm">
                <Link 
                  to={`/view/subject/${subSubject._id}`} 
                  className="text-indigo-700 underline"
                >
                  {subSubject.name} ({getSubjectCount(subSubject._id)})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SubjectDetail
