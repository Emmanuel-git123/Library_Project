import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@chakra-ui/react'
import toast from 'react-hot-toast';

const ThesisDetail = () => {
  const { id } = useParams()
  const [thesis, setThesis] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThesis = async () => {
      try {
        const thesisRes = await fetch('http://localhost:8081/api/thesis')
        const thesisData = await thesisRes.json()

        if (thesisRes.ok) {
          const item = thesisData.required_thesis.find(t => t._id === id)
          setThesis(item || null)
        }
      } catch (err) {
        console.error('Error loading thesis detail:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchThesis()
  }, [id])

  const getPdfViewUrl = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User is not logged in");
      return;
    }
    navigate(`/view/pdf/${id}`);
  };

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
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            {thesis.title}
          </h1>
          <div className="text-sm text-gray-600">
            <Link
              to={`/view/author/${thesis.author?._id}`}
              className="text-indigo-700 underline hover:text-indigo-900"
            >
              {thesis.author?.name || "Unknown"}
            </Link>
            <span className="ml-2">({thesis.year})</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 border border-gray-300 p-3 flex items-center gap-3">
            <FileText className="w-5 h-5 text-red-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">PDF</div>
              <div className="text-xs text-gray-600">
                (External or sample link)
              </div>
            </div>
            {thesis.allowDownload && thesis.pdfUrl && (
              <Button
                onClick={getPdfViewUrl}
                className="bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-700"
              >
                View
              </Button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Abstract
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border">
            {thesis.abstract || 'No abstract available.'}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Show full item record
          </h2>

          <div className="border border-gray-300 rounded">
            <table className="w-full">
              <tbody>

                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 w-1/3">
                    Item Type
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {thesis.degreeType==="PhD"?`Thesis`:thesis.degreeType==='Btech'?`Project`:`Dissertation`} ({thesis.degreeType})
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                    Keywords
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {Array.isArray(thesis.keywords) && thesis.keywords.length > 0
                      ? thesis.keywords.join(', ')
                      : 'N/A'}
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                    Department
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {thesis.departmentId ? (
                      <Link
                        to={`/view/dept/${thesis.departmentId?._id}/years`}
                        className="text-indigo-700 underline hover:text-indigo-900"
                      >
                        {thesis.departmentId?.name}
                      </Link>
                    ) : 'N/A'}
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                    Supervisor(s)
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <Link
                      to={`/view/supervisor/${thesis.supervisor?._id}`}
                      className="text-indigo-700 underline hover:text-indigo-900"
                    >
                      {thesis.supervisor?.name || "Unknown"}
                    </Link>
                  </td>
                </tr>

                <tr>
                  <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                    Date
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <Link
                      to={`/view/year/${thesis.year}`}
                      className="text-indigo-700 underline hover:text-indigo-900"
                    >
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

export default ThesisDetail