import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Authors = () => {
  const [authors, setAuthors] = useState([])
  const [thesisCounts, setThesisCounts] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch('http://localhost:8080/api/users')
        const usersData = await usersRes.json()
        
        const thesisRes = await fetch('http://localhost:8080/api/thesis')
        const thesisData = await thesisRes.json()
        
        if (usersRes.ok && thesisRes.ok) {
          const users = usersData.users
          const theses = thesisData.required_thesis
          
          const counts = {}
          theses.forEach(thesis => {
            counts[thesis.author] = (counts[thesis.author] || 0) + 1
          })
          setThesisCounts(counts)
          
          const authorsWithTheses = users
            .filter(user => counts[user._id] > 0)
            .sort((a, b) => a.name.localeCompare(b.name))
          
          setAuthors(authorsWithTheses)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  const getAuthorCount = (authorId) => {
    return thesisCounts[authorId] || 0
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-2xl">
        <h2 className="font-semibold text-lg text-gray-600 mb-2 text-center">Browse by Authors</h2>
        <p className="text-sm font-[400] mb-2">Please select a value to browse from the list below.</p>

        <div className="flex flex-col ml-5">
          <ul className="space-y-1 text-left">
            {authors.map(author => (
              <li key={author._id} className="list-disc list-inside text-sm">
                <Link 
                  to={`/view/author/${author._id}`} 
                  className="text-indigo-700 underline"
                >
                  {author.name} ({getAuthorCount(author._id)})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Authors
