import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { duration } from '@mui/material';

const GroupedThesisListing = ({ theses, grouping = 'No Grouping' }) => {
  const [token,setToken] = useState("");
  const [showConfirm,setShowConfirm] = useState(false);
  const [selectedThesis,setSelectedThesis] = useState(null);

  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
      setToken(token);
    }
  },[])
  const groupedData = useMemo(() => {
    if (grouping === 'Creators') {
      const groups = {}
      theses.forEach(thesis => {
        const authorName = thesis.author?.name || 'Unknown Author'
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
        groups[type].push({ ...thesis, authorName: thesis.author?.name || 'Unknown Author' })
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
        authorName: thesis.author?.name || 'Unknown Author'
      })).sort((a, b) => a.title.localeCompare(b.title)) }
    }
  }, [theses, grouping])

  const jumpToLetters = Object.keys(groupedData).sort()

  const scrollToLetter = (letter) => {
    const element = document.getElementById(`group-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } 
  }

  const deleteThesis=async(id)=>{
    try {
      const res=await fetch(`http://localhost:8081/api/thesis/${id}`,{
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data=await res.json();
      if(res.ok){
        // toast.success("Successfully Deleted the thesis",{duration:2000})
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete thesis");
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
                <div className="text-sm text-gray-600 flex justify-between mb-1">
                  <div>
                    <Link 
                      to={`/view/author/${thesis.author?._id}`} 
                      className="text-indigo-700 underline hover:text-indigo-900"
                      >
                      {thesis.author.name}
                    </Link>
                    <span className="ml-2">({thesis.year})</span>
                  </div>
                  <div>
                    {token&&<Trash onClick={()=>{
                          setSelectedThesis(thesis._id)
                          setShowConfirm(true)
                        }}
                        className='text-red-400 scale-90 hover:cursor-pointer'
                        >
                        </Trash>}
                  </div>
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
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px]  z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[340px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Thesis
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this thesis?  
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={()=>setShowConfirm(false)} className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
              <button onClick={()=>{
                  deleteThesis(selectedThesis)
                  setShowConfirm(false)
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupedThesisListing
