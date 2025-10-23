import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Year = () => {
    const [year, setYear] = useState([]);

    useEffect(() => {
        const fetchYear = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/thesis`);
                const data = await response.json();
                if (response.ok) {
                    const yearCount = {}; data.required_thesis.forEach(t => { yearCount[t.year] = (yearCount[t.year] || 0) + 1; });
                    const uniqueSortedYears = Object.entries(yearCount).sort((a, b) => b[0] - a[0]);
                    setYear(uniqueSortedYears);
                } else {
                    console.error('Thesis not found:', data.message);
                }
            } catch (error) {
                console.error('Error fetching concert:', error);
            }
        };
        fetchYear();
    }, [])
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-2xl'>
                <div className='font-semibold text-lg text-gray-600 mb-2 text-center'>Browse By Year</div>
                <div className='text-sm font-[500] mb-4'>Please select a value to browse from the list below.</div>
                
                <ul className="ml-4 flex flex-col list-disc list-inside text-sm">
                    {year && year.map(([y, count], index) => (
                        <li key={index} className="list-disc list-inside text-sm">
                            <Link to={`/view/year/${y}`} className="text-indigo-700 underline">{y}</Link> ({count})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Year
