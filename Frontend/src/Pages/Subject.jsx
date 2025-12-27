import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Subject = () => {
  const [subjectsTree, setSubjectsTree] = useState([])
  const [thesisCounts, setThesisCounts] = useState({})
  const [theses, setTheses] = useState([]) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsRes = await fetch('http://localhost:8080/api/subjects')
        const thesisRes = await fetch('http://localhost:8080/api/thesis')

        const subjectsData = await subjectsRes.json()
        const thesisData = await thesisRes.json()

        if (subjectsRes.ok && thesisRes.ok) {
          const subjects = subjectsData.subjects
          const thesesFetched = thesisData.required_thesis
          setTheses(thesesFetched) 

          const map = {}
          subjects.forEach(s => (map[s._id] = { ...s, children: [] }))
          const tree = []
          subjects.forEach(s => {
            s.parent ? map[s.parent]?.children.push(map[s._id]) : tree.push(map[s._id])
          })

          const directCounts = {}
          thesesFetched.forEach(thesis => {
            if (thesis.subjectId) {
              directCounts[thesis.subjectId] = (directCounts[thesis.subjectId] || 0) + 1
            }
          })

          const aggregateCounts = (subject) => {
            if (subject.children && subject.children.length > 0) {
              return subject.children.reduce((sum, child) => sum + aggregateCounts(child), 0)
            } else {
              return directCounts[subject._id] || 0
            }
          }

          const aggregatedCounts = {}
          Object.values(map).forEach(subject => {
            aggregatedCounts[subject._id] = aggregateCounts(subject)
          })

          setThesisCounts(aggregatedCounts)
          setSubjectsTree(tree)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  const getTotalCount = () => {
    if (!theses || theses.length === 0) return 0
    return theses.filter(t => t.subjectId !== null).length
  }

  const renderSubjects = (subs, level = 0) => (
    <ul className={`${level === 0 ? 'ml-0' : 'ml-6'} space-y-1 text-left`}>
      {level === 0 && (
        <li className="text-indigo-700 underline text-sm list-disc list-inside">
          <Link to="/view/subject/all">All Subjects ({getTotalCount()})</Link>
        </li>
      )}
      <div className="ml-6">
        {subs.map(s => (
          <li key={s._id} className="text-sm list-disc list-inside">
            <Link
              to={
                s.children.length > 0
                  ? `/view/subject/${s._id}`
                  : `/view/subject/${s._id}/theses`
              }
              className="text-indigo-700 underline hover:text-red-500 transition-all"
            >
              {s.name} ({thesisCounts[s._id] || 0})
            </Link>
            {s.children.length > 0 && renderSubjects(s.children, level + 1)}
          </li>
        ))}
      </div>
    </ul>
  )

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-2xl">
        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">
          Browse by Subject and Year
        </h2>
        <p className="text-sm font-[400] mb-2">
          Please select a value to browse from the list below.
        </p>

        {subjectsTree.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-4">Loading subjects...</p>
        ) : (
          <div className="flex flex-col ml-5">
            <div className="text-left text-sm">{renderSubjects(subjectsTree)}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Subject