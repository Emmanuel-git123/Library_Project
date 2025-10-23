import React, { useState } from 'react'
import icon from '../assets/icon.png'

const ListingControls = ({ 
  onGroupingChange, 
  currentGrouping = 'No Grouping',
  showExport = true,
  showRSS = true,
  showUpLevel = false,
  onUpLevel
}) => {
  const [showExportDropdown, setShowExportDropdown] = useState(false)

  const groupingOptions = ['Creators', 'Item Type', 'No Grouping']

  return (
    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 border border-gray-200 rounded">
      <div className="flex items-center gap-3">
        <img src={icon} alt="icon" className="w-4 h-4" />
        
        {showExport && (
          <div className="relative">
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded border hover:bg-gray-300"
              title="Export not implemented yet"
            >
              Export ▼
            </button>
            {showExportDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                <div className="px-3 py-2 text-sm text-gray-500 cursor-not-allowed">
                  Export functionality not available
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showRSS && (
        <div className="flex items-center gap-2">
          <img src={icon} alt="icon.png" className='size-4 mx-0.5' /><p className='text-s text-gray-500'>RSS 2.0</p>
          <img src={icon} alt="icon.png" className='size-4 mx-0.5' /><p className='text-s text-gray-500'>RSS 1.0</p>
          <img src={icon} alt="icon.png" className='size-4 mx-0.5' /><p className='text-s text-gray-500'>Atom</p>
          <span className="text-xs text-gray-600">Atom</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        {showUpLevel && (
          <button
            onClick={onUpLevel}
            className="text-indigo-700 underline text-sm hover:text-indigo-900"
          >
            Up a level
          </button>
        )}
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Group by:</span>
          <div className="flex gap-1">
            {groupingOptions.map(option => (
              <button
                key={option}
                onClick={() => onGroupingChange(option)}
                className={`px-2 py-1 text-xs rounded border ${
                  currentGrouping === option
                    ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingControls
