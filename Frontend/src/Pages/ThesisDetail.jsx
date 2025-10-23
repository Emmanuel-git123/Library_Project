import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';

const ThesisDetail = () => {
  const { id } = useParams()
  const [thesis, setThesis] = useState(null)
  const [meta, setMeta] = useState({ users: [], subjects: [], departments: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [thesisRes, usersRes, subjectsRes, deptsRes] = await Promise.all([
          fetch('http://localhost:8080/api/thesis'),
          fetch('http://localhost:8080/api/users'),
          fetch('http://localhost:8080/api/subjects'),
          fetch('http://localhost:8080/api/depts')
        ])

        const [thesisData, usersData, subjectsData, deptsData] = await Promise.all([
          thesisRes.json(), usersRes.json(), subjectsRes.json(), deptsRes.json()
        ])

        if (thesisRes.ok) {
          const item = thesisData.required_thesis.find(t => t._id === id)
          setThesis(item || null)
        }
        setMeta({
          users: usersRes.ok ? usersData.users || [] : [],
          subjects: subjectsRes.ok ? subjectsData.subjects || [] : [],
          departments: deptsRes.ok ? deptsData.departments || [] : []
        })
      } catch (err) {
        console.error('Error loading thesis detail:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [id])

  const authorName = useMemo(() => {
    const u = meta.users.find(u => u._id === thesis?.author)
    return u?.name || thesis?.author || 'Unknown'
  }, [meta.users, thesis])

  const supervisorName = useMemo(() => {
    const u = meta.users.find(u => u._id === thesis?.supervisor)
    return u?.name || thesis?.supervisor || 'Unknown'
  }, [meta.users, thesis])

  const subjectObj = useMemo(() => meta.subjects.find(s => s._id === thesis?.subjectId), [meta.subjects, thesis])
  const deptObj = useMemo(() => meta.departments.find(d => d._id === thesis?.departmentId), [meta.departments, thesis])

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!thesis) {
    return (
      <div className="flex justify-center">
        <div className="text-lg text-gray-600">Thesis not found.</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-4xl max-w-4xl">
        
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">{thesis.title}</h1>
          <div className="text-sm text-gray-600">
            <Link to={`/view/author/${thesis.author}`} className="text-indigo-700 underline hover:text-indigo-900">
              {authorName}
            </Link>
            <span className="ml-2">({thesis.year})</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 border border-gray-300 p-3 flex items-center gap-3">
            <FileText className="w-5 h-5 text-red-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">PDF</div>
              <div className="text-xs text-gray-600">(External or sample link)</div>
            </div>
            <a 
              href={thesis.pdfUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-700"
            >
              Download
            </a>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Abstract</h2>
          <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border">
            {thesis.abstract || 'No abstract available.'}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Show full item record</h2>
          <div className="border border-gray-300 rounded">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 w-1/3">Item Type</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Thesis ({thesis.degreeType})</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">Uncontrolled Keywords</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {Array.isArray(thesis.keywords) && thesis.keywords.length > 0 ? thesis.keywords.join(', ') : 'N/A'}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">Subjects</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {subjectObj ? (
                      <Link to={`/view/subject/${subjectObj._id}/theses`} className="text-indigo-700 underline hover:text-indigo-900">
                        {subjectObj.name}
                      </Link>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">Divisions</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {deptObj ? (
                      <Link to={`/view/dept/${deptObj._id}/years`} className="text-indigo-700 underline hover:text-indigo-900">
                        {deptObj.name}
                      </Link>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">ID Code</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{thesis._id}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">Supervisor(s)</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <Link to={`/view/supervisor/${thesis.supervisor}`} className="text-indigo-700 underline hover:text-indigo-900">
                      {supervisorName}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">Date</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <Link to={`/view/year/${thesis.year}`} className="text-indigo-700 underline hover:text-indigo-900">
                      {thesis.year}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500 text-right">
          This record was generated on {new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata', weekday: 'short', year: 'numeric', month: 'short', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
          })}.
        </div>
      </div>
    </div>
  )
}

export default ThesisDetail


