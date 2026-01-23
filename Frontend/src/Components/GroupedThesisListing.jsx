import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

const GroupedThesisListing = ({ theses, authors, grouping = 'No Grouping' }) => {
  const groupedData = useMemo(() => {
    if (grouping === 'Creators') {
      const groups = {}
      theses.forEach(thesis => {
        const authorName = authors[thesis.author] || thesis.author
        const initial = authorName.charAt(0).toUpperCase()
        if (!groups[initial]) {
          groups[initial] = []
        }
        groups[initial].push({ ...thesis, authorName })
      })
      
      Object.keys(groups).forEach(letter => {
        groups[letter].sort((a, b) => a.title.localeCompare(b.title))
      })
      
      const sortedGroups = {}
      Object.keys(groups).sort().forEach(key => {
        sortedGroups[key] = groups[key]
      })
      
      return sortedGroups
    } else if (grouping === 'Item Type') {
      const groups = {}
      theses.forEach(thesis => {
        const type = thesis.degreeType || 'Thesis'
        if (!groups[type]) {
          groups[type] = []
        }
        groups[type].push({ ...thesis, authorName: authors[thesis.author] || thesis.author })
      })
      
      Object.keys(groups).forEach(type => {
        groups[type].sort((a, b) => a.title.localeCompare(b.title))
      })
      
      const sortedGroups = {}
      Object.keys(groups).sort().forEach(key => {
        sortedGroups[key] = groups[key]
      })
      
      return sortedGroups
    } else {
      return { 'All': theses.map(thesis => ({ 
        ...thesis, 
        authorName: authors[thesis.author] || thesis.author 
      })).sort((a, b) => a.title.localeCompare(b.title)) }
    }
  }, [theses, authors, grouping])

  const jumpToLetters = Object.keys(groupedData).sort()

  const scrollToLetter = (letter) => {
    const element = document.getElementById(`group-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } 
  }

  return (
    <div className="space-y-6">
      {grouping === 'Creators' && jumpToLetters.length > 1 && (
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm font-medium text-gray-700 mb-2">Jump to:</div>
          <div className="flex flex-wrap gap-1">
            {jumpToLetters.map(letter => (
              <button
                key={letter}
                onClick={() => scrollToLetter(letter)}
                className="text-indigo-700 underline text-sm hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"
                tabIndex={0}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}

      {Object.entries(groupedData).map(([groupKey, groupTheses]) => (
        <div key={groupKey} id={`group-${groupKey}`} className="space-y-3">
          {grouping !== 'No Grouping' && (
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1">
              {groupKey}
            </h3>
          )}
          
          <div className="space-y-2">
            {groupTheses.map(thesis => (
              <div key={thesis._id} className="border-b border-gray-200 pb-2">
                <div className="text-sm text-gray-600 mb-1">
                  <Link 
                    to={`/view/author/${thesis.author}`} 
                    className="text-indigo-700 underline hover:text-indigo-900"
                  >
                    {thesis.authorName}
                  </Link>
                  <span className="ml-2">({thesis.year})</span>
                </div>
                <div className="mb-1">
                  <Link 
                    to={`/thesis/${thesis._id}`} 
                    className="text-indigo-700 underline hover:text-indigo-900 font-medium"
                  >
                    {thesis.title}
                  </Link>
                </div>
                <div className="text-sm text-gray-600">
                  {thesis.degreeType} thesis.
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GroupedThesisListing
